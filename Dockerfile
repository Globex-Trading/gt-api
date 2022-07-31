FROM node:lts-alpine3.16
RUN addgroup app && adduser -S -G app app
USER app
LABEL org.opencontainers.image.source="https://github.com/Globex-Trading/gt-api"
WORKDIR /app

#First copy only the package.json (To take advantage of Docker cache layers)
COPY package.json ./
#Run NPM install
RUN npm install
# Copy the source files into the image
COPY . .
RUN cp .env.example .env
EXPOSE 3000
CMD [ "node", "server.js" ]