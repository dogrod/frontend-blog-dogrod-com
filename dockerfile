FROM keymetrics/pm2:latest

# Bundle APP files
RUN mkdir -p /home/service
WORKDIR /home/service
COPY . /home/service

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --registry=https://registry.npm.taobao.org

# Show current folder structure in logs
RUN ls -al -R

EXPOSE 4000
CMD ["pm2-docker", "start", "pm2.json"]