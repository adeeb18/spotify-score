from fastapi import FastAPI
import os
import base64
from dotenv import load_dotenv
from requests import post, get
import json
from pydantic import BaseModel
from typing import List, Dict, Union
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum


class Artist(BaseModel):
    name: str
    image_url: str
    id: str
    type: str = "artist"

class Track(BaseModel):
    name: str
    image_url: str
    artists: List[str]
    id: str
    type: str = "track"

class Album(BaseModel):
    name: str
    image_url: str
    artist: str
    id: str
    type: str = "album"

class QueryResponse(BaseModel):
    responses: List[Dict[str, Union[str, List[str]]]] = []

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

class AlbumListResponse(BaseModel):
    albums: List[Dict[str, str]] = []


        
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
    return json_result['artists']['items']
    
def search_album_by_name(token, album_name):
    url = "https://api.spotify.com/v1/search"
    headers = {"Authorization" : "Bearer " + token}
    query = f"?q={album_name}&type=album&limit=5"
    query_url = url + query
    result = get(query_url, headers = headers)
    json_result = json.loads(result.content)
    if len(json_result) == 0:
        print("No album with this name")
        return None
    return json_result['albums']['items']
    
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
        artist_ids = [sub['id'] for sub in json_result['artists']['items']]
        artist_images = [ sub['images'][0] if len(sub['images']) > 0 else '' for sub in json_result['artists']['items'] ]
        artists = []

        for name, image, id in zip(artist_names, artist_images, artist_ids):
            url = image['url'] if len(image) > 0 else ''
            artist = Artist(name=name, image_url=url, id=id)
            artists.append(artist)
            responses.append(artist)
    
    if 'tracks' in json_result:
        tracks = []
        for item in json_result['tracks']['items']:
            name = item['name']
            image = ''
            if 'album' in item:
                image = item['album']['images'][0]["url"] if len(item['album']['images']) > 0 else ''

            artists = []
            if 'artists' in item:
                if len(item['artists']) > 0:
                    artists = [ sub['name'] for sub in item['artists'] ]

            track = Track(name=name, image_url=image, id=item["id"], artists=artists)
            tracks.append(track)
            responses.append(track)
            
    if 'albums' in json_result:
        albums = []
        for item in json_result['albums']['items']:
            name = item['name']
            id = item['id']
            url = item['images'][0]['url'] if len(item['images']) > 0 else ''
            artist = item['artists'][0]['name'] if len(item['artists']) > 0 else ''
            album = Album(name=name, image_url=url, artist=artist, id=id)
            albums.append(album)
            responses.append(album)

    print("albums: ")
    print(albums)
    print("responses: ")

    print(responses)
    return responses

def get_artist_by_id(token, artist_id):
    url = "https://api.spotify.com/v1/artists/"
    headers = {"Authorization" : "Bearer " + token}
    query_url = url + artist_id
    result = get(query_url, headers = headers)
    json_result = json.loads(result.content)
    if len(json_result) == 0:
        print("No artist with this id")
        return None
    return json_result

def get_album_by_id(token, album_id):
    url = "https://api.spotify.com/v1/albums/"
    headers = {"Authorization" : "Bearer " + token}
    query_url = url + album_id
    result = get(query_url, headers = headers)
    json_result = json.loads(result.content)
    if len(json_result) == 0:
        print("No album with this id")
        return None
    return json_result

def get_track_by_id(token, track_id):
    url = "https://api.spotify.com/v1/tracks/"
    headers = {"Authorization" : "Bearer " + token}
    query_url = url + track_id
    result = get(query_url, headers = headers)
    json_result = json.loads(result.content)
    if len(json_result) == 0:
        print("No track with this id")
        return None
    return json_result

def get_artist_albums_by_id(token, artist_id):
    url = "https://api.spotify.com/v1/artists/"
    headers = {"Authorization" : "Bearer " + token}
    query_url = url + artist_id + "/albums"
    result = get(query_url, headers = headers)
    json_result = json.loads(result.content)
    if len(json_result) == 0:
        print("No artist with this id")
        return None
    return json_result

def get_artist_toptracks_by_id(token, artist_id):
    url = "https://api.spotify.com/v1/artists/"
    headers = {"Authorization" : "Bearer " + token}
    query_url = url + artist_id + "/top-tracks?market=US"
    result = get(query_url, headers = headers)
    json_result = json.loads(result.content)
    if len(json_result) == 0:
        print("No artist with this id")
        return None
    return json_result

'''
API Endpoints
'''

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
    artist_names = [sub['name'] for sub in artist_list ]
    artist_ids = [sub['id'] for sub in artist_list ]
    artist_images = [sub['images'][0] if len(sub['images']) > 0 else '' for sub in artist_list ]
    print(artist_names)
    print(artist_images)

    # Create artist objects to return
    artists = []
    for name, image, id in zip(artist_names, artist_images, artist_ids):
        url = image['url'] if len(image) > 0 else ''
        artist = Artist(name=name, image_url=url, id=id)
        artists.append(artist)

    # Create a response object using the Pydantic model
    response = ArtistListResponse(artists=artists)

    # Return the response as a JSON
    return response.dict()

@app.get("/albumid/{album_name}")
async def album_id(album_name : str):
     # Get access token
    token = get_token()
    print(token)

    # Search for artists by query
    album_list = search_album_by_name(token, album_name)
    album_names = [sub['name'] for sub in album_list ]
    album_ids = [sub['id'] for sub in album_list ]
    album_images = [sub['images'][0] if len(sub['images']) > 0 else '' for sub in album_list ]
    print(album_names)
    print(album_images)
    print(album_ids)

    # Create artist objects to return
    albums = []
    for name, image, id in zip(album_names, album_names, album_ids):
        url = image['url'] if len(image) > 0 else ''
        album = Album(name=name, image_url=url, id=id, artist='')
        albums.append(album)

    # Create a response object using the Pydantic model
    response = AlbumListResponse(albums=albums)

@app.get("/search/{query}")
async def search(query: str):
    # Get access token
    token = get_token()
    print(token)

    # Search for artists by query
    response_list = search_by_query(token, query)

    return QueryResponse(responses=response_list)

@app.get("/artist/{id}")
async def get_artist(id: str):
    # Get access token
    token = get_token()
    print(token)

    # Search for artists by query
    response = get_artist_by_id(token, id)

    return response

@app.get("/album/{id}")
async def get_album(id: str):
    # Get access token
    token = get_token()
    print(token)

    # Search for artists by query
    response = get_album_by_id(token, id)

    return response

@app.get("/track/{id}")
async def get_track(id: str):
    # Get access token
    token = get_token()
    print(token)

    # Search for artists by query
    response = get_track_by_id(token, id)

    return response

@app.get("/artists/{id}/albums")
async def get_artist_albums(id: str):
    # Get access token
    token = get_token()
    print(token)

    # Search for artists by query
    response = get_artist_albums_by_id(token, id)

    return response

@app.get("/artists/{id}/toptracks")
async def get_artist_toptracks(id: str):
    # Get access token
    token = get_token()
    print(token)

    # Search for artists by query
    response = get_artist_toptracks_by_id(token, id)

    return response


handler = Mangum(app)