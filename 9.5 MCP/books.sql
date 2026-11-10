-- books.sql: a small table for Exercise 2
CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    author VARCHAR(100) NOT NULL,
    published_year INT
);

INSERT INTO books (title, author, published_year) VALUES
    ('Princess of Wilderness', 'Diana Ramli', 2019),
    ('We Are All Lost Stars', 'Yoda', 1991);