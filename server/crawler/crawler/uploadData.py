from pymongo import MongoClient
from datetime import datetime
import json
with open('./smallJson.json') as json_file:
    json_data = json.load(json_file)

connection = 'Starting connection...'
print(connection)

# localhost on port number 27017 connection
client = MongoClient('mongodb://localhost:27017/')

#choosing database
db = client.admin
print('Connection established...')

# Remove data before inserting
print("Removing data...")
db.houses.remove()

# Insert data into mongodb
db.houses.insert(json_data)
print('Database Updatede..')

# Print Data from Database
#cursor = db.houses.find()
#for document in cursor:
#    print(document)
