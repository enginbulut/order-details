FROM node:10

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .
# Run the app when the container launches
RUN npm run build

EXPOSE 8080

CMD [ "node", "index.js" ]