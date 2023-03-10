FROM node:16-alpine
WORKDIR /server
COPY ./package.json ./
COPY . .
RUN npm install
EXPOSE 3010
CMD ["npm", "run", "start"]