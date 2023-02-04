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
	('Harry Potter e a Pedra Filosofal', 'Harry Potter (Daniel Radcliffe) é um garoto órfão de 10 anos que vive infeliz com seus tios, os Dursley. Até que, repentinamente, ele recebe uma carta contendo um convite para ingressar em Hogwarts, uma famosa escola especializada em formar jovens bruxos...', 195, 35),
	('O Exterminador do Futuro 2 - O Julgamento Final', 'A criança destinada a ser líder (Edward Furlong) já nasceu, mas vive infeliz por morar com pais adotivos, e por estar ser privada da companhia da mãe (Linda Hamilton), que foi considerada louca quando falou de um exterminador vindo do futuro...', 137, 40),
	('Avatar', 'Jake Sully (Sam Worthington) ficou paraplégico após um combate na Terra. Ele é selecionado para participar do programa Avatar em substituição ao seu irmão gêmeo, falecido. Jake viaja a Pandora, uma lua extraterrestre, onde encontra diversas e estranhas formas de vida...', 162, 50),
	('Pantera Negra', 'Em Pantera Negra, após a morte do rei TChaka (John Kani), o príncipe TChalla (Chadwick Boseman) retorna a Wakanda para a cerimônia de coroação....', 134, 40),
	('Vingadores: Guerra Infinita', 'Em Vingadores: Guerra Infinita, Thanos (Josh Brolin) enfim chega à Terra, disposto a reunir as Joias do Infinito. Para enfrentá-lo, os Vingadores precisam unir forças com os Guardiões da Galáxia, ao mesmo tempo em que lidam com desavenças entre alguns de seus integrantes...', 149, 50),
	('Vingadores: Ultimato', 'Em Vingadores: Ultimato, após Thanos eliminar metade das criaturas vivas em Vingadores: Guerra Infinita, os heróis precisam lidar com a dor da perda de amigos e seus entes queridos. Com Tony Stark (Robert Downey Jr.) vagando perdido no espaço sem água nem comida, o Capitão América/Steve Rogers (Chris Evans) e a Viúva Negra/Natasha Romanov (Scarlett Johansson) precisam liderar a resistência contra o titã louco...', 181, 65),
	('Homem-Aranha: No Aranhaverso', 'Miles Morales é um jovem negro do Brooklyn que se tornou o Homem-Aranha inspirado no legado de Peter Parker, já falecido. Entretanto, ao visitar o túmulo de seu ídolo em uma noite chuvosa, ele é surpreendido com a presença do próprio Peter, vestindo o traje do herói aracnídeo sob um sobretudo. A surpresa fica ainda maior quando Miles descobre que ele veio de uma dimensão paralela, assim como outras versões do Homem-Aranha...', 117, 55),
	('Homem-Aranha: Sem Volta para Casa', 'Peter Parker (Tom Holland) precisará lidar com as consequências da sua identidade como o herói mais querido do mundo após ter sido revelada pela reportagem do Clarim Diário, com uma gravação feita por Mysterio (Jake Gyllenhaal) no filme anterior. Incapaz de separar sua vida normal das aventuras de ser um super-herói, além de ter sua reputação arruinada por acharem que foi ele quem matou Mysterio e pondo em risco seus entes mais queridos, Parker pede ao Doutor Estranho (Benedict Cumberbatch) para que todos esqueçam sua verdadeira identidade...', 148, 30)
RETURNING *;