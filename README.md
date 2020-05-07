## Rental-car-app

Rental-car-app is a single-page application, created for car rental companies. It allows employees to keep records of the cars and the company clients.

### Docker Installation

If you do not have Docker installed, please make sure that you get it installed for your *[operation system](https://docs.docker.com/install/)*.<br>
For Ubuntu, you can check this *[video tutorial](https://www.youtube.com/watch?v=BahPNhvlKGU)* to facilitate the process.

### Automatic Environment Setup

Having successfully installed Docker, you can skip the manual configuration. The environment will be set for you and the application will start automatically. 

* navigate to the `Rental-car-app` folder. `startscript` file must be visible there;

* open the terminal or bash and run the following command:

#### **`./startscript`**

**Note: to configure your environment manually, follow the steppes below.**

### Docker Postgres Setup

To install postgress in docker image, run the following command:

`docker run --name **cars** -p 5432:5432 -e POSTGRES_PASSWORD=**test** -e POSTGRES_USER=**test** -e POSTGRES_DB=**cars** -d postgres:11.5`

**Note: the bolded arguments are your credentials. They are as follows: the docker image name, your postgres password, postgres username and posgres database name. It would be better if you changed them with your own values before running the above command. And do not forget what you have entered!**

### Server

After you clone or download successfully this repository:

* navigate to the `api` folder. `package.json` file must be visible there;

* create `.env` file- it contains sensitive data about your server. `DB_USERNAME`, `DB_PASSWORD` and `DB_DATABASE_NAME` are  the ones set in your Postgres docker image. If you have not changed them, they are as follows: `test`, `test`, `cars`. Your `.env` should look like this:

```
DB_TYPE = postgres
DB_HOST = localhost
DB_PORT = 5432
DB_USERNAME = test
DB_PASSWORD = test
DB_DATABASE_NAME = cars
```

* then create `ormconfig.json` file in the same folder `api` and add the block of code after this bullet. `username`, `password` and `database` must be the same as in `.env` file. In this case they are as follows: `test`, `test`, `cars`.

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

Open the terminal or bash in `api` folder and run the following commands:
 
#### **`npm install`**

#### **`npm run typeorm migration:run`**

#### **`npm run start:dev`**

### Client

Having successfully run the server, you can run the application.

* navigate to the `client` folder. `package.json` file must be visible there;

* open the terminal or bash and run the following commands:  

#### **`npm install`**

#### **`npm install --save-dev @babel/preset-react`**

#### **`npm start`**

### Testing

#### Server Unit Tests
* open the terminal or bash in `api` folder and run the following command:

#### **`npm run test`**

#### Client Unit Tests

* open the terminal or bash in `client` folder and run the following command:

#### **`npm run test`**

#### Client Nightwatch Test

* open the terminal or bash in `client` folder and run the following command:

#### **`npm run test-e2e`**

### Technologies

* React

* NestJS

* Nightwatch

* Jest

* Bootstrap

* TypeORM
