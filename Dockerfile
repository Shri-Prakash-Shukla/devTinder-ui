FROM node:24.12.0-alpine AS build

WORKDIR /devtinder-ui

COPY  ./package*.json .

RUN npm install

COPY ./ ./

RUN npm run build

FROM nginx:alpine 

EXPOSE 80

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /devtinder-ui/dist/devTinder-ui/browser /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]