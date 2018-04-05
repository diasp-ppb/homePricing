FROM node:8-alpine

EXPOSE 3000

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD package.json yarn.lock /usr/src/app/
RUN yarn --pure-lockfile
ADD . /usr/src/app

CMD ["npm", "run", "dev"]
