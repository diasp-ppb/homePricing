# -*- coding: utf-8 -*-
from pymongo import MongoClient
from datetime import datetime
import json
with open('./crawler/crawler/imovirtual.json') as json_file:
    json_data = json.load(json_file)

connection = 'Starting connection...'
print(connection)

# localhost on port number 27017 connection
client = MongoClient('mongodb://localhost:27017/')

#choosing database
db = client.admin
data = 'Connection established...'
print(data)

# Remove data before inserting
rem = "Removing data..."
print(rem)
db.houses.drop()

# Insert data into mongodb
db.houses.insert(json_data)  
data = 'Database Updatede..'
print(data)

# Print Data from Database
#cursor = db.Remax.find()
#for document in cursor:
#    print(document)
