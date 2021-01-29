# FROM nginx
FROM harbor.lm.com/nginx/nginx:latest
ENV LANG en_US.UTF-8

ADD nginx.conf /etc/nginx/nginx.conf
ADD dist /usr/share/nginx/html/

EXPOSE 8080
RUN rm -f /etc/localtime
RUN ln -s  /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN /bin/bash -c 'echo init ok!!!'