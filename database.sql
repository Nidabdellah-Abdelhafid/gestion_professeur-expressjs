CREATE TABLE users 
( id INT NOT NULL ,
 nom VARCHAR(255) NOT NULL ,
  email VARCHAR(255) NOT NULL , 
  password VARCHAR(255) NOT NULL ,
   PRIMARY KEY (id));


 CREATE TABLE professeurs 
( id INT NOT NULL ,
 nom VARCHAR(255) NOT NULL ,
  prenom VARCHAR(255) NOT NULL , 
  photo VARCHAR(255) NOT NULL ,
   PRIMARY KEY (id));
  




  CREATE SEQUENCE IF NOT EXISTS users_id_seq;

SELECT SETVAL('users_id_seq', (
  SELECT max(id) FROM users)
);

ALTER TABLE users
ALTER COLUMN id
SET DEFAULT nextval('users_id_seq'::regclass);

ALTER SEQUENCE users_id_seq
OWNED BY users.id;


CREATE SEQUENCE IF NOT EXISTS professeurs_id_seq;

SELECT SETVAL('professeurs_id_seq', (
  SELECT max(id) FROM professeurs)
);

ALTER TABLE professeurs
ALTER COLUMN id
SET DEFAULT nextval('professeurs_id_seq'::regclass);

ALTER SEQUENCE professeurs_id_seq
OWNED BY professeurs.id;