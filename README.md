# Welcome to Task Manager API!

The task manager APIs lets you create a task manager application with sign-up/sign-in/logout features with email verification and OTP based two factor authentication

- Register the user using signup, and can login and logout. These API uses JWT and cookies for authentication
- User can create/get all/get single/update/delete task/s


## Steps to install locally
Before installing npm modules and run the project, create '.env' file into the project with following entries:

- MONGO_DB_URI=your mongo db server url
- JWT_SECRET=add value
- JWT_ALGORITHM=add value
- ENVIRONMENT=add 'POSTMAN' if using postman to test APIs or add 'PROD' if using frontend and is planning to host it on internet
- PORT=add value
- NODEMAILER_HOST= add smtp host (hint: use ethereal mail for testing)
- NODEMAILER_USER= add user
- NODEMAILER_PASS= add password

Although fallback has been provided for PORT, it is advisable to add your own value

Now add following commands to the project:

 - npm install && npm install nodemon -D && npm start

Voila! Server will start running on port 5000 (default)
