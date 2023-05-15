FROM node

WORKDIR /frontend

COPY . .

RUN npm install
RUN npm build

EXPOSE 3000

CMD ["npm", "start", "index.js"]