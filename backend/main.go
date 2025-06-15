package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/Clothless/chaibedraa.dev/backend/auth"
	"github.com/Clothless/chaibedraa.dev/backend/handlers"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Get database configuration from environment variables
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	dbSSLMode := os.Getenv("DB_SSLMODE")

	// First connect to postgres database to create our database if it doesn't exist
	postgresURL := fmt.Sprintf("postgres://%s:%s@%s:%s/postgres?sslmode=%s",
		dbUser, dbPassword, dbHost, dbPort, dbSSLMode)

	postgresDB, err := sql.Open("postgres", postgresURL)
	if err != nil {
		log.Fatal(err)
	}
	defer postgresDB.Close()

	// Create database if it doesn't exist
	_, err = postgresDB.Exec(fmt.Sprintf("CREATE DATABASE %s", dbName))
	if err != nil {
		// Ignore error if database already exists
		log.Printf("Note: %v", err)
	}

	// Now connect to our database
	dbURL := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=%s",
		dbUser, dbPassword, dbHost, dbPort, dbName, dbSSLMode)

	db, err := sql.Open("postgres", dbURL)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Create tables if they don't exist
	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS contact_messages (
			id SERIAL PRIMARY KEY,
			name VARCHAR(255) NOT NULL,
			email VARCHAR(255) NOT NULL,
			subject VARCHAR(255) NOT NULL,
			message TEXT NOT NULL,
			created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
		);
		CREATE TABLE IF NOT EXISTS projects (
			id SERIAL PRIMARY KEY,
			title VARCHAR(255) NOT NULL,
			description TEXT NOT NULL,
			tech_stack TEXT[],
			github_link VARCHAR(255),
			demo_link VARCHAR(255),
			created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
		)
	`)
	if err != nil {
		log.Fatal(err)
	}

	// Test database connection
	if err := db.Ping(); err != nil {
		log.Fatal(err)
	}

	// Initialize services
	authService := auth.NewAuthService(os.Getenv("JWT_SECRET"))

	// Initialize handlers
	contactHandler := handlers.NewContactHandler(db)
	authHandler := handlers.NewAuthHandler(db, authService)
	projectsHandler := handlers.NewHandler(db)

	// Create router
	r := chi.NewRouter()

	// Middleware
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	// CORS configuration
	corsMiddleware := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	})
	r.Use(corsMiddleware.Handler)

	// Public routes
	r.Get("/api/health", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("OK"))
	})
	r.Get("/api/projects", projectsHandler.GetProjects)
	r.Get("/api/projects/{id}", projectsHandler.GetProject)

	// Auth routes
	r.Post("/api/auth/login", authHandler.Login)
	r.Post("/api/auth/register", authHandler.Register)

	// Protected routes
	r.Group(func(r chi.Router) {
		r.Use(authService.AuthMiddleware)
		r.Use(authService.AdminMiddleware)

		// Contact form
		r.Post("/api/contact", contactHandler.CreateMessage)
		r.Get("/api/contact", contactHandler.GetMessages)
		r.Delete("/api/contact/{id}", contactHandler.DeleteMessage)

		// Projects
		r.Post("/api/projects", projectsHandler.CreateProject)

		// Blog Posts
		r.Post("/api/blog", projectsHandler.CreateBlogPost)
		r.Put("/api/blog/{id}", projectsHandler.UpdateBlogPost)
		r.Delete("/api/blog/{id}", projectsHandler.DeleteBlogPost)
	})

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	if err := http.ListenAndServe(":"+port, r); err != nil {
		log.Fatal(err)
	}
}
