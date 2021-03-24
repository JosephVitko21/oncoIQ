# only need to replace image url in the payload

import requests

url = "https://api.clarifai.com/v2/models/idcpathology/outputs"
image_url = "http://oncoiq-backend.herokuapp.com/static/sample.png"

payload = '{"inputs": [{"data": {"image": {"url": "' + image_url + '"}}}]}'
# payload = {
#    "inputs": [
#       {
#          "data": {
#             "image": {
#                "url": "https://oncoiq-backend.herokuapp.com/static/sample.png"
#             }
#          }
#       }
#    ]
# }
print(payload)
headers = {
    'Authorization': 'Key 38cfda9257b64c6ca0d93e2682018598',
    'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)
value = float(response.json().get("outputs")[0]['data']['concepts'][0]['value'])
if response.json().get("outputs")[0]['data']['concepts'][0]['id'] == 'negative':
    value = 1 - value
print("result:", value)
