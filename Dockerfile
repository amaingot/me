FROM node:14-alpine

RUN mkdir -p /usr/src/app/

WORKDIR /usr/src/app

COPY . .

ARG COMMIT_SHA
ENV SHA=${COMMIT_SHA}

RUN yarn

RUN REACT_APP_SHA=$SHA yarn build:web

EXPOSE 8080

CMD ["yarn", "start:in-container"]