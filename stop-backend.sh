# Скрипт для остановки серверной части tempor-IDE
kill `ps -eaf | grep 'theia start' | grep node | awk '{print $2}'`
