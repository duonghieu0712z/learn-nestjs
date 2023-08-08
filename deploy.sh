#!/bin/bash

NAME="learn-nestjs"

# Deploy to docker
echo "Start deploy project to Docker"
echo "============================================"
echo ""

docker compose up -d --force-recreate --build

echo ""
echo "============================================"
echo "Finish deploy project to Docker"

echo ""
echo "============================================"
echo ""

# Remove <none> images
none_images=$(docker images -f "dangling=true" -q)
num_of_none_images=$(echo "$none_images" | wc -w)
echo "Docker has $num_of_none_images <none> images"

if [ "$num_of_none_images" -gt 0 ]; then
	docker rmi "$none_images"
	echo "Remove $num_of_none_images <none> images in Docker successfully"
fi

echo ""
echo "============================================"
echo ""

# Log running container
echo "Waiting 5 seconds to running program"
sleep 5
docker logs $NAME
