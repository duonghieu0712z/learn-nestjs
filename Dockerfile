FROM node:20-alpine as node

FROM node as dev
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci

FROM node as prod
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --omit=dev

FROM node as build
WORKDIR /usr/src/app
COPY . .
COPY --from=dev /usr/src/app/node_modules ./node_modules
RUN npm run build && npm prune --omit=dev

FROM node as deloy
WORKDIR /usr/src/app
COPY package*.json ./
COPY --from=prod /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
CMD ["npm", "run", "start:prod"]
