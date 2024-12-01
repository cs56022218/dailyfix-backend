FROM node:18

RUN mkdir -p /usr/src/backend

WORKDIR  /usr/src/backend

COPY . .

RUN npm install

RUN ls

ENV NODE_OPTIONS=--max_old_space_size=2048

EXPOSE 5000

CMD [ "npm", "run", "start"]
