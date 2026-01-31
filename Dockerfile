ARG ARTIFACT

FROM node:16-bullseye

WORKDIR /usr/src/rust-cms-frontend

# Install latest chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai and a few others)
# Note: this installs the necessary libs to make the bundled version of Chromium that Puppeteer
# installs, work.
RUN apt-get update && apt-get install -y \
    chromium \
    chromium-driver \
    fonts-ipafont-gothic \
    fonts-wqy-zenhei \
    fonts-thai-tlwg \
    fonts-kacst \
    fonts-freefont-ttf \
    make \
    g++ \
    python3 \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

COPY package.json .
COPY .babelrc .
COPY .postcssrc .
RUN npm install

COPY src ./src
COPY server ./server
RUN npm run build

COPY robots.txt ./dist

# If running Docker >= 1.13.0 use docker run's --init arg to reap zombie processes, otherwise
# uncomment the following lines to have `dumb-init` as PID 1
ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init
ENTRYPOINT ["dumb-init", "--"]

EXPOSE 8080

CMD [ "npm", "run", "proxy:prod" ]
