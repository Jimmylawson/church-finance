ALTER TABLE users ALTER COLUMN password DROP NOT NULL;

ALTER TABLE users
    ADD CONSTRAINT uk_users_email UNIQUE (email);