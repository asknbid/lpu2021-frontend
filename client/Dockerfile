FROM node:10.15.2-alpine
RUN mkdir /client
WORKDIR /client
COPY package.json /client/package.json
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]