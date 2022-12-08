#!bin/bash

echo "Pulling"
git pull

exho "Building application"
docker-compose up -d --build