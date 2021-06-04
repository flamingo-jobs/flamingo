FROM ubuntu:latest

MAINTAINER thatz98 <thatzweerakoon@gmail.com>

WORKDIR /usr/apps/flamingo-docker/

RUN apt-get -y update

RUN apt-get install -y nodejs

RUN apt-get install -y npm

RUN npm install -g concurrently

RUN npm install

ADD . /usr/apps/flamingo-docker/

CMD ["npm", "run", "dev"]
