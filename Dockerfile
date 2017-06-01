FROM node:8

ENV HOME=/home/app

COPY package.json $HOME/nodemcu-listener/

WORKDIR $HOME/nodemcu-listener
RUN npm install --progress=false

COPY . $HOME/nodemcu-listener

CMD ["npm", "start"]
