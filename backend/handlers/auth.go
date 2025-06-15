package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/Clothless/chaibedraa.dev/backend/auth"
	"github.com/Clothless/chaibedraa.dev/backend/models"
)

type AuthHandler struct {
	db          *sql.DB
	authService *auth.AuthService
}

func NewAuthHandler(db *sql.DB, authService *auth.AuthService) *AuthHandler {
	return &AuthHandler{
		db:          db,
		authService: authService,
	}
}

type loginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type loginResponse struct {
	Token string      `json:"token"`
	User  models.User `json:"user"`
}

func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	var req loginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	var user models.User
	var passwordHash string
	err := h.db.QueryRow(
		"SELECT id, username, password_hash, email, role, created_at, updated_at FROM users WHERE username = $1",
		req.Username,
	).Scan(
		&user.ID, &user.Username, &passwordHash, &user.Email, &user.Role,
		&user.CreatedAt, &user.UpdatedAt,
	)

	if err == sql.ErrNoRows {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	} else if err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	if !h.authService.CheckPasswordHash(req.Password, passwordHash) {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	token, err := h.authService.GenerateToken(user.ID, user.Username, user.Role)
	if err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(loginResponse{
		Token: token,
		User:  user,
	})
}

type registerRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Email    string `json:"email"`
}

func (h *AuthHandler) Register(w http.ResponseWriter, r *http.Request) {
	var req registerRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Check if username already exists
	var exists bool
	err := h.db.QueryRow("SELECT EXISTS(SELECT 1 FROM users WHERE username = $1)", req.Username).Scan(&exists)
	if err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	if exists {
		http.Error(w, "Username already exists", http.StatusBadRequest)
		return
	}

	// Check if email already exists
	err = h.db.QueryRow("SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)", req.Email).Scan(&exists)
	if err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	if exists {
		http.Error(w, "Email already exists", http.StatusBadRequest)
		return
	}

	// Hash password
	passwordHash, err := h.authService.HashPassword(req.Password)
	if err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	// Create user
	var user models.User
	err = h.db.QueryRow(
		`INSERT INTO users (username, password_hash, email, role)
		VALUES ($1, $2, $3, 'user')
		RETURNING id, username, email, role, created_at, updated_at`,
		req.Username, passwordHash, req.Email,
	).Scan(
		&user.ID, &user.Username, &user.Email, &user.Role,
		&user.CreatedAt, &user.UpdatedAt,
	)

	if err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(user)
}
