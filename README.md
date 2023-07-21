# NgRx V16


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build Backend server
You'll need [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed on your machine.

From the root folder navigate to `back-end/koa-knex-realworld-example-master` and Run:

```sh
docker-compose build
```

Docker will build and install the necessary deps for the backend application.

## Run Backend server

From the root folder navigate to `back-end/koa-knex-realworld-example-master` and Run:

```sh
docker-compose up
```

Docker will spin up your built image from the section above and make your API available at: `http://localhost:3000/api`
