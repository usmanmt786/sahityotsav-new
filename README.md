# Sahityotsav Management System

This application is an open-source version of Sahityotsav management software. 

Not for commercial purpose
[Check usage License](#license)

## Setup
This application is build on top of `Node.js` backend and `Next.js` as frontend.
You can clone this repo and setup in a new server.

## 1. Clone the Repo
```
git clone https://github.com/fathah/sahityotsav.git
```

### NOTE: This project is based on a config file `config.ts` located in the root directory. Most of the edits can be done in the config file. For major changes you may modify the source code


## 2. Setup the Database
* The project uses Prisma ORM with `sqlite` as default database. You can change by modifying the `prisma.schema` file.

* Create a `.env` file and define `DATABASE_URL` variable.

## 3. Authentication
Authentication is required for Admin access and dashboard. 
For easier implementation this project uses *ZIQX AUTH*.

![image](https://github.com/user-attachments/assets/8e649d42-213c-4d09-af4c-b75a0adac65f)

Ziqx Auth can be easily implemented to this project. All you need is `appkey` which we can get from [Ziqx Developers Console](http://developers.ziqx.cc/)
Copy the `App Key` and paste it in `configs.ts` under `ziqx-->appkey`

*For improved security store the key in `.env` file*. As followed in this project.

## 4. Installation
The project includes an easy installation guide, once the initial setup is completed go to `https://domain.com/install` and proceed the easy guide. 

This will setup the project with required initial data and other troubleshooting.

### ⚠️ Please do this step as soon as the project is setup in the server to avoid unauthorized access.

## FAQ
* **Supports Serverless?**<br/>
No. As it needs database operations and access to file system it must be deployed in a cloud server.


## Contribute
Let's build it further

## License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License. See the [LICENSE](./LICENSE.md) file for more details.
