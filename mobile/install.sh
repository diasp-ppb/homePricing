#!/bin/sh
#Ubuntu 16.04

apt-get update && \
    apt-get install software-properties-common \
    python-software-properties \
    wget \
    curl \
    git \
    unzip -y && \
apt-get clean

dpkg --add-architecture i386 && \
    apt-get update -q && \
apt-get install -qy --no-install-recommends libstdc++6:i386 libgcc1:i386 zlib1g:i386 libncurses5:i386

npm install -g yarn
npm install -g react-native-cli

apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \

npm install

