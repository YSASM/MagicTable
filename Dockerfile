FROM registry.cn-shanghai.aliyuncs.com/devcon/webdev:v1.0.0
ADD . /app/src

COPY nginx.conf /etc/nginx/conf.d/

RUN mkdir /app/bin
RUN cd /app/src && npm config set registry https://registry.npm.taobao.org && npm install -g npm@9.2.0 &&  npm install --legacy-peer-deps && npm run build:prod && \
  cp -r dist/* /usr/share/nginx/html


WORKDIR /app
EXPOSE 9266


