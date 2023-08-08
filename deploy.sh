#!/bin/bash

title() {
	echo ""
	echo "============================================"
	echo ""
	echo "$1"
	echo ""
	echo "============================================"
	echo ""
}

title "Start deploying project to Docker"

# Deploy to docker
docker compose up -d --force-recreate --build

title "Finish deploying project to Docker"

# Check dangling images
none_images=$(docker images -f "dangling=true" -q)
num_of_none_images=$(echo "$none_images" | wc -w)
echo "Docker has $num_of_none_images dangling images"

# Remove dangling images
if [ "$num_of_none_images" -gt 0 ]; then
	docker rmi "$none_images"
	echo "Remove $num_of_none_images dangling images in Docker successfully"
fi

title "Waiting 5 seconds to running program"

sleep 5

# Log running container
NAME_CONTAINER="api"
docker logs $NAME_CONTAINER
