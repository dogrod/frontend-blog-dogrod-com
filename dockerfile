FROM node:8

# Bundle APP files
RUN mkdir -p /home/service
WORKDIR /home/service
COPY . /home/service

# Install PM2
RUN yarn global add pm2

# Install app dependencies
RUN yarn install

# Show current folder structure in logs
RUN ls

RUN yarn run deploy

EXPOSE 4000
CMD ["pm2-runtime", "pm2.json"]