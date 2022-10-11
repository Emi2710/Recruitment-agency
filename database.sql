-- users table

create table users(user_id serial primary key, email varchar(255) unique not null, password varchar(255) not null, role varchar, address varchar, firm varchar, name varchar, resume varchar);


create table crud_recruteur(job_id serial primary key, job_title varchar, job_place varchar, job_description varchar, author varchar);

