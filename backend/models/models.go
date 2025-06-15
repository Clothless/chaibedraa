package models

import "time"

type User struct {
	ID           int       `json:"id"`
	Username     string    `json:"username"`
	PasswordHash string    `json:"-"`
	Email        string    `json:"email"`
	Role         string    `json:"role"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

type Project struct {
	ID          int       `json:"id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	TechStack   []string  `json:"tech_stack"`
	GithubLink  string    `json:"github_link"`
	DemoLink    string    `json:"demo_link"`
	ImageURL    string    `json:"image_url"`
	Featured    bool      `json:"featured"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type BlogPost struct {
	ID          int       `json:"id"`
	Title       string    `json:"title"`
	Content     string    `json:"content"`
	Slug        string    `json:"slug"`
	Tags        []string  `json:"tags"`
	Published   bool      `json:"published"`
	PublishedAt time.Time `json:"published_at"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type BlogPostImage struct {
	ID         int       `json:"id"`
	BlogPostID int       `json:"blog_post_id"`
	ImageURL   string    `json:"image_url"`
	AltText    string    `json:"alt_text"`
	CreatedAt  time.Time `json:"created_at"`
}

type ContactMessage struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Subject   string    `json:"subject"`
	Message   string    `json:"message"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
