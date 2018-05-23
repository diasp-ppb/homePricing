#!bin/bash

docker stop react-native

docker  build -t react-native .

chmod +x react-native-container.sh


