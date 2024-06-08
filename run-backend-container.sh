# Скрипт для запуска контейнера с серверной частью poST-IDE
# Аргументы:
#   1: порт, который конейнер будет слушать
if [ -z "$1" ]
  then
    echo "Please, specify the port to listen. Example:
$0 3000"
  else
    if [ "$(docker ps -q -f name=tide)" ]
      then
    	  echo "tempor-IDE container already running"
    	else
    	  if [ "$(docker ps -aq -f status=exited -f name=tempor-IDE)" ]
    	    then
    	      echo "Deleting old tempor-IDE container..."
    	      docker rm tide
    	  fi
    	  echo "Starting new tide container..."
    	  docker run --name tide -dp $1:3000 tide
    	  echo "tempor-IDE container is running in the background. You can see its logs by executing:
sudo docker logs TIDE
См. https://docs.docker.com/engine/reference/commandline/container_logs/"
    fi
fi
