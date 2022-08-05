FROM node:lts-alpine3.16
RUN addgroup app && adduser -S -G app app
USER app
LABEL org.opencontainers.image.source="https://github.com/Globex-Trading/gt-api"
WORKDIR /app

#Install pm2 for Node Process Management
RUN npm -g config set user root
RUN sudo npm install pm2@latest -g

#First copy only the package.json (To take advantage of Docker cache layers)
COPY package.json ./
#Run NPM install
RUN npm install --production
# Copy the source files into the image
COPY . .
RUN cp .env.example .env
EXPOSE 3000
ENTRYPOINT [ "pm2", "start", "server.js", "--name", "gt-api", "--restart-delay", "1000" ]