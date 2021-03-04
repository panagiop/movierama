## How to run it (using Docker - Preferable way)
* Make sure you have [docker] installed. At the root folder run the following command:
```sh
docker-compose up -d
```
* Navigate to `http://localhost:8888/` to view the application.

## How to run it (using development servers)
### mongoDB
* Make sure you have [mongoDB] installed. 
* After, run the following command in terminal (`path_to_data` and `db_folder` folders should be already created):
```sh
mongod --dbpath <path_to_data/db_folder>
```
e.g:
```
mongod --dbpath ~/data/db
```
### Server
* Make sure you have [node.js] installed.
* After, inside the /server folder run:
```sh
npm install
```
* Inside the /server folder you can run it in development mode by typing:
```sh
npm run dev
```
### Client
* Inside the /client folder run:
```sh
npm install
```
* Inside the /client folder you can run it in development mode by typing:
```sh
ng serve
```
* Visit http://localhost:4200 to view the app


[docker]: <https://www.docker.com/>  
[mongoDB]: <https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials>
[node.js]: <https://nodejs.org/en/download/>
