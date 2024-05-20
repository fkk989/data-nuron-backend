
# Data Neuron Backend

* swagger ui link to test api https://faisalkhan989.xyz/api-docs/

* link if you want to use post to https://faisalkhan989.xyz/api
* get data route /child-data

* get count route /child-data/count

* create new entry route /child-data/create

* update data route /child-data/update


### setup

#### with docker
* pre requisite 
1. you must have docker installed in you machine 


* install dependencies

```
npm install
```
* generate prisma clinet 

```
npx prisma generate
```

* start the docker demon and run the command to run the docker compose file

```
npm run docker:compose
```


* migrate schema to db

```
npm run db:push or npx prisma db push
```

* after running docker command you can go to http://localhost:3000/api-docs to  test the backend via swagger ui

#### without docker 
* pre requisite
1. start a postgress db localy or get a postgress db from supabase or any alternative you know change the DATABASE_URL with your DATABASE_URL

* Install dependencies. 

```
npm install
```
* migrate schema to db

```
npm run db:push or npx prisma db push
```

* start the server 

```
npm run dev
```

this will start the server for you now you can go to http://localhost:3000/api-docs to test the rest api endpoint




