FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run bui
EXPOSE 3000
CMD ["npm", "start"]