drop database centrix;
CREATE DATABASE centrix;
USE centrix;

CREATE TABLE Niveis_de_Acesso (
    idNivel_Acesso INT PRIMARY KEY AUTO_INCREMENT,
    tipo_acesso VARCHAR(45),
    descricao VARCHAR(45)
);

INSERT INTO Niveis_de_Acesso (tipo_acesso, descricao)
VALUES
    ('Administrador', 'Acesso total ao sistema'),
    ('Moderador', 'Acesso para moderar conteúdo'),
    ('Usuário Registrado', 'Acesso básico como usuário registrado'),
    ('Convidado', 'Acesso limitado para convidados'),
    ('Visitante', 'Acesso mínimo como visitante');

CREATE TABLE Andar_de_trabalho (
    idAndar_de_trabalho INT PRIMARY KEY AUTO_INCREMENT,
    Foto_Andar VARCHAR(45)
);

CREATE TABLE Empresa(
    idempresa INT PRIMARY KEY AUTO_INCREMENT,
    Nome_fantasia VARCHAR(45),
    CNPJ CHAR(18),
    Responsavel_legal VARCHAR(45),
    CEP CHAR(9),
    numero INT,
    complemento VARCHAR(45),
    fkSede INT,
    CONSTRAINT fk_Sede FOREIGN KEY (fkSede) REFERENCES Empresa(idempresa)
);

CREATE TABLE Turno (
    idPeriodo_de_Operacao INT PRIMARY KEY AUTO_INCREMENT,
    inicio TIME,
    fim TIME
);

CREATE TABLE Funcionario(
    idfuncionario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(70),
    email VARCHAR(70),
    senha VARCHAR(45),
    fkEmpFunc INT,
    CONSTRAINT fk_EmpFunc FOREIGN KEY (fkEmpFunc) REFERENCES Empresa(idempresa),
    fkNivelAcesso INT,
    CONSTRAINT fk_Nivel_Acesso FOREIGN KEY (fkNivelAcesso) REFERENCES Niveis_de_Acesso(idNivel_Acesso),
    fkTurno INT,
    CONSTRAINT fk_turno FOREIGN KEY (fkTurno) REFERENCES Turno(idPeriodo_de_Operacao)
);

CREATE TABLE Maquinas (
    idMaquina INT PRIMARY KEY AUTO_INCREMENT,
    Sistema_Operacional VARCHAR(45),
    Id_do_dispositivo CHAR(16),
    fkEmpMaq INT,
    CONSTRAINT fk_EmpMaq FOREIGN KEY (fkEmpMaq) REFERENCES Empresa(idempresa),
    fkAndarDeTrabalho INT,
    CONSTRAINT fk_Andar_De_Trabalho FOREIGN KEY (fkAndarDeTrabalho) REFERENCES Andar_de_trabalho(idAndar_de_trabalho)
);

CREATE TABLE ComponentesQuePrestamosServico(
	idComponentes_Que_PrestamosServicos INT PRIMARY KEY auto_increment,
    nome varchar(45)
);

CREATE TABLE Componentes_Monitorados (
	idComponente_monitorado INT PRIMARY KEY auto_increment,
    valor Double,
    fkComponentesExistentes INT,
    CONSTRAINT fk_ComponentesExistentes foreign key (fkComponentesExistentes) references ComponentesQuePrestamosServico(idComponentes_Que_PrestamosServicos),
    fkMaquina INT,
    CONSTRAINT fk_Maquina foreign key (fkMaquina) references Maquinas(idMaquina),
    fkEmpMaqComp INT,
    constraint fk_EmpMaqComp foreign key (fkEmpMaqComp) references Maquinas(fkEmpMaq)
);

CREATE TABLE Monitoramento (
	idMonitoramento INT primary key auto_increment,
    Data_captura DATE,
    Hora_captura TIME,
    Dado_Capturado FLOAT,
    fkCompMonitorados INT,
    constraint fk_CompMonitorados foreign key (fkCompMonitorados) references Componentes_Monitorados(idComponente_monitorado),
    fkCompMoniExistentes INT,
    constraint fk_CompMoniExistentes foreign key (fkCompMoniExistentes) references Componentes_Monitorados(fkComponentesExistentes),
    fkMaqCompMoni INT,
    constraint fk_MaqCompMoni foreign key (fkMaqCompMoni) references Componentes_Monitorados(fkMaquina),
    fkEmpMaqCompMoni INT,
    constraint fk_EmpMaqCompMoni foreign key (fkEmpMaqCompMoni) references Componentes_Monitorados(fkEmpMaqComp)
);

CREATE TABLE Login (
    idFuncionario INT,
    idMaquina INT,
    idEmpresa INT,
    Nome VARCHAR(30),
    Atividade VARCHAR(70),
    HoraLogin TIME,
    Turno INT,
    PRIMARY KEY (idFuncionario, idMaquina, idEmpresa),
    FOREIGN KEY (idFuncionario) REFERENCES Funcionario(idfuncionario),
    FOREIGN KEY (idMaquina) REFERENCES Maquinas(idMaquina),
    FOREIGN KEY (Turno) REFERENCES Funcionario (FkTurno),
    FOREIGN KEY (idEmpresa) REFERENCES Funcionario (fkEmpFunc)
);

INSERT INTO Andar_de_trabalho (Foto_Andar)
VALUES
    ('andar1.jpg'),
    ('andar2.jpg'),
    ('andar3.jpg');
    
INSERT INTO Empresa (Nome_fantasia, CNPJ, Responsavel_legal, CEP, numero, complemento, fkSede)
VALUES
    ('Empresa A', '12.345.678/9012-34', 'Responsável A', '12345-678', 123, 'Complemento A', 1),
    ('Empresa B', '98.765.432/1098-76', 'Responsável B', '54321-876', 456, 'Complemento B', 2),
    ('Empresa C', '56.789.012/3456-78', 'Responsável C', '98765-432', 789, 'Complemento C', 3);

    INSERT INTO Turno (inicio, fim)
VALUES
    ('08:00:00', '16:00:00'),
    ('16:00:00', '00:00:00'),
    ('00:00:00', '08:00:00');
    
INSERT INTO Funcionario (nome, email, senha, fkEmpFunc, fkNivelAcesso, fkTurno)
VALUES
    ('Funcionário 1', 'funcionario1@email.com', 'senha1', 1, 1, 1),
    ('Funcionário 2', 'funcionario2@email.com', 'senha2', 2, 2, 2),
    ('Funcionário 3', 'funcionario3@email.com', 'senha3', 3, 3, 3);
    
INSERT INTO ComponentesQuePrestamosServico (nome) VALUES
    ('CPU'),
    ('DISCO'),
    ('RAM'),
    ('USB'),
    ('Taxa Dowload'),
    ('Taxa Upload'),
    ('Janelas do Sistema'),
    ('Processos');
    
select * from Login;    
select * from Maquinas;
select * from Monitoramento;
select * from Componentes_Monitorados;
select * from ComponentesQuePrestamosServico;
SELECT
    L.Nome AS NomeFuncionario,
    L.Atividade,
    T.inicio AS HoraInicioTurno,
    T.fim AS HoraFimTurno
FROM
    Login AS L
JOIN
    Turno AS T ON L.Turno = T.idPeriodo_de_Operacao
WHERE
    L.idEmpresa = 1
    AND L.idMaquina = 1;




