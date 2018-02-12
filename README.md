# Traffic mon

## Build
```
$ docker build -t oakland-transit-display .
```

## Run
```
$ docker run -d \
    -e BART_KEY=MW9S-E7SL-26DU-VV8V \
    -e AC_TRANSIT_TOKEN=E45E1AC8A77E05B2FAD062161A657299 \
    -p 9000:80 \
    oakland-transit-display
```

Now point your browser to port 9000 on the server.
