FROM keymetrics/pm2:latest

# Bundle APP files
RUN mkdir -p /home/service
WORKDIR /home/service
COPY . /home/service

# Install app dependencies
RUN npm install --registry=https://registry.npm.taobao.org --loglevel=silly 2> debug.log

# Show current folder structure in logs
RUN ls -al -R

EXPOSE 4000
CMD ["pm2-docker", "start", "pm2.json"]