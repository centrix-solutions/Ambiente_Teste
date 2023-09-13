

DROP DATABASE CentrixSolutions;

CREATE DATABASE CentrixSolutions;

USE CentrixSolutions;

CREATE TABLE Empressa(
	IDEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(70),
    CNPJ CHAR(18)
);

CREATE TABLE Local(
	IDLocal INT AUTO_INCREMENT,
    Nome VARCHAR(60),
    FKEmpresa INT,
	CONSTRAINT CT_Empressa_Local FOREIGN KEY (FKEmpresa) 
		REFERENCES Empressa(IDEmpresa),
	PRIMARY KEY (IDLocal,FKEmpresa)
);

CREATE TABLE Acesso(
	IDUsuario INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(70),
    Email VARCHAR(70),
    CPF CHAR(14),
    Senha CHAR(8),
	FKLocal INT,
    CONSTRAINT CT_Local_Acesso FOREIGN KEY (FKLocal) 
		REFERENCES Local(IDLocal),
	FKDiretor INT,
	CONSTRAINT CT_Diretor_Supervisor FOREIGN KEY (FKDiretor) 
		REFERENCES Acesso(IDUsuario)
);

CREATE TABLE Maquinas(
	IDMaquinas INT AUTO_INCREMENT,
    Modelo VARCHAR(70),
    SistemaOperacional VARCHAR(50),
    Fabricante VARCHAR(70),
    FKLocal INT,
    CONSTRAINT CT_Local_Maquinas FOREIGN KEY (FKLocal) 
		REFERENCES Local(IDLocal),
	PRIMARY KEY (IDMaquinas,FKLocal)
);

CREATE TABLE Componentes(
	IDComponentes INT AUTO_INCREMENT,
    Nome VARCHAR(50),
    FKMaquina INT,
	CONSTRAINT CT_Maquina_Componente FOREIGN KEY (FKMaquina) 
		REFERENCES Maquinas(IDMaquinas),
	PRIMARY KEY (IDComponentes,FKMaquina)
);

CREATE TABLE Leitura(
	IDLeitura INT AUTO_INCREMENT,
    Data_Hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    DadosCapturados FLOAT,
    FKComponente INT,
    CONSTRAINT CT_Leitura_Componente FOREIGN KEY (FKComponente) 
		REFERENCES Componentes(IDComponentes),
	PRIMARY KEY (IDleitura,FKComponente)
);

INSERT INTO Empressa VALUES (null,"GrapeTech","40.523.614/0001-72");

SELECT * FROM Empressa;

INSERT INTO Local VALUES (null,"Area de Atendimento",1);

SELECT * FROM Local;

INSERT INTO Acesso VALUES(null,"Admin","Admin@gmail.com","400.568.590-07","admin@01", 1,null);

SELECT * FROM Acesso;

INSERT INTO Maquinas VALUES(null,"Lenovo IdealPad","Windows","Lenovo",1);
INSERT INTO Maquinas VALUES(null,"Asus Gaming","Linux","Asus",1);
INSERT INTO Maquinas VALUES(null,"Positivo New","Windows","Positivo",1);

SELECT * FROM Maquinas;

INSERT INTO Componentes VALUES(null,"CPU",1);
INSERT INTO Componentes VALUES(null,"Memoria RAM",1);
INSERT INTO Componentes VALUES(null,"Disco",1);
INSERT INTO Componentes VALUES(null,"CPU",2);
INSERT INTO Componentes VALUES(null,"Memoria RAM",2);
INSERT INTO Componentes VALUES(null,"Disco",2);
INSERT INTO Componentes VALUES(null,"CPU",3);
INSERT INTO Componentes VALUES(null,"Memoria RAM",3);
INSERT INTO Componentes VALUES(null,"Disco",3);

SELECT * FROM Componentes;

SELECT * FROM Leitura JOIN Componentes ON FKComponente = IDComponentes WHERE FKMaquina = 3;


