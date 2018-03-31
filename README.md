	
# Home Pricing


## Docker 

### UBUNTU

1. https://www.digitalocean.com/community/tutorials/como-instalar-e-usar-o-docker-no-ubuntu-16-04-pt


## To Check Containers Available
  
   $ docker ps -a

# [1] Mobile Docker Instalation

 1. Run cmd
    ```
    $ cd mobile
    $ npm install yarn
    $ yarn
    $ sudo sh run-docker.sh
    ```
    note: This will take some time :)

### Connect to "Mobile" container 
 ```
   $ cd mobile/
   $ sudo sh react-native-container.sh 
   
   // To exit container
   $ exit 
 ```

### Run React-Native Inside "Mobile" Container

Inside container:
```
dev> adb reverse tcp:8081 tcp:8081 # CONNECT TO PHONE!you'll need android > 5.1 for this 

dev> react-native start > react-start.log 2>&1 & dev> react-native android
dev> react-native run-android
```

### Install missing packages [If needed]
```
dev> cd mobile/node_modules/react-native/
dev> yarn
```


# [2] Server Docker Launch

### Install Docker Compose
    
     $ sudo apt install docker-compose

### Run Crawler - Server - Mongo Containers
 * Run 
	```
	$ cd server
	$ sudo docker-compose up
	```

### List Container's ID's
	
	$ docker ps -a


### Connect to a certain Container

	// copy container ID

	$ docker exec -t -i CONTAINER_ID /bin/bash


### Stop a certain Container

	// copy container ID

	$ docker stop my_containerID

#### Hot reload

```
dev> watchman watch .
```


To enable it on your phone,
shake it, and select `Enable Hot Reloading`.
You will also need to access `Dev Settings > Debug server host & port for device`
and enter `localhost:8081`.


#### Install udev rules

On your host system, you'll need to install the android udev rules if you want to connect your phone or tablet via USB and deploy the react native app directly to it. You can get the rules from http://source.android.com/source/51-android.rules and you can install them as follows:

```
wget -S -O - http://source.android.com/source/51-android.rules | sed "s/<username>/$USER/" | sudo tee >/dev/null /etc/udev/rules.d/51-android.rules
sudo udevadm control --reload-rules
```


#### Refresh App 
   
 * Double-tap 'R'


### Instalation without docker

1. Download Android Studio (https://developer.android.com/studio/index.html)

2. Instalation guide (https://developer.android.com/studio/install.html)

3. Create Emulator and install android SDK https://facebook.github.io/react-native/docs/getting-started.html

4. Run
    ```
    $ sh install.sh
    ```
### To Run without Docker

 * Start android Emulator
 * Run $ react-native start
 * Run $ react-native run-Android



