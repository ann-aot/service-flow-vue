FROM node:14.17.4-alpine as build-stage

WORKDIR  /service-flow-vue/app

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

COPY package-lock.json /service-flow-vue/app/
COPY package.json /service-flow-vue/app/
 
RUN npm install  
COPY . /service-flow-vue/app/
RUN npm run build

FROM nginx:1.17 as production-stage
RUN mkdir /app
COPY --from=build-stage  /service-flow-vue/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 4040:4040
CMD ["nginx", "-g", "daemon off;"]
