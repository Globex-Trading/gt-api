# FROM node:lts-alpine3.16
FROM node:16-alpine3.16
RUN apk add g++ make py3-pip

#RUN addgroup app && adduser -S -G app app
USER root
LABEL org.opencontainers.image.source="https://github.com/Globex-Trading/gt-api"
WORKDIR /app


#First copy only the package.json (To take advantage of Docker cache layers)
COPY package.json ./
#Run NPM install
RUN npm install --production
# Copy the source files into the image
COPY . .
RUN cp .env.example .env
EXPOSE 3000
ENTRYPOINT [ "node", "server.js" ]