	
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
   * `zone` : Locality and District where the property is located.
   * `price` : Price of the property *(€)*.
   * `area` : Useful area of the property *(m²)*.
   * `tipology` : Type of property *(T1, T2, T3, ...)*.
   * `characteristics` : List of features of the property *(ex: Balcony, Central Heating, Lift, etc.)*.
   * `description` : Description of the property, written by the owner.
   * `address` : Address of the property.
   * `webpage` : Original webpage of the advertisement.
   * `year` : Year of construction
   * `energyCertificate` : Degree of energetical efficiency *(ex: A+, A, B, ...)*.
   * `condition` : Conservation state of the property *(ex: Used, Renewed, In construction)*
   * `bathrooms` : Number of bathrooms
   * `negotiable` : Indicates if the price is negotiable or not
   * `grossArea` : Gross area of the property *(m²)*
 * Example:
```
[
{"area": "198 m²", 
"description": ["<div itemprop=\"description\">\n                            <br><p>Comercializado por: Sábio Êxito</p><p>Licença AMI: 9745</p><br><br><p>T4 Dúplex condominio fechado Garagem fechada 2 Carros – Vilar do Paraíso<br>Apartamento em condominio fechado, em bom estado de conservação, área de 198m2, disposição solar poente, ar condicionado e aquecimento cntral, caixilharia dupla, com 2 solários e uma varanda, garagem fechada para 2/3 carros<br>Cozinha remodelada, lavandaria, sala com recuperador de calor, varanda, hall de entrada, despensa, 2 banho um de serviço e um completo, remodelados, 2 quartos com roupeiro<br>1º Andar - Hall de quartos, 2 quartos com roupeiros embutidos, 2 suites remodeladas, 2 solários <br>Garagem fechada para 2/3 carros 40 m2 mais arrumos<br>Possibilidade de permuta<br>Perto de acessos auto estrada a 400 mtos, perto de serviços, mercados, farmacias, etc<br>Classificação Energética:B<br>Marque a Sua Visita<br>Benjamim Silva</p>                        </div>"],
"zone": "Mafamude e Vilar do Paraíso, Porto", 
"title": "T4 Dúplex condomínio fechado Garagem 2 Carros – Vilar do Paraíso",
"webpage": "https://www.imovirtual.com/anuncio/t4-duplex-condominio-fechado-garagem-2-carros-vilar-do-paraiso-IDEmyR.html", 
"characteristics": ["Aquecimento Central", " Ar Condicionado", " Condomínio fechado", " Cozinha Equipada", " Elevador", " Gás Canalizado", " Parqueamento (2 carros)", " Suite", " Terraço", " Varanda"], 
"price": "230 000 €", 
"address": " 4400-004, Vila Nova de Gaia, Mafamude e Vilar do Paraíso",
"tipology": "T4", 
"energyCertificate": " B", 
"year": " 2003", 
"condition": " Usado"}
]
```
