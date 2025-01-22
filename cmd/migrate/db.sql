
CREATE TABLE persona (
    id      SERIAL PRIMARY KEY,
    name    VARCHAR(255),
    age     INTEGER,
    gmail   VARCHAR(255)
);


INSERT INTO 
persona ( name, age, gmail) 
VALUES ('caleb', 20, 'calebsenm@gmail.com');
