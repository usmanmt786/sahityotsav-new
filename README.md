# Sahityotsav Management System

This application is an open-source of Sahityotsav management software.

## Setup
This application is build on top of `Node.js` backend and `Next.js` as frontend.
You can clone this repo and setup a new server.

### 1. Clone the Repo
```
git clone https://github.com/fathah/sahityotsav.git
```

### 2. Setup the Database
* The project uses Prisma ORM with `sqlite` as default database. You can change by modifying the `prisma.schema` file.

* Create a `.env` file and define `DATABASE_URL` variable.



## FAQ
* **Supports Serverless?**<br/>
No. As it needs database opertaions it must be deployed in a cloud server.


## Contribute
Let's build it further