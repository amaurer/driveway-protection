#! /bin/bash

docker run -d --restart=always -p 8080:8080 -v /home/pi/projects/driveway-protection/.env:/opt/.env --name driveway amaurer/driveway-protection:latest