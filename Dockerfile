FROM node:14.17.4-alpine as build-stage

WORKDIR  /service-flow-vue/app

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

# copy package.json and package-lock.json
COPY package.json /service-flow-vue/app/

# Install packages
RUN npm install

# copy project files
COPY . /service-flow-vue/app/

EXPOSE 4000:4000
CMD ["npm", "run", "serve"]
