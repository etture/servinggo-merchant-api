FROM node:8-alpine

# Create app directory
WORKDIR /usr/src/app

# Install the app dependencies
COPY package.json ./

RUN npm install

# Bundle app source
COPY . ./

EXPOSE 3080 3443

CMD ["npm", "start"]