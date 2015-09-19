FROM postgres:9.4

RUN apt-get update

RUN apt-get install -y python-pip git python-psycopg2 python-sqlalchemy python-whoosh python-markdown python-construct

RUN pip install -e git+https://github.com/veekun/pokedex.git#egg=pokedex

ADD 10-pokedex.sh /docker-entrypoint-initdb.d/10-pokedex.sh
