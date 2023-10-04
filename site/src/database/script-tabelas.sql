create database centrix;
use centrix;
DROP database centrix;

CREATE TABLE Empresa(
	idempresa INT PRIMARY KEY AUTO_INCREMENT,
    Nome_fantasia VARCHAR(45),
    CNPJ CHAR(18),
    Responsavel_legal VARCHAR(45),
    CEP char(9),
    numero int,
    complemento varchar(45),
	fkSede int,
    CONSTRAINT fk_Sede FOREIGN KEY (fkSede) 
		REFERENCES Empresa(idempresa)
);

CREATE TABLE Funcionario(
	idfuncionario INT PRIMARY KEY AUTO_INCREMENT,
    nome varchar(70),
    email varchar(70),
    senha varchar(45),
    fkEmpFunc int,
    CONSTRAINT fk_EmpFunc FOREIGN KEY (fkEmpFunc) 
		REFERENCES Empresa(Idempresa),
    fkNivelAcesso int,
    CONSTRAINT fk_Nivel_Acesso foreign key (fkNivelAcesso)
		REFERENCES Niveis_de_Acesso(idNivel_Acesso),
	fkTurno int,
    CONSTRAINT fk_turno foreign key (fkTurno)
		REFERENCES Turno (idPeriodo_de_Operacao)
);
    
CREATE TABLE Niveis_de_Acesso (
	idNivel_Acesso INT PRIMARY KEY auto_increment,
	tipo_acesso VARCHAR(45),
	descricao VARCHAR(45)
);

CREATE TABLE Turno (
	idPeriodo_de_Operacao INT PRIMARY KEY auto_increment,
	inicio TIME,
	fim TIME
);

CREATE TABLE Maquinas (
	idMaquina INT primary key auto_increment,
    Sistema_Operacional VARCHAR(45),
    Id_do_dispositivo CHAR(36),
    fkEmpMaq int,
		CONSTRAINT fk_EmpMaq foreign key (fkEmpMaq)
		REFERENCES idempresa (Empresa),
	fkAndarDeTrabalho int,
		CONSTRAINT fk_Andar_De_Trabalho foreign key (fkAndarDeTrabalho)
		REFERENCES idAndar_de_trabalho (Andar_de_trabalho)
);

CREATE TABLE Andar_de_trabalho (
	idAndar_de_trabalho INT primary key auto_increment,
    Foto_Andar VARCHAR(45)
    );