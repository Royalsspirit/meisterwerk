FROM node:latest as frontendBuilder

WORKDIR /app
COPY ./website .

# Set env variable
ARG REACT_APP_HOST_API
ENV REACT_APP_HOST_API=$REACT_APP_HOST_API

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    apt update && \
    yarn install && \
    yarn build

FROM node:latest as backendBuilder
ENV NODE_ENV production

WORKDIR /app
COPY ./website .

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    apt update && \
    cd server && \
    yarn install

FROM vptech/node:latest
ENV NODE_ENV production

WORKDIR /app/server

COPY --from=frontendBuilder /app/build ../build
COPY --from=backendBuilder /app/server .

CMD [ "yarn", "start" ]