FROM node:current-alpine

WORKDIR /app

COPY . .

RUN npm install --production

EXPOSE 3000

CMD NODE_ENV=production npm run start