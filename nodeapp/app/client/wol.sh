#!/bin/bash
curl -i -X POST -H "Content-type: application/json; charset=UTF-8" -H "Content-Length: 41" -d "{\"mac\": \"00:4e:01:c6:48:0f\", \"port\": \"9\"}" 192.168.10.55/power