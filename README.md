# acml-journy
The project for the acml course

## Bringing Up the Application with NPM
Please follow these steps: (Working on Ubuntu)
1. Navigate to the acml-journy folder.

2. Create an environment file (environment.env) and export all the environment variables from it (A complete list of the variables and their purpose is provided below).

3. Run: source ./environment.env in the terminal.

4. Run npm install

5. Run npm start

## Bring Up the Application with Docker Compose
Please follow these steps: (Working on Ubuntu)
1. Navigate to the acml-journy folder.

2. Create an environment file (environment.env) and export all the environment variables from it (A complete list of the variables and their purpose is provided below).

3. Run: source ./environment.env in the terminal.

4. Run: sudo -E docker-compose up --build in the terminal.

## Environment Variables
Environment Variables to Set:
* MONGO_URI	              Defines the url to the mongo database.
* SERVER_HOST_PORT	      Defines the external port on which the website is served.
* SERVER_CONTAINER_PORT	  Defines the server's internal port inside the container.
* MONGO_HOST_PORT         Defines the external port on which the database is served.
* MONGO_CONTAINER_PORT    Defines the database's internal port inside the container.
* JWT_SECRET              Defines the secret string to be used in JWT authentication.
* BACKEND_URI	            Defines the base address for the backend.
* DISQUS_SHORTNAME        Defines the unique identifier for the Disqus forums associated with the website.

An example of an environment file is provided in the repository. This file is used to set all the environment variables before starting the application.
