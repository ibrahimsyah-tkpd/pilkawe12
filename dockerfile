FROM node:alpine

WORKDIR /app
COPY package.json ./
RUN npm install

COPY . .
RUN chmod +x cmd/wait-for.sh
CMD cmd/wait-for.sh db:5432 -- npm run build && npm run start