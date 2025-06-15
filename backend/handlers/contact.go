package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/Clothless/chaibedraa.dev/backend/models"
	"github.com/go-chi/chi/v5"
)

type ContactHandler struct {
	db *sql.DB
}

func NewContactHandler(db *sql.DB) *ContactHandler {
	return &ContactHandler{db: db}
}

type contactRequest struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Subject string `json:"subject"`
	Message string `json:"message"`
}

func (h *ContactHandler) CreateMessage(w http.ResponseWriter, r *http.Request) {
	var req contactRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	var message models.ContactMessage
	err := h.db.QueryRow(
		`INSERT INTO contact_messages (name, email, subject, message)
		VALUES ($1, $2, $3, $4)
		RETURNING id, name, email, subject, message, created_at, updated_at`,
		req.Name, req.Email, req.Subject, req.Message,
	).Scan(
		&message.ID, &message.Name, &message.Email, &message.Subject,
		&message.Message, &message.CreatedAt, &message.UpdatedAt,
	)

	if err != nil {
		http.Error(w, "Failed to create message", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(message)
}

func (h *ContactHandler) GetMessages(w http.ResponseWriter, r *http.Request) {
	rows, err := h.db.Query(`
		SELECT id, name, email, subject, message, created_at, updated_at
		FROM contact_messages
		ORDER BY created_at DESC
	`)
	if err != nil {
		http.Error(w, "Failed to fetch messages", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var messages []models.ContactMessage
	for rows.Next() {
		var message models.ContactMessage
		err := rows.Scan(
			&message.ID, &message.Name, &message.Email, &message.Subject,
			&message.Message, &message.CreatedAt, &message.UpdatedAt,
		)
		if err != nil {
			http.Error(w, "Failed to scan message", http.StatusInternalServerError)
			return
		}
		messages = append(messages, message)
	}

	if err = rows.Err(); err != nil {
		http.Error(w, "Error iterating messages", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(messages)
}

func (h *ContactHandler) DeleteMessage(w http.ResponseWriter, r *http.Request) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid message ID", http.StatusBadRequest)
		return
	}

	result, err := h.db.Exec("DELETE FROM contact_messages WHERE id = $1", id)
	if err != nil {
		http.Error(w, "Failed to delete message", http.StatusInternalServerError)
		return
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		http.Error(w, "Failed to get rows affected", http.StatusInternalServerError)
		return
	}

	if rowsAffected == 0 {
		http.Error(w, "Message not found", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
