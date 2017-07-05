FROM node:boron

# Create app directory
RUN mkdir -p /codetest-site
WORKDIR /codetest-site

# Install app dependencies
COPY package.json /codetest-site
RUN npm install

# Bundle app source
COPY . /codetest-site

EXPOSE 8081
CMD [ "npm", "start" ]
