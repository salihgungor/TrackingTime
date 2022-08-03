#Get the node image for NestJS with specifying environnement
FROM node:16.16.0-alpine AS development

#Specify the directory 
WORKDIR /usr/src/app

#Copy the packages file from project in order to install dependencies
COPY package*.json ./

#Install dependencies with npm ci commands (ci do the same things, just better utilities in automation environnement)
RUN npm install

#Copy App Source
COPY . .

RUN npm run build

EXPOSE 3000

######################################

FROM node:16.16.0-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --from=development /usr/src/app/ .

EXPOSE 3000

CMD ["node", "dist/main"]