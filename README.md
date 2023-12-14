# Mission 5

Simple backend infrastructure for Mission 5 using Node and Express, all neatly packaged in a Docker container. There is a basic frontend to show functionality.

## Description

* Infrastructure for my group's UX Designers application to run.
* Application and database reside inside of Docker containers.
* Docker Compose used to host and run the containers.

## Getting Started

### Dependencies

* Install MongoDB daemon
* Install Docker Desktop
* Express
* Mongoose
* Path

### Installing

* Terminal 1: ```npm install```
* Terminal 2: ```sudo systemctl start mongod```
* Terminal 3: ```sudo docker-compose up --build```

### Using the program

* Open <http://localhost:3000/>
* Enter a message like "Hello World!"
* Refresh page and click "Fetch Messages" to retrieve

### Closing the program

* Terminal 2: ```sudo systemctl stop mongod```
* Terminal 3: ```Ctrl + C```

## Authors

Erin Kennedy
