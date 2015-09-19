# Pokemon API

This is primarily an experiment with Docker, Koa and Veekuns Pokedex data.

## Running

In order to run this image, you'll need to create a `database.env` file containing the following values:

```
POSTGRES_USER=<username for postgresql db>
POSTGRES_PASSWORD=<password for postgresql db>
POSTGRES_DB=<name of the postgresql db>
```

And once that's in place you can use Docker Compose:

`docker-compose up`
