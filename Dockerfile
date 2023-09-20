FROM registry.cn-shanghai.aliyuncs.com/devcon/webdev:v1.2.0
ADD . /app/src

COPY nginx.conf /etc/nginx/conf.d/


RUN cd /app/src && yarn --ignore-scripts && yarn run build && cp -r dist/* /usr/share/nginx/html
# RUN cd /app/src && cp -r dist/* /usr/share/nginx/html



WORKDIR /app
EXPOSE 9266


