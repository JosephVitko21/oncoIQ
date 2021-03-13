# only need to replace image url in the payload

import requests

url = "https://api.clarifai.com/v2/models/idcpathology/outputs"

payload="{  \n   \"inputs\":[  \n      {  \n         \"data\":{  \n            \"image\":{  \n               \"url\":\"image url\"\n            }\n         }\n      }\n   ]\n}"
headers = {
  'Authorization': 'Key 2a3b788c4c1c4d92a6ce07d1735feff0',
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)