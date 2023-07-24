# WorkShop Part 1
Step 1: 
  
Clone Demo repo: git@github.com:devopsgirl2023/hello-ops-girls.git

Step 2:
   
[what is Docker](https://docs.docker.com/get-started/overview/)

[Dockerfile reference](https://docs.docker.com/engine/reference/builder/)
  
Create Dockerfile:
    
    FROM node:19-slim@sha256:f58f1fcf5c9ff9e3752993edb4ed6dbd35697124c85a43f3b97aa054500b0534
    
    RUN apt-get update && apt-get install python3 -y

    WORKDIR /app

    COPY yarn.lock package.json /app/

    RUN yarn install

    COPY . /app/

    RUN npx tsc

    CMD ["yarn", "start"]

Build Docker Image in local:
    
    dokcer build -t ops_girls_demo .

Run Docker Image:

    docker run -p 8000:8000 ops_girls_demo 
