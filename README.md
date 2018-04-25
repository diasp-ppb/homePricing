	
# Home Pricing


## Docker 

### UBUNTU

1. https://www.digitalocean.com/community/tutorials/como-instalar-e-usar-o-docker-no-ubuntu-16-04-pt


## Mobile 

### Instalation without docker

1. Download Android Studio (https://developer.android.com/studio/index.html)

2. Instalation guide (https://developer.android.com/studio/install.html)

3. Create Emulator and install android SDK https://facebook.github.io/react-native/docs/getting-started.html

4. Run
    ```
    $ sh install.sh
    ```
### To Run

 * Start android Emulator
 * Run $ react-native start
 * Run $ react-native run-Android


### Instalation with docker

 1. Run 
    ```
    $ cd mobile
    $ yarn
    $ sh run-docker.sh
    ```
    note: This will take some time :)

#### Connect to container 
 ```
   $ cd mobile/
   $ sh react-native-container.sh 
 ```
#### Install missing packages [If needed]
```
dev> cd mobile/node_modules/react-native/
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


#### Install udev rules

On your host system, you'll need to install the android udev rules if you want to connect your phone or tablet via USB and deploy the react native app directly to it. You can get the rules from http://source.android.com/source/51-android.rules and you can install them as follows:

```
wget -S -O - http://source.android.com/source/51-android.rules | sed "s/<username>/$USER/" | sudo tee >/dev/null /etc/udev/rules.d/51-android.rules
sudo udevadm control --reload-rules
```


#### Refresh App 
   
 * Double-tap 'R'



## Server
 * Run 
	```
	$ cd server
	$ docker-compose up
	```

### Crawler
 * Run (in the server folder)
	```
	$ cd crawler
	$ sh run-crawler.sh
	```
 * JSON retrieved by the crawler
   * `title` : Title of the advertisement.
   * `price` : Price of the property *(€)*.
   * `area` : Useful area of the property *(m²)*.
   * `tipology` : Type of property *(T1, T2, T3, ...)*.
   * `characteristics` : List of features of the property *(ex: Balcony, Central Heating, Lift, etc.)*.
   * `description` : Description of the property, written by the owner.
   * `address` : Dictionary with the address of the property. *(ex: Zipcode, Town, County and District)*.
   * `webpage` : Original webpage of the advertisement.
   * `year` : Year of construction
   * `energyCertificate` : Degree of energetical efficiency *(ex: A+, A, B, ...)*.
   * `condition` : Conservation state of the property *(ex: Used, Renewed, In construction)*
   * `bathrooms` : Number of bathrooms
   * `negotiable` : Indicates if the price is negotiable or not
   * `grossArea` : Gross area of the property *(m²)*
   * `coordinates` : Latitude and Longitude of the property
 * Example:
```
[
{"area": 198, 
"description": "Sala com Lareira\n\ndespensa\n\nGrande Cozinha\n\nVaranda\n\nExcelentes quartos com roupeiro\n\nCondomínio reservado com grandes àreas ajardinadas\n\nNão hesite... Visite!...\n\n",
"title": "T4 Dúplex condomínio fechado Garagem 2 Carros – Vilar do Paraíso",
"webpage": "https://www.imovirtual.com/anuncio/t4-duplex-condominio-fechado-garagem-2-carros-vilar-do-paraiso-IDEmyR.html", 
"characteristics": ["Aquecimento Central", " Ar Condicionado", " Condomínio fechado", " Cozinha Equipada", " Elevador", " Gás Canalizado", " Parqueamento (2 carros)", " Suite", " Terraço", " Varanda"], 
"price": 230 000, 
"address": {"county": "Matosinhos", "town": "Matosinhos e Leça da Palmeira", "zipcode": "4450-346", "district": "Porto"},
"tipology": "T4", 
"energyCertificate": "B", 
"year": 2003, 
"condition": "Usado",
"coordinates": [41.1556608, -8.6022932]}
]
```
