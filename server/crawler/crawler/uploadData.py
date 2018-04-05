
from pymongo import MongoClient
from datetime import datetime

connection = 'Starting connection...'
print(connection)

client = MongoClient('mongodb://mongodb:27017/')
db = client.test

data = 'wating data data...'
print(data)

cursor = db.Remax.find()

for document in cursor:
    print(document)

data = 'RECEIVED data data...'
print(data)