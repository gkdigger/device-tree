#!/bin/bash

curl -X POST http://localhost:3001/disconnected -H 'Content-Type: application/json' -H 'Accept: application/json' -d '{"deviceId": '$1'}'