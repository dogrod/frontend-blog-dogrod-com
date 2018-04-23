# Blog of dogrod.com

## TO-DO

- [x] Basic content rendering
- [x] Deployment
- [ ] Code spliting
- [x] Node.js server-side log
- [ ] Unit test
- [ ] Comment modules (and back-end support)

## Deployment

1. Create `server.config.ts` file under `/src`
2. Config baseURL of API in `server.config.ts`
3. Run `npm run server` or `yarn run server`

### Deploy use docker
1. Create `server.config.js` and config
2. Create `pm2.json` and config
3. Build image: `docker build --rm --no-cache=true -t frontend-blog .`
4. Run `docker run -d --name frontend-blog --restart unless-stopped -p 34001:9002 frontend-blog`
