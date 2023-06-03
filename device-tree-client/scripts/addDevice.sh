curl -X POST http://localhost:3001/connected \
   -H 'Content-Type: application/json' \
	-H 'Accept: application/json' \
   -d '{"id": 14, "vendorId": "vendorId_2", "productId": "productId_2", "type": "device", "description": "Device #14", "hubId": 2, "deviceType": "Samsung"}'
