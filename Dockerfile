FROM node:14.3.0-alpine3.11
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4005
CMD ["npm", "start"]