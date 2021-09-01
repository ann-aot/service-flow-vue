FROM node:14.15.1 as build-stage

WORKDIR  /service-flow-vue/app

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

# copy package.json and package-lock.json
COPY ./package*.json ./

# Install packages
RUN npm install

# copy project files
COPY . /service-flow-vue/app/
RUN npm run build

FROM nginx:1.18.0 as production-stage

RUN echo "hello1"
COPY nginx.conf /etc/nginx/nginx.conf
RUN echo "hello2"
RUN mkdir /service-flow-vue/app

COPY --from=build-stage /app/dist /app
EXPOSE 8080:8080
CMD ["nginx", "-g", "daemon off;"]
