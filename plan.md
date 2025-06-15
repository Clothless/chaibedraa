## Project Scan - Plan

This document outlines the findings from the project scan and details the necessary actions to improve the application.

### What needs to be fixed:

*   **Frontend:**
    *   Ensure all routes defined in `App.tsx` have corresponding functional components and pages. Specifically, verify or create the `Blog.tsx` page.
        *   **STATUS: DONE** - `frontend/src/pages/Blog.tsx` created.
    *   Thoroughly review `ProtectedRoute.tsx` and `AuthContext` implementation for proper authentication and authorization flow and security.
        *   **STATUS: REVIEWED** - `ProtectedRoute.tsx` and `AuthContext.tsx` reviewed; implementations are standard and functional for basic auth. Further security enhancements can be considered for production.

*   **Backend:**
    *   Implement robust error handling and logging mechanisms across all handlers and services.
        *   **STATUS: IMPROVED** - Centralized error handling with `respondWithError` implemented in `backend/handlers/handlers.go`. `log.Fatal` retained for critical startup errors in `backend/main.go`.
    *   Review and secure JWT secret management.
        *   **STATUS: NOTED** - Currently uses environment variables. For production, consider more secure secret management solutions.
    *   Ensure all existing API endpoints are functioning correctly and handle edge cases gracefully.
        *   **STATUS: MANUAL VERIFICATION REQUIRED** - Automated testing is needed to confirm full functionality and graceful error handling for all endpoints. I cannot directly run or test the application. Manual testing is recommended.

*   **Database:**
    *   Verify all existing database migrations are correctly applied and that the database schema aligns with the application's needs.
        *   **STATUS: FIXED** - `backend/migrations/init-db.sh` updated to execute all `.up.sql` migration files, ensuring proper schema setup.

### What needs to be added/removed:

*   **Frontend:**
    *   **Add:** Create `frontend/src/pages/Blog.tsx` for the blog page.
        *   **STATUS: DONE** - `frontend/src/pages/Blog.tsx` created with a basic component.
    *   **Add:** Implement components for blog post display and potentially a form for creating/editing blog posts if administrative functionality is desired.

*   **Backend:**
    *   **Add:** New API endpoints in `backend/handlers/` for blog post management (CRUD operations).
        *   **STATUS: DONE** - `CreateBlogPost`, `UpdateBlogPost`, and `DeleteBlogPost` handlers added to `backend/handlers/handlers.go` and integrated into `backend/main.go`.
    *   **Add:** New models in `backend/models/` to represent blog post data (e.g., `BlogPost` struct).
        *   **STATUS: DONE** - `BlogPost` struct updated in `backend/models/models.go`.
    *   **Add:** Database migrations in `backend/migrations/` to create a `blog_posts` table with necessary fields (title, content, author, created_at, updated_at, etc.).
        *   **STATUS: DONE** - `000005_create_blog_posts_table.up.sql` and `000005_create_blog_posts_table.down.sql` created.
    *   **Add:** Implement user registration and login functionalities within `backend/auth/` if not fully present, including password hashing and JWT generation.
        *   **STATUS: REVIEWED AND MODIFIED** - Login and registration handlers in `backend/handlers/auth.go` are present. Modified registration to set default user role to 'user'.
    *   **Add:** Consider adding a mechanism for database migrations to be run automatically or via a dedicated command within the `backend/cmd/` directory.

*   **General:**
    *   **Add:** Comprehensive unit, integration, and end-to-end tests for both frontend and backend components.
        *   **STATUS: PENDING** - Requires further discussion and implementation. Automated testing framework setup and test case creation will be needed.
    *   **Remove:** Any unused or redundant files and dependencies identified during the deeper scan.

### What features needs to be done:

*   **Blog Feature:** Implement full functionality for a blog, allowing users to view blog posts and potentially for administrators to create, edit, and delete them.
*   **User Management:** Complete user authentication and authorization, including roles (e.g., admin, regular user) to control access to certain features (e.g., dashboard, blog post creation).
*   **Contact Form Submission:** Ensure the contact form is fully functional, validates input, and properly stores messages in the database.
*   **Dashboard Functionality:** Develop the dashboard to display relevant information and provide administrative capabilities (e.g., managing blog posts, viewing contact messages).

### Next Steps:

I recommend you manually verify the API endpoints' functionality and error handling. Then, we can discuss how to implement comprehensive unit, integration, and end-to-end tests, or proceed with other features outlined in the plan. I will now consider adding a mechanism for database migrations to be run automatically or via a dedicated command within the `backend/cmd/` directory. 