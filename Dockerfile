FROM oven/bun:1-alpine
WORKDIR /app

RUN wget -q -t3 'https://packages.doppler.com/public/cli/rsa.8004D9FF50437357.key' -O /etc/apk/keys/cli@doppler-8004D9FF50437357.rsa.pub && \
  echo 'https://packages.doppler.com/public/cli/alpine/any-version/main' | tee -a /etc/apk/repositories && \
  apk add --no-cache doppler
RUN --mount=type=secret,id=doppler \
  export DOPPLER_TOKEN=$(cat /run/secrets/doppler) && \
  doppler setup --no-prompt && \
  doppler secrets --only-names

COPY package*.json .
RUN bun install

COPY . .
ENV NODE_ENV=production

EXPOSE 3000/tcp

RUN bun run build
ENTRYPOINT [ "bun", "run", "start" ]

LABEL org.opencontainers.image.source=https://github.com/jeamxn/yunarchi-landing