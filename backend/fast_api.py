from fastapi import FastAPI
import os
import base64
from dotenv import load_dotenv
from requests import post, get
import json



load_dotenv()
client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")

app = FastAPI()


def get_token():
    auth_string = client_id + ":" + client_secret
    auth_bytes = auth_string.encode("utf-8")
    auth_base64 = str(base64.b64encode(auth_bytes), "utf-8")
    url = "https://accounts.spotify.com/api/token"
    headers = {
        "Authorization": "Basic " + auth_base64,
        "Content-Type" : "application/x-www-form-urlencoded"
    }
    data = {"grant_type": "client_credentials"}
    result = post(url, headers=headers, data=data)
    json_result = json.loads(result.content)
    token = json_result['access_token']
    return token 



def search_artist_by_name(token, artist_name):
    url = "https://api.spotify.com/v1/search"
    headers = {"Authorization" : "Bearer " + token}
    query = f"?q={artist_name}&type=artist&limit=1"
    query_url = url + query
    result = get(query_url, headers = headers)
    json_result = json.loads(result.content)
    print(json_result)

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/get_token")
async def request_token():
    token = get_token()
    os.environ['CURR_TOKEN'] = token
    print(os.getenv('CURR_TOKEN'))
    return {"token": token}


@app.get("/artistid/{artist_name}")
async def artist_id(artist_name: str):
    token = os.getenv("CURR_TOKEN")
    print(token)
    search_artist_by_name(token, artist_name)
    return {"status": "ok"}

