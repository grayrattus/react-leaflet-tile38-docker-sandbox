# Description

This is a simple PoC that shows how to use React, Leaflet, Tile38, Nginx and Docker.

I created it since there were not many simple sandboxes to play around with Tile38 server.

# Steps to run
First you need to run the backend
```
docker-compose up --build
```
This starts Nginx CORS proxy, Tile38 server and simple Bash server that changes position of points.

```
cd front/
npm run start
```
This starts web application.