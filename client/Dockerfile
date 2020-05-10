FROM node:alpine as node

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .
# Run the app when the container launches
RUN npm run build

FROM nginx:1.15.2-alpine
COPY --from=node /usr/src/app/build /var/www/
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]