FROM node

WORKDIR /home/data-nuron-assignment

COPY package.json package.json
RUN npm install
COPY . .

CMD [ "npm","run","dev" ]