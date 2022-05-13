# Translink Trains SST

This is a fullstack rebuild of the older Translink Trains app that used an Express API hosted in Heroku and a GitHub page for the frontend, but Heroku is having problems and I wanted to play with [Serverless Stack](https://serverless-stack.com/).

`npx sst start` to run the API locally. This will deploy a debug stack to your default configured AWS account, so you will need one of those and the `aws-cli` installed on your machine with valid credentials.

To run the frontend locally `cd frontend` in a new terminal and run `npm run dev` while the API is running.
