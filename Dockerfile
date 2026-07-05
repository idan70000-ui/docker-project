#this commend starts from image that already node.js installd in version 20;
FROM node:20-alpine

#sets /app as the working directory inside the container
WORKDIR /app

# copy package.json and package-lock.json first to take advantage of docker layer
COPY package*.json ./

ENV NODE_ENV=production
RUN npm ci --omit=dev
RUN npm audit --omit=dev

# install all dependecies defined in package.json
RUN npm install

# copy the entier project into the container
COPY . .

# inform docker that the application uses port 3000
EXPOSE 3000

# execute this command whan the container starts
CMD [ "node", "app.js" ]