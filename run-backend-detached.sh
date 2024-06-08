# Скрипт для запуска серверной части tempor-IDE
# tempor-IDE будет запущен в фоне, логи записываются в файл TIDE.log
# Аргументы:
#   1: хост ip
#   2: порт, который tempor-IDE будет слушать
if [ -z "$1" ] || [ -z "$2" ]
  then
    echo "Please, specify the ip and port to listen. Example:
$0 localhost 3000"
  else
    LOG_FILE="TIDE.log"
    nohup ./run-backend.sh $1 $2 > $LOG_FILE 2>&1 &
    echo "tempor-IDE is run in the background. Standart output and standart error is forwarded to $LOG_FILE."
fi
