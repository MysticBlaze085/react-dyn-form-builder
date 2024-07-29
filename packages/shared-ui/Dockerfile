FROM node:latest as node
WORKDIR /app
COPY . .


# RUN npm install -g @nx/cli
RUN npx pnpm install --force
RUN npx pnpm --filter shared-ui build-storybook
RUN npx pnpm --filter shared-ui storybook
#RUN pwd && ls

#stage 2
FROM bitnami/nginx:1.26.1
COPY ./packages/shared-ui/nginx.conf /opt/bitnami/nginx/conf/nginx.conf
COPY --from=node app/dist/packages/shared-ui /usr/share/nginx/html
