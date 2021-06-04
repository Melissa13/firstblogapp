### firstblogapp
Practice app made in a training. It can store and manage data about users and the blogs created. For the moment it only has the Backend properly implemented, so is needed to use postman in order to test the app

## Getting Started
- Clone the repository
- Have npm installed in your computer
- Install the next dependencies:
  * express
  * sequelize
  * elsint and prettier
  * Nodemon
- Have docker and PostgresSQL on you computer
- Install postman

## How to run the app
- In the root of the proyect use make start
- Use postan to test see and manage the model data with GET, POST, PUT, etc . Example url: http://localhost:8080/api/users

## General operation of the app
it has the next folders:
- bin: this is where the port is established and other initial files are created
- config: here the Database is initialize with the required models. also all the basic controllers for these models are create
- controllers: extra controllers for the models are stored here
- models: here is where the data tables are stablished
- services: functions for general uses and other utilities for the app are stored here.

Then, there is app.js, the entry point of the app
