#Get the node image for NestJS with specifying environnement
FROM node:16.16.0

#Specify the directory 
WORKDIR /teampify/api/src/app

#Copy the packages file from project in order to install dependencies
COPY package*.json /teampify/api/src/app/

#Install dependencies with npm ci commands (ci do the same things, just better utilities in automation environnement)
RUN npm install
RUN npm uninstall bcrypt
RUN npm i bcrypt

#Copy App Source
COPY . /teampify/api/src/app/

EXPOSE 3000
CMD ["npm", "run", "start:dev"]