package main

import (
	"database/sql"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"strings"

	_ "github.com/lib/pq"
)

func main() {
	// Load database configuration from environment variables
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	dbSSLMode := os.Getenv("DB_SSLMODE")

	if dbHost == "" || dbPort == "" || dbUser == "" || dbPassword == "" || dbName == "" || dbSSLMode == "" {
		log.Fatal("Missing database environment variables")
	}

	dbURL := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=%s",
		dbUser, dbPassword, dbHost, dbPort, dbName, dbSSLMode)

	db, err := sql.Open("postgres", dbURL)
	if err != nil {
		log.Fatalf("Error opening database connection: %v", err)
	}
	defer db.Close()

	if err := db.Ping(); err != nil {
		log.Fatalf("Error connecting to the database: %v", err)
	}

	log.Println("Database connection successful. Applying migrations...")

	migrationsDir := "./backend/migrations"
	files, err := ioutil.ReadDir(migrationsDir)
	if err != nil {
		log.Fatalf("Error reading migrations directory: %v", err)
	}

	for _, file := range files {
		if !file.IsDir() && filepath.Ext(file.Name()) == ".sql" && strings.HasSuffix(file.Name(), ".up.sql") {
			filePath := filepath.Join(migrationsDir, file.Name())
			log.Printf("Applying migration: %s", file.Name())

			sqlContent, err := ioutil.ReadFile(filePath)
			if err != nil {
				log.Fatalf("Error reading migration file %s: %v", file.Name(), err)
			}

			_, err = db.Exec(string(sqlContent))
			if err != nil {
				log.Fatalf("Error executing migration %s: %v", file.Name(), err)
			}
		}
	}

	log.Println("All migrations applied successfully!")
}
