 # Context
FROM  alpine:latest
MAINTAINER smmishra <mishra.smarajit@gmail.com>
RUN apk update

# Installation Section
RUN apk add docker
RUN apk add ca-certificates
RUN apk update ca-certificates
RUN apk add --no-cache python3 && \
    python3 -m ensurepip && \
    rm -r /usr/lib/python*/ensurepip && \
    pip3 install --upgrade pip setuptools && \
    rm -r /root/.cache
RUN mkdir /host-agent
RUN apk update
RUN pip3 install --upgrade pip
RUN pip3 install flask redis flask-cors
# Cleanup
RUN if [[ ! -e /usr/bin/python ]]; then ln -sf /usr/bin/python3 /usr/bin/python; fi && \
    rm -rf /.wh /root/.cache /var/cache
COPY . /host-agent
#CMD python3 /host-agent/server.py
