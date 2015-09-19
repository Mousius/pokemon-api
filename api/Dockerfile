FROM node:4.0

RUN apt-get update
RUN apt-get install -y netcat
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN npm install

CMD [ "./start" ]
