## Rental-car-app

Rental-car-app is a single-page application, created for car rental companies. It allows employees to keep records of the cars and the company clients.

### Docker Installation

If you do not have Docker installed, please make sure that you get it installed for your [operation system](https://docs.docker.com/install/).<br>
For Ubuntu, you can check this [video tutorial](https://www.youtube.com/watch?v=BahPNhvlKGU) to facilitate the process.

### Docker Postgres Setup

To install postgress in docker image, run the following command:

```
docker run --name cars -p 5432:5432 -e POSTGRES_PASSWORD=test -e POSTGRES_USER=test -d postgres:11.5
```

### Server

After you clone or download successfully this repository:

* navigate to the `api` folder;
* navigate to the `cars` folder. `package.json` file must be visible there;
* create `.env` file- it contains sensitive data about your server. DB_USERNAME and DB_PASSWORD are  the ones set in your Postgres. In this case both are `test`. Your `.env` should look like this:

```
 DB_TYPE = postgres
 DB_HOST = localhost
 DB_PORT = 5432
 DB_USERNAME = test
 DB_PASSWORD = test
 DB_DATABASE_NAME = cars
```

* then create `ormconfig.json` file in the same folder `cars` and add the block of code after this bullet. `username` and `password` must be the same as in `.env` file. In this case both are `test`.

```
 {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "test",
    "password": "test",
    "database": "cars",
    "synchronize": "false",
    "entities": [
        "src/database/entities/**/*.ts"
    ],
    "migrations": [
        "src/database/migration/**/*.ts"
    ],
    "cli": {
        "entitiesDir": "src/database/entities",
        "migrationsDir": "src/database/migration"
    }
}
```

 Open the terminal or bash at `cars` folder and run the following commands:
 
 * **npm install**
 * **npm run typeorm -- migration:run**
 * **npm run seed**
 * **npm run start:dev**

 ### Client

Having successfully run the server, you can run the application.

* navigate to the `client` folder;
* navigate to the `cars` folder. `package.json` file must be visible there;
* open the terminal or bash at `cars` folder and run the following commands:

* **npm install**
* **npm start**