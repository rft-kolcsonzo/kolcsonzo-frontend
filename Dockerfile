FROM nginx:alpine

ARG VCS_REF=HEAD

LABEL   org.label-schema.vcs-ref=${VCS_REF} \
        org.label-schema.vcs-url="https://github.com/rft-kolcsonzo/kolcsonzo-ui"


COPY build /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/