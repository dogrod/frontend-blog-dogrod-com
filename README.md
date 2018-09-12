# Front-end project of blog.dogrod.com

> My own blog project.
>
> [> Dokodemo Door](http://blog.dogrod.com)

## TO-DO

- Coding
  - [x] Code splitting
  - [x] Node.js server-side log
  - [x] Unit test
  - [x] SPA-Node.js intelligence development environment
  - [x] Custom project architecture (include webpack configuration, paths, and e.t.c.)

- Feature
  - [x] Basic content rendering
  - [x] Deployment
  - [x] Comment modules (and back-end support)
  - [ ] i18n

## Application Config

1. Create `app.config.js` file under root directory
2. Config `port` and `forward`, export as a commonjs module
3. Run
```
npm start
```
or
```
yarn start
```

## Upyun Config

> Upload bundle files to Upyun for bootstrap static files.

1. Duplicate `upyun.config.example.js` and rename to `upyun.config.js`
2. Replace variables to your own.

### Deployment
- docker-pm2
  1. Create `app.config.js` and config
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
