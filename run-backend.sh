# Скрипт для запуска серверной части tempor-IDE
# tempor-IDE будет запущен в фоне, логи записываются в файл TIDE.log
# Аргументы:
#   1: хост ip
#   2: порт, который tempor-IDE будет слушать
#   3: начальная рабочая директория
if [ -z "$1" ] || [ -z "$2" ]
  then
    echo "Please, specify the ip and port to listen. Example:
$0 localhost 3000"
  else
    cd browser-app
    yarn run start --hostname $1 --port $2 --root-dir=$3
fi