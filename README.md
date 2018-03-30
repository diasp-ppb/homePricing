	
# Home Pricing



## Instalation without docker

1. Download Android Studio (https://developer.android.com/studio/index.html)

2. Instalation guide (https://developer.android.com/studio/install.html)

3. Create Emulator and install android SDK https://facebook.github.io/react-native/docs/getting-started.html

4. Run
    ```
    $ sh install.sh
    ```

## Docker Install

#### UBUNTU

1. https://www.digitalocean.com/community/tutorials/como-instalar-e-usar-o-docker-no-ubuntu-16-04-pt


### Mobile 

#### Connect to container 
 * $ homepricing/scripts/react-native-container.sh 
 
#### Install missing packages [If needed]
```
dev> cd node_modules/react-native/
dev> yarn
```

#### Run project

Inside container:
```
dev> adb reverse tcp:8081 tcp:8081 # you'll need android > 5.1 for this
dev> react-native start > react-start.log 2>&1 &
dev> react-native android
dev> react-native run-android
```

#### Hot reload

```
dev> watchman watch .
```


To enable it on your phone,
shake it, and select `Enable Hot Reloading`.
You will also need to access `Dev Settings > Debug server host & port for device`
and enter `localhost:8081`.


## Install udev rules

On your host system, you'll need to install the android udev rules if you want to connect your phone or tablet via USB and deploy the react native app directly to it. You can get the rules from http://source.android.com/source/51-android.rules and you can install them as follows:

```
wget -S -O - http://source.android.com/source/51-android.rules | sed "s/<username>/$USER/" | sudo tee >/dev/null /etc/udev/rules.d/51-android.rules
sudo udevadm control --reload-rules
```

## To Run

 * Start android Emulator
 * Run $ react-native start
 * Run $ react-native run-Android


## Refresh App 
   
 * Double-tap 'R'
