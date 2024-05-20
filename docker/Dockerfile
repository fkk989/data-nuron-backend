FROM node

WORKDIR /home/data-nuron-assignment

COPY package.json package.json
RUN npm install
COPY . .
RUN npx prisma generate

CMD [ "npm","run","dev" ]