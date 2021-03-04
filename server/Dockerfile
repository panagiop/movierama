FROM        node:12.16.1-alpine as builder

COPY        package.json /srv/movierama/
WORKDIR     /srv/movierama/

RUN         yarn install --production

COPY        .babelrc /srv/movierama/
COPY        .eslintrc.json /srv/movierama/
COPY        app.js /srv/movierama/
COPY        config /srv/movierama/config/
COPY        controllers /srv/movierama/controllers/
COPY        middlewares /srv/movierama/middlewares/
COPY        models /srv/movierama/models/
COPY        routes /srv/movierama/routes/
COPY        services /srv/movierama/services/
COPY        tests /srv/movierama/tests/

RUN         yarn run build

FROM        node:12.16.1-alpine


ENV         HTTP_MODE http
ARG         NODE_PROCESSES=2
ENV         NODE_PROCESSES=$NODE_PROCESSES

# Install pm2
RUN         npm install -g pm2

# Copy over code
WORKDIR     /srv/api/
COPY        --from=builder /srv/movierama/build /srv/api/build
COPY        --from=builder /srv/movierama/package.json /srv/api/package.json

RUN         deluser --remove-home node \
            && addgroup -S node -g 9999 \
            && adduser -S -G node -u 9999 node

CMD         ["npm", "start"]

USER        node