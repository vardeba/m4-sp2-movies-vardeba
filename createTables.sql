CREATE DATABASE sprint_2;

CREATE TABLE IF NOT EXISTS movies(
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) UNIQUE NOT NULL,
	description TEXT DEFAULT NULL,
	duration INTEGER NOT NULL,
	price INTEGER NOT NULL
);

INSERT INTO
	movies(name, description, duration, price)
VALUES
	('The Matrix', 'Em um futuro próximo, Thomas Anderson (Keanu Reeves), um jovem programador de computador...', 136, 20),
	('Gladiador', 'O ano é de 180 d.C. e o general romano Maximus, servindo ao seu imperador Marco Aurélio, prepara seu exército...', 155, 35),
	('O Senhor dos Anéis: A Sociedade do Anel', 'Numa terra fantástica e única, chamada Terra-Média, um hobbit (seres de estatura entre 80 cm e 1,20 m, com pés peludos e bochechas um pouco avermelhadas) recebe de presente de seu tio o Um Anel...', 178, 40),
	('Harry Potter e a Pedra Filosofal', 'Harry Potter (Daniel Radcliffe) é um garoto órfão de 10 anos que vive infeliz com seus tios, os Dursley. Até que, repentinamente, ele recebe uma carta contendo um convite para ingressar em Hogwarts, uma famosa escola especializada em formar jovens bruxos...', 195, 35)
RETURNING *;
