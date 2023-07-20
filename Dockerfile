FROM node:19-slim@sha256:f58f1fcf5c9ff9e3752993edb4ed6dbd35697124c85a43f3b97aa054500b0534

WORKDIR /app

COPY yarn.lock package.json /app/

RUN yarn install

COPY . /app/

CMD ["yarn", "start"]
