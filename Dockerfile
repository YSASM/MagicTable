FROM registry.cn-shanghai.aliyuncs.com/devcon/webdev:v1.1.0
ADD . /app/src

COPY nginx.conf /etc/nginx/conf.d/

RUN mkdir /app/bin
# RUN cd /app/src && yarn && yarn run build
# RUN cp -r dist/* /usr/share/nginx/html


WORKDIR /app
EXPOSE 9266


