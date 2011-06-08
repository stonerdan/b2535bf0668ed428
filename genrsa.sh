#!/bin/bash

mkdir -p certs

openssl genrsa -out certs/server.rsakey 1024
openssl req -new -key certs/server.rsakey -out certs/server.rsacsr -subj '/CN=localhost'
openssl x509 -req -in certs/server.rsacsr -signkey certs/server.rsakey -out certs/server.rsacrt -days 30 -sha256

