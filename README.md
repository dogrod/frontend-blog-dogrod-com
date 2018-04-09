# Blog of dogrod.com

## TO-DO

- [ ] Basic content rendering
- [ ] Code spliting

## Deployment

1. Create `server.config.ts` file under `/src`
2. Config baseURL of API in `server.config.ts`
3. Run `npm run server` or `yarn run server`

### Deploy use docker
1. Create `pm2.json` and config
2. Build image: `docker build --rm --no-cache=true -t frontend-blog .`
2. Run `docker run -d --name frontend-blog --restart unless-stopped -p 34001:9002 frontend-blog`