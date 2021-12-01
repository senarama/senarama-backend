# SENARAMA Backend

The backend for the [**SENARAMA Project**](https://github.com/senarama/senarama)

## Basic setup

First you need clone this repository on your machine, run the following commands
in the Git Bash or any terminal window:

  ```sh
  git clone https://Devil64-Dev/senarama-backend
  cd senarama-backend
  ```

If for some reason, you aren't able to create an RSA keys pair or complete
the configuration yourself, you can use the
[development](https://Devil64-Dev/senarama-backend/tree/development) branch to
test the API on your local machine this branch has all files and configurations
to test the API on your local machine, just run the followings commands in the
Git Bash or a terminal window:

  ```sh
  git fetch origin development
  git checkout development
  ```

Before to continue you need to have installed and running MongoDB service on
you machine. See the following guide to install or configure MongoDB.

## Configuration

You need to start or install MongoDB if haven't installed it, if you are on
Windows machine you can view
[MongoDB Install Instructions](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
for help, if you are on Linux based system you know how to install it, when
the installation has been completed, check if MongoDB is running correctly.

Then create a **.env** in the project root, and put inside the following
variables:

  ```sh
  PORT=5000 # server port
  DB_HOST=mongodb://localhost:27017/senarama # mongodb connection URL
  SECRET=3927ha97ah77ba67ta88a683hs979a810 # password for RSA keys
  ```

Now you can create an RSA key pairs using ssh-keygen or similar tool.
Create a folder called `keys` in the project root, and then store the
created keys inside.

Create RSA Keys inside `keys` directory using the following commands:

  ```sh
  ssh-keygen -t rsa -b 4096 -m PEM -f secret-key.key
  # the password should be the same stored as the SECRET stored in the .env file
  openssl rsa -in secret-key.key -pubout -outform PEM -out secret-key.pub
  ```

## Install and Run the project

First you need to install project dependencies, feel free to use your favorite
package manager to do it, if you are using `yarn` you can run:

  ```sh
  yarn install
  ```

If you are using npm:

  ```sh
  npm install
  ```

Then the installation is completed to start the project you can run:

  ```sh
  yarn dev
  ```

Or feel free to use:

  ```sh
  yarn start
  ```

Or with npm:

  ```sh
  npm run dev
  ```

  ```sh
  npm start
  ```

If all things are done, you can see on the following output in the command-line:

  ```text
  Listening on port: 5000
  Connected to MongoDB
  ```
