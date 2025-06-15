package handlers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/Clothless/chaibedraa.dev/backend/models"
	"github.com/go-chi/chi/v5"
	"github.com/lib/pq"
)

type Handler struct {
	db *sql.DB
}

func NewHandler(db *sql.DB) *Handler {
	return &Handler{db: db}
}

// respondWithError sends an error response to the client.
func respondWithError(w http.ResponseWriter, code int, message string, err error) {
	log.Printf("Error: %s - %v", message, err) // Log the actual error
	http.Error(w, message, code)
}

// Projects handlers
func (h *Handler) GetProjects(w http.ResponseWriter, r *http.Request) {
	rows, err := h.db.Query("SELECT id, title, description, tech_stack, github_link, demo_link, created_at, updated_at FROM projects ORDER BY created_at DESC")
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Failed to retrieve projects", err)
		return
	}
	defer rows.Close()

	var projects []models.Project
	for rows.Next() {
		var p models.Project
		var techStack pq.StringArray
		if err := rows.Scan(&p.ID, &p.Title, &p.Description, &techStack, &p.GithubLink, &p.DemoLink, &p.CreatedAt, &p.UpdatedAt); err != nil {
			respondWithError(w, http.StatusInternalServerError, "Failed to scan project row", err)
			return
		}
		if techStack == nil {
			p.TechStack = []string{}
		} else {
			p.TechStack = []string(techStack)
		}
		projects = append(projects, p)
	}

	json.NewEncoder(w).Encode(projects)
}

func (h *Handler) CreateProject(w http.ResponseWriter, r *http.Request) {
	var project models.Project
	if err := json.NewDecoder(r.Body).Decode(&project); err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid request body", err)
		return
	}

	// Handle empty tech_stack
	if project.TechStack == nil {
		project.TechStack = []string{}
	}

	query := `INSERT INTO projects (title, description, tech_stack, github_link, demo_link, image_url, featured)
			  VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, created_at, updated_at`
	err := h.db.QueryRow(query,
		project.Title,
		project.Description,
		pq.Array(project.TechStack), // Use pq.Array for string slices
		project.GithubLink,
		project.DemoLink,
		project.ImageURL,
		project.Featured,
	).Scan(&project.ID, &project.CreatedAt, &project.UpdatedAt)

	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Failed to create project", err)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(project)
}

func (h *Handler) GetProject(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	projectID, err := strconv.Atoi(id)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid project ID", err)
		return
	}

	var project models.Project
	var techStack pq.StringArray
	err = h.db.QueryRow("SELECT id, title, description, tech_stack, github_link, demo_link, created_at, updated_at FROM projects WHERE id = $1", projectID).
		Scan(&project.ID, &project.Title, &project.Description, &techStack, &project.GithubLink, &project.DemoLink, &project.CreatedAt, &project.UpdatedAt)
	if err == sql.ErrNoRows {
		respondWithError(w, http.StatusNotFound, "Project not found", nil)
		return
	} else if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Failed to retrieve project", err)
		return
	}

	if techStack == nil {
		project.TechStack = []string{}
	} else {
		project.TechStack = []string(techStack)
	}
	json.NewEncoder(w).Encode(project)
}

// Blog posts handlers
func (h *Handler) GetBlogPosts(w http.ResponseWriter, r *http.Request) {
	rows, err := h.db.Query("SELECT id, title, slug, content, tags, created_at, updated_at FROM blog_posts ORDER BY created_at DESC")
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Failed to retrieve blog posts", err)
		return
	}
	defer rows.Close()

	var posts []models.BlogPost
	for rows.Next() {
		var p models.BlogPost
		if err := rows.Scan(&p.ID, &p.Title, &p.Slug, &p.Content, &p.Tags, &p.CreatedAt, &p.UpdatedAt); err != nil {
			respondWithError(w, http.StatusInternalServerError, "Failed to scan blog post row", err)
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
		respondWithError(w, http.StatusNotFound, "Blog post not found", nil)
		return
	} else if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Failed to retrieve blog post", err)
		return
	}

	json.NewEncoder(w).Encode(post)
}

func (h *Handler) CreateBlogPost(w http.ResponseWriter, r *http.Request) {
	var post models.BlogPost
	if err := json.NewDecoder(r.Body).Decode(&post); err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid request body", err)
		return
	}

	// Handle empty tags
	if post.Tags == nil {
		post.Tags = []string{}
	}

	query := `INSERT INTO blog_posts (title, content, slug, tags, published, published_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, created_at, updated_at`
	err := h.db.QueryRow(query,
		post.Title,
		post.Content,
		post.Slug,
		pq.Array(post.Tags),
		post.Published,
		post.PublishedAt,
	).Scan(&post.ID, &post.CreatedAt, &post.UpdatedAt)

	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Failed to create blog post", err)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(post)
}

func (h *Handler) UpdateBlogPost(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	postID, err := strconv.Atoi(id)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid blog post ID", err)
		return
	}

	var post models.BlogPost
	if err := json.NewDecoder(r.Body).Decode(&post); err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid request body", err)
		return
	}

	// Handle empty tags
	if post.Tags == nil {
		post.Tags = []string{}
	}

	query := `UPDATE blog_posts SET title = $1, content = $2, slug = $3, tags = $4, published = $5, published_at = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING updated_at`
	err = h.db.QueryRow(query,
		post.Title,
		post.Content,
		post.Slug,
		pq.Array(post.Tags),
		post.Published,
		post.PublishedAt,
		postID,
	).Scan(&post.UpdatedAt)

	if err == sql.ErrNoRows {
		respondWithError(w, http.StatusNotFound, "Blog post not found", nil)
		return
	} else if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Failed to update blog post", err)
		return
	}

	post.ID = postID
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(post)
}

func (h *Handler) DeleteBlogPost(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	postID, err := strconv.Atoi(id)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid blog post ID", err)
		return
	}

	res, err := h.db.Exec("DELETE FROM blog_posts WHERE id = $1", postID)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Failed to delete blog post", err)
		return
	}

	rowsAffected, err := res.RowsAffected()
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Failed to get affected rows", err)
		return
	}

	if rowsAffected == 0 {
		respondWithError(w, http.StatusNotFound, "Blog post not found", nil)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

// Contact form handler
func (h *Handler) SubmitContactForm(w http.ResponseWriter, r *http.Request) {
	var message models.ContactMessage
	if err := json.NewDecoder(r.Body).Decode(&message); err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid request body", err)
		return
	}

	_, err := h.db.Exec("INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3)",
		message.Name, message.Email, message.Message)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Failed to submit contact form", err)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
