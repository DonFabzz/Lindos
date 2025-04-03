## Init Database

First, you will have to create a Mysql Db on your local env

On mac :

```bash
brew install mysql
brew services start mysql
mysql -u root
```

```sql
CREATE DATABASE lindos;
```

On windows :

- Download MySQL from the official website.

- Follow the installation instructions and don't forget to set a password for the root user.

Then create a database named lindos

## Init project

clone the repository and install dependancies by running :

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
