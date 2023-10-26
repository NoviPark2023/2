FROM node:18 as build-stage

WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.24.0

COPY --from=build-stage app/dist/ /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 3000
CMD [ "nginx", "-g", "daemon off;" ]