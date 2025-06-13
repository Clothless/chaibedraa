package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/yourusername/personal-website/models"
)

type Handler struct {
	db *sql.DB
}

func NewHandler(db *sql.DB) *Handler {
	return &Handler{db: db}
}

// Projects handlers
func (h *Handler) GetProjects(w http.ResponseWriter, r *http.Request) {
	rows, err := h.db.Query("SELECT id, title, description, tech_stack, github_link, demo_link, created_at, updated_at FROM projects ORDER BY created_at DESC")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var projects []models.Project
	for rows.Next() {
		var p models.Project
		if err := rows.Scan(&p.ID, &p.Title, &p.Description, &p.TechStack, &p.GithubLink, &p.DemoLink, &p.CreatedAt, &p.UpdatedAt); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		projects = append(projects, p)
	}

	json.NewEncoder(w).Encode(projects)
}

func (h *Handler) GetProject(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	projectID, err := strconv.Atoi(id)
	if err != nil {
		http.Error(w, "Invalid project ID", http.StatusBadRequest)
		return
	}

	var project models.Project
	err = h.db.QueryRow("SELECT id, title, description, tech_stack, github_link, demo_link, created_at, updated_at FROM projects WHERE id = $1", projectID).
		Scan(&project.ID, &project.Title, &project.Description, &project.TechStack, &project.GithubLink, &project.DemoLink, &project.CreatedAt, &project.UpdatedAt)
	if err == sql.ErrNoRows {
		http.Error(w, "Project not found", http.StatusNotFound)
		return
	} else if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(project)
}

// Blog posts handlers
func (h *Handler) GetBlogPosts(w http.ResponseWriter, r *http.Request) {
	rows, err := h.db.Query("SELECT id, title, slug, content, tags, created_at, updated_at FROM blog_posts ORDER BY created_at DESC")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var posts []models.BlogPost
	for rows.Next() {
		var p models.BlogPost
		if err := rows.Scan(&p.ID, &p.Title, &p.Slug, &p.Content, &p.Tags, &p.CreatedAt, &p.UpdatedAt); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		posts = append(posts, p)
	}

	json.NewEncoder(w).Encode(posts)
}

func (h *Handler) GetBlogPost(w http.ResponseWriter, r *http.Request) {
	slug := chi.URLParam(r, "slug")

	var post models.BlogPost
	err := h.db.QueryRow("SELECT id, title, slug, content, tags, created_at, updated_at FROM blog_posts WHERE slug = $1", slug).
		Scan(&post.ID, &post.Title, &post.Slug, &post.Content, &post.Tags, &post.CreatedAt, &post.UpdatedAt)
	if err == sql.ErrNoRows {
		http.Error(w, "Blog post not found", http.StatusNotFound)
		return
	} else if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(post)
}

// Contact form handler
func (h *Handler) SubmitContactForm(w http.ResponseWriter, r *http.Request) {
	var message models.ContactMessage
	if err := json.NewDecoder(r.Body).Decode(&message); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	_, err := h.db.Exec("INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3)",
		message.Name, message.Email, message.Message)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
} 