
# Identity Reconciliation 

* swagger ui link to test api ec2-13-202-5-147.ap-south-1.compute.amazonaws.com:3000/api-docs/

* link if you want to use post to test ec2-13-202-5-147.ap-south-1.compute.amazonaws.com:3000/api
* get data route /child-data

* get count route /child-data/count

* create new entry route /child-data/create

* update data route /child-data/update


### setup

#### with docker
* pre requisite 
1. you will need docker install in you machine

* start the docker demon and run the command to run the docker compose file

```
npm run docker:compose
```

* after running docker command you can go to http://localhost:{port}/api-docs to  test the backend via swagger ui

#### without docker 
* pre requisite
1. start a postgress db localy or get a postgress db from supabase or any alternative you know change the DATABASE_URL with your DATABASE_URL

* Install dependencies. 
```
npm install
```
* start the server 
```
npm run dev
```
this will start the server for you now you can go to http://localhost:{port}/api-docs to test the rest api endpoint




