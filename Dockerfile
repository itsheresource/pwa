# build environment
FROM node:12 as builder
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
#ENV PATH /usr/src/app/node_modules/.bin:$PATH
#RUN npm install react-icons
#RUN npm install -g react-icons
COPY . /usr/src/app
RUN pwd && ls -lha
# RUN npm install react-icons/fc
RUN npm i
RUN npm i axios

RUN ls -lha && pwd
#EXPOSE 3000
# CMD ["npm", "start"]


RUN npm run build
#CMD ["npx", "serve", "-s", "build", "-l", "3000"]

# production environment
FROM nginx
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY container-startup.sh /container-startup.sh
RUN chmod +x /container-startup.sh
EXPOSE 80
CMD ["sh", "-c", "/container-startup.sh"]
