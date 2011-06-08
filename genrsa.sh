#!/bin/bash

openssl genrsa -out server.rsakey 1024
openssl req -new -key server.rsakey -out server.rsacsr -subj '/CN=localhost'
openssl x509 -req -in server.rsacsr -signkey server.rsakey -out server.rsacrt -days 30 -sha256

