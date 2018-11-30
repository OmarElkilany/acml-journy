FROM node:8

ARG BACKEND_URI

ARG DISQUS_SHORTNAME

RUN mkdir -p /usr/src/app/

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install

COPY . /usr/src/app/

RUN $(npm bin)/ts-node ./angular-dynamic-environment-script.ts --backend_uri=$BACKEND_URI --disqus_shortname=$DISQUS_SHORTNAME

RUN $(npm bin)/ng build --prod --output-path=dist

CMD ["npm", "start"]
