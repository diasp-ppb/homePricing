#!bin/bash

cd ./crawler/crawler/
pip install --user pipenv
pipenv install requests
pipenv run python uploadData.py
