# Backend

Backend of budget tracker application

## Database

- Using MongoDB managed service from MongoDB Atlas
- Mongoose for ORM

## Email Service

- Using nodemailer for sending emails
- Make sure to add `env` required by [gmail](https://www.nodemailer.com/usage/using-gmail/) to send emails

## Run Tasks

To run the server

```sh
npm run dev
```

To create a production build:

```sh
npm run build
```

## Deployment

- Deployed using Render
- See env variables from `.env.sample`
