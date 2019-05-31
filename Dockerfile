ARG ARTIFACT

FROM node:10.15 as node_builder

WORKDIR /usr/src/rust-cms-frontend

COPY src ./src
COPY package.json .
COPY .babelrc .
COPY .postcssrc .

RUN npm install
RUN npm run build

FROM nginx:1.15.8

WORKDIR /usr/src/rust-cms-frontend

COPY --from=node_builder /usr/src/rust-cms-frontend/dist .

EXPOSE 8080