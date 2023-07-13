FROM node:19-slim

WORKDIR /app

COPY yarn.lock package.json /app/

RUN yarn install

COPY . /app/

ENTRYPOINT ["yarn"]

CMD "start"
