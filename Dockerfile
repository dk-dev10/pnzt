FROM node:alpine3.16
# Create app directory
WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

#Copy in the source code
COPY . .

#Expose port
ENV PORT 8080
EXPOSE $PORT

#RUN node ./node_modules/esbuild/install.js
#Run the app
CMD ["npm", "run", "dev"]
