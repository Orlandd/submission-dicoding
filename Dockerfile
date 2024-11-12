FROM node:18-bullseye

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . .

CMD ["npm", "run", "start"]
