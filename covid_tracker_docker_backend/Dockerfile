FROM node
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD export GOOGLE_APPLICATION_CREDENTIALS="./covid-tracker-101-fd0e87e6a712.json"
CMD node index.js