# Front-end project of blog.dogrod.com

> My own blog project.
>
> [> Dokodemo Door](http://blog.dogrod.com)

## TO-DO

- Coding
  - [ ] Code splitting
  - [x] Node.js server-side log
  - [ ] Unit test
  - [x] SPA-Node.js intelligence development environment
  - [x] Custom project architecture (include webpack configuration, paths, and e.t.c.)

- Feature
  - [x] Basic content rendering
  - [x] Deployment
  - [ ] Comment modules (and back-end support)
  - [ ] i18n

## Server Config

1. Create `server.config.js` file under root directory
2. Config `port` and `forward`, export as a commonjs module
3. Run
```
npm start
```
or
```
yarn start
```

### Deployment
- docker-pm2
  1. Create `server.config.js` and config
  2. Create `pm2.json` and config
  3. Build image
  ```
  docker build --rm --no-cache=true -t frontend-blog .
  ```
  4. Run
  ```
  docker run -d --name frontend-blog --restart unless-stopped -p 34001:9002 frontend-blog
  ```

Note: You can use any name of docker images, containers and port as you wish.
