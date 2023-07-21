# hello-ops-girls
![Github Actions](https://github.com/devopsgirl2023/hello-ops-girls/actions/workflows/prod-ci.yaml/badge.svg)

This is a recreation of Google's Dino Game, the one that you can play when you don't have an internet connection. This game was made using TypeScript and Node.js.

## Local Running
### Prerequisites
You'll need:
* Node.js
    * `apt-get install nodejs`
* TypeScript
    * `node i -g typescript`
* (Optional) Python3 to run an http server on your machine:
    * `sudo apt-get install python3`

To download the code you can clone the Git repo using:
```git
git@github.com:devopsgirl2023/hello-ops-girls.git
```

Then you can compile the code using the `npx tsc` command. This will generate the code in the `public/` folder.

To run the website on your computer you'll need to have a server running. In this project you can run a simple http server using the `yarn start` script that just runs the python3 `http.server` module. It'll run the server on the `localhost:8000` address.<br/>
Go to `localhost:8000/public` and you'll be refered to the game where you can play it just like you can on the browser.
