# this is the config fille we want to set to our image - INSTANCE packge.json
# The model/version we want to run our program
FROM node:20-alpine AS deps
# means the directort we want to run our cotainer from /index
WORKDIR /app
# means evety thing that the name starts with package will copy it to the image
COPY package*.json ./
# install all dependecies in package.json
RUN npm install
FROM node:20-alpine AS production
COPY --from=deps /app/node_modules ./node_modules
# copy the intire porject into the container 
COPY . .
# Inform docker that the application use port 3000
EXPOSE 3000
# Execute this command when the container runs
CMD [ "node", "app.js" ]