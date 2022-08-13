#Get the node image for NestJS with specifying environnement
FROM node:16.16.0-alpine

#Specify the directory 
WORKDIR /teampify/client/src/app

#Copy the packages file from project in order to install dependencies
COPY package*.json ./

#Install dependencies with npm ci commands (ci do the same things, just better utilities in automation environnement)
RUN npm install
RUN npm install -g @angular/cli@14.0.6

#Copy App Source
COPY . .

RUN npm run build

EXPOSE 4200