from fastapi import FastAPI
import os
import base64
from dotenv import load_dotenv
from requests import post, get
import json
from pydantic import BaseModel
from typing import List, Dict
from fastapi.middleware.cors import CORSMiddleware

class Artist(BaseModel):
    name: str
    image_url: str

class Track(BaseModel):
    name: str
    image_url: str
    artist: str

class Album(BaseModel):
    name: str
    image_url: str
    artist: str

class QueryResponse(BaseModel):
    responses: List[Dict[str, str]] = []

    class Config:
        schema_extra = {
            "example": {
                "responses": [
                    {"name": "Beyoncé", "image_url": "https://example.com/beyonce.jpg"},
                    {"name": "Drake", "image_url": "https://example.com/drake.jpg"}
                ]
            }
        }


class ArtistListResponse(BaseModel):
    artists: List[Dict[str, str]] = []

    class Config:
        schema_extra = {
            "example": {
                "artists": [
                    {"name": "Beyoncé", "image_url": "https://example.com/beyonce.jpg"},
                    {"name": "Drake", "image_url": "https://example.com/drake.jpg"}
                ]
            }
        }

load_dotenv()
client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    query = f"?q={artist_name}&type=artist&limit=5"
    query_url = url + query
    result = get(query_url, headers = headers)
    json_result = json.loads(result.content)
    if len(json_result) == 0:
        print("No artist with this name")
        return None
    print(json_result['artists']['items'])
    return json_result['artists']['items']
    


def search_by_query(token, artist_name):
    url = "https://api.spotify.com/v1/search"
    headers = {"Authorization" : "Bearer " + token}
    query = f"?q={artist_name}&type=album,artist,track&limit=3"
    query_url = url + query
    result = get(query_url, headers = headers)
    json_result = json.loads(result.content)
    if len(json_result) == 0:
        print("No artist with this name")
        return None
    
    responses = []
    if 'artists' in json_result:
        artist_names = [sub['name'] for sub in json_result['artists']['items']]
        artist_images = [ sub['images'][0] if len(sub['images']) > 0 else '' for sub in json_result['artists']['items'] ]
        print("artists: ")
        print(artist_names)

        for name, image in zip(artist_names, artist_images):
            url = image['url'] if len(image) > 0 else ''
            artist = Artist(name=name, image_url=url)
            responses.append(artist)
    if 'tracks' in json_result:
        track_names = []
        track_images = []
        track_artists = []
        for item in json_result['tracks']['items']:
            track_names.append(item['name'])
            if 'album' in item:
                track_images.append(item['album']['images'][0] if len(item['album']['images']) > 0 else '')
            else:
                track_images.append('')

            if 'artists' in item:
                if len(item['artists']) > 0:
                    track_artists.append([ sub['name'] for sub in item['artists'] ])
                else:
                    track_artists.append([])
            else:
                track_artists.append([])

        print("tracks: ")

        print(track_names)
    if 'albums' in json_result:
        album_names = [sub['name'] for sub in json_result['albums']['items']]
        album_images = [sub['images'][0]['url'] if len(sub['images']) > 0 else '' for sub in json_result['albums']['items'] ]
        album_artist = [sub['artists'][0]['name'] if len(sub['artists']) > 0 else '' for sub in json_result['albums']['items'] ]
        print("albums: ")

        print(album_names)

    return 'not_completed'

def get_artists_by_id(token, artist_id):
    return None

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
    # Get access token
    token = get_token()
    print(token)

    # Search for artists by query
    artist_list = search_artist_by_name(token, artist_name)
    artist_names = [ sub['name'] for sub in artist_list ]
    artist_images = [ sub['images'][0] if len(sub['images']) > 0 else '' for sub in artist_list ]
    print(artist_names)
    print(artist_images)

    # Create artist objects to return
    artists = []
    for name, image in zip(artist_names, artist_images):
        url = image['url'] if len(image) > 0 else ''
        artist = Artist(name=name, image_url=url)
        artists.append(artist)

    # Create a response object using the Pydantic model
    response = ArtistListResponse(artists=artists)

    # Return the response as a JSON
    return response.dict()

@app.get("/search/{query}")
async def search(query: str):
    # Get access token
    token = get_token()
    print(token)

    # Search for artists by query
    artist_list = search_by_query(token, query)
    # artist_names = [ sub['name'] for sub in artist_list ]
    # artist_images = [ sub['images'][0] if len(sub['images']) > 0 else '' for sub in artist_list ]
    # print(artist_names)
    # print(artist_images)

    # # Create artist objects to return
    # artists = []
    # for name, image in zip(artist_names, artist_images):
    #     url = image['url'] if len(image) > 0 else ''
    #     artist = Artist(name=name, image_url=url)
    #     artists.append(artist)

    # # Create a response object using the Pydantic model
    # response = ArtistListResponse(artists=artists)

    # # Return the response as a JSON
    # return response.dict()

    return {'responts': 'ok'}