FROM registry.cn-shanghai.aliyuncs.com/devcon/webdev:v1.0.0
ADD . /app/src

COPY nginx.conf /etc/nginx/conf.d/

RUN mkdir /app/bin
RUN cd /app/src 
RUN npm install -g yarn 
RUN yarn 
RUN yarn run build
RUN cp -r dist/* /usr/share/nginx/html


WORKDIR /app
EXPOSE 9266


