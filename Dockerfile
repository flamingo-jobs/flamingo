FROM ubuntu:latest

MAINTAINER thatz98 <thatzweerakoon@gmail.com>

WORKDIR /usr/apps/flamingo-docker/

RUN apt-get -y update

RUN apt-get install -y nodejs

RUN apt-get install -y npm

RUN npm install -g concurrently

ADD . /usr/apps/flamingo-docker/

WORKDIR /usr/apps/flamingo-docker/

RUN npm install

WORKDIR /usr/apps/flamingo-docker/client

RUN npm install

WORKDIR /usr/apps/flamingo-docker/


CMD ["npm", "run", "dev"]
