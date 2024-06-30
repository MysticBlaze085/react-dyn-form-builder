FROM node:latest as node
WORKDIR /app
COPY . .


# RUN npm install -g @nx/cli
RUN npm install --force
RUN npx pnpm --filter shared-ui build
RUN pwd && ls

#stage 2
FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=node packages/shared-ui/dist/rcp-ui-monorep /usr/share/nginx/html
