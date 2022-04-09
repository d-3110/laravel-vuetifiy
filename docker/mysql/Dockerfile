FROM mysql:8.0

COPY ./my.cnf /etc/mysql/conf.d/my.cnf

RUN mkdir -p /usr/local/mysql/mysql-keyring && \
    chmod 750 /usr/local/mysql/mysql-keyring && \
    chown mysql.mysql /usr/local/mysql/mysql-keyring