#!/bin/bash
echo "Welcome to the Cars Application"

echo -n "-Enter docker image name: "
read PROJECT
echo ${PROJECT:-cars}

if [ "$(docker ps -a --filter name=^/$PROJECT$ --format {{.Names}})" ]; then
    if [ "$(docker ps --filter name=^/$PROJECT$ --format {{.Names}})" ]; then
        cd api
        npm run typeorm migration:run
        x-terminal-emulator -e "npm run start:dev"
        cd ../client
        x-terminal-emulator -e "npm start"
    else
        echo "Container '$PROJECT' is not started!"
    fi
    exit
fi

echo -n "-Enter database name: "
read DATABASENAME
echo ${DATABASENAME:-cars}

echo -n "-Enter database username: "
read USERNAME
echo ${USERNAME:-test}

echo -n "-Enter database password: "
read PASSWORD
echo ${PASSWORD:-test}

if [ "$(docker ps --filter publish=5432/tcp --format {{.Ports}})" ]; then
    echo "Port 5432 is already allocated!"
    exit
fi

echo "Creating docker image..."
docker run --name ${PROJECT:-cars} -p 5432:5432 -e \
POSTGRES_PASSWORD=${PASSWORD:-test} -e \
POSTGRES_USER=${USERNAME:-test} -e \
POSTGRES_DB=${DATABASENAME:-cars} -d postgres:11.5

cd api
echo $PWD

touch .env
echo "DB_TYPE = postgres
DB_HOST = localhost
DB_PORT = 5432
DB_USERNAME = ${USERNAME:-test}
DB_PASSWORD = ${PASSWORD:-test}
DB_DATABASE_NAME = ${DATABASENAME:-cars}
" >> .env

touch ormconfig.json
echo '{
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "'${USERNAME:-test}'",
    "password": "'${PASSWORD:-test}'",
    "database": "'${DATABASENAME:-cars}'",
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
}' >> ormconfig.json

echo "Installing API dependencies..."
npm install
echo "Running database migrations..."
npm run typeorm migration:run

echo "Starting the Server..."
x-terminal-emulator -e "npm run start:dev"

cd ../client
echo $PWD

echo "Installing Client dependencies..."
npm install
npm install --save-dev @babel/preset-react

echo "Starting the Application..."
x-terminal-emulator -e "npm start"