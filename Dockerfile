FROM node:16

LABEL maintainer="<cote.serveur@esprit.tn>"

ENV NODE_ENV=production

WORKDIR /home/node/app

COPY package*.json .

RUN npm i

COPY . .

EXPOSE 9090

CMD [ "npm", "start" ]