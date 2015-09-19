FROM ubuntu

RUN apt-get update -qq && \
  apt-get upgrade -yqq && \
  apt-get -yqq install varnish && \
  apt-get -yqq clean

ADD default.vcl /etc/varnish/default.vcl

EXPOSE 80

ADD start /start

CMD [ "/start" ]
