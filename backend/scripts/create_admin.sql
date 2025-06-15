-- Add admin user (password: admin123)
INSERT INTO users (username, password_hash, email, role)
VALUES (
    'admin',
    '$2a$14$8Ux8vP7N1Yz7N1Yz7N1Yz.8Ux8vP7N1Yz7N1Yz7N1Yz7N1Yz7N1Yz',
    'admin@chaibedraa.dev',
    'admin'
) ON CONFLICT (username) DO NOTHING; 