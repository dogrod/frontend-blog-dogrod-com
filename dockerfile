FROM node:8

# Bundle APP files
RUN mkdir -p /home/service
WORKDIR /home/service
COPY . /home/service

# Install PM2
RUN yarn global add pm2 --ignore-optional

# Install app dependencies
RUN yarn install

# Build & upload
RUN yarn run deploy

CMD ["pm2-runtime", "pm2.json"]