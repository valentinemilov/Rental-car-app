# Rental-car-app
Rental-car-app is a single-page application, which allows people in need to rent a big variety of cars.


## Docker Postgres Setup

- $ docker run --name cars -p 5432:5432 -e POSTGRES_PASSWORD=test -e POSTGRES_USER=testuser -d postgres:11.5


## Server

 After you clone successfully this repository:

- navigate to the api folder

- create .env file at root level- it contains sensitive data about your server. DB_USERNAME and DB_PASSWORD are  the ones set in your Postgres.

 DB_TYPE = postgres
 DB_HOST = localhost
 DB_PORT = 5432
 DB_USERNAME = test
 DB_PASSWORD = test
 DB_DATABASE_NAME = car

- create ormconfig.json file at root level

 {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "test",
    "password": "test",
    "database": "car",
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

 open the terminal or bash at root level and run the following commands in the following sequence:
 
 $ npm install

 $ npm run typeorm -- migration:run

 - to populate the database:
 $ npm run seed

 $ npm run start

 ## Client

 Having successfully run the server, you can run the application

 - navigate to the client folder

 - open the terminal and run the following commands:

 $ npm install

 $ npm start
