FROM node:10.16.1-alpine AS builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build-locale

FROM nginx:1.15.8-alpine
COPY --from=builder /usr/src/app/dist/es/ /usr/share/nginx/html/es
COPY --from=builder /usr/src/app/dist/en/ /usr/share/nginx/html/en
