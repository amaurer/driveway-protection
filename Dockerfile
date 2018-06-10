FROM node:8.11.2-jessie
WORKDIR /opt
EXPOSE 8080/tcp
ENTRYPOINT ["node", "app.js"]
RUN mkdir node_modules
COPY node_modules node_modules
COPY app.js app.js
