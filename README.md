# CRA (Compte-Rendu-Activite)
[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)  

Le projet CRA a pour but de resigner les temps activités effectués chez le client.
En phase de developpement, le projet est build sous NestJS et Angular. PostgreSQL est utilisé pour la base de données.
Pour run le projet un docker-compose ainsi que deux Dockerfile (front et back) sont crées.
Une documentation (Compodoc) est disponible sur la racine du projet ainsi q'une doc api (OPEN API Swagger).

## Pour commencer

Voici quelques pré-requis avant de commencer l'utilisation du projet.

### Pré-requis

- NPM
- Angular et Nest CLI
- Docker
- PostgreSQL & PgAdmin

### Installation

Voici les étapes pour installer et lancer le projet :

#### __Avec DOCKER__

- Placer vous à la racine du projet ou le docker-compose.yml se trouve.
- Executer la commmande suivante : ``docker compose up``

#### __Sans DOCKER__

Pour la partie NESTJS :

- `` npm install ``
- `` npm run start:dev ``
- Lancer pgAdmin et ajouter le serveur ainsi que la database qui se retrouve sur le fichier .env.
- Lancer le seeder pour créer des utilisateurs en base de données : `` npm run seed ``

Rendez-vous sur ``localhost:3000`` pour visualiser l'api.

Pour la partie Angular : 

## WIP



# Documentation

Pour NESTJS : la documentation est genérée avec Compodoc qui est sous la racine du projet.