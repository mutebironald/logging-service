FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm ci

RUN rm -rf node_modules

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
