FROM node:19-slim@sha256:f58f1fcf5c9ff9e3752993edb4ed6dbd35697124c85a43f3b97aa054500b0534
WORKDIR /app
RUN apt-get update && apt-get install python3 -y
COPY yarn.lock package.json /app/
RUN yarn install
COPY . /app/
RUN npx tsc
EXPOSE 8000
CMD ["yarn", "start"]
