from fastapi import FastAPI, Header, HTTPException, Request
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
import mysql.connector
from pydantic import BaseModel
from pydantic.schema import Optional, Dict
from datetime import datetime
from datetime import date
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(BaseModel):
    user_id: Optional[int]
    username: str
    password: str
    dob: date
    date_created: Optional[datetime]

class User_ID(BaseModel):
    user_id: int

class User_Song(BaseModel):
    user_id: int
    song_id: str

class Login(BaseModel):
    username: str
    password: str  

class Song_Review(BaseModel):
    user_id: int
    song_id: str
    genre: str
    num_rating: str
    overall_thoughts: str
    style: str
    mood: str
    would_recommend: str
    time_created: Optional[datetime]
    last_edited: Optional[datetime]

class Album_Review(BaseModel):
    user_id: int
    album_id: str
    genre: str
    num_rating: str
    overall_thoughts: str
    style: str
    mood: str
    would_recommend: str
    time_created: Optional[datetime]
    last_edited: Optional[datetime]

def connect_to_database(host, user, password, database):
    db = mysql.connector.connect(
        host=host,
        user=user,
        password=password,
        database=database,
    )

    if db.is_connected():
        print("Database is connected")
    else:
        print("Database is not connected")
    
    return db

# CREATE A USER
@app.post("/users/createUser")
async def create_user(user: User, content_type: str = Header("application/json")):
    user_dict = jsonable_encoder(user)

    db = connect_to_database("sql9.freemysqlhosting.net", "sql9614548", "uxn5nljy2g", "sql9614548")

    cursor = db.cursor()

    # VALIDATE THE INFORMATION
    # PREVENTS ENTRIES LIKE ""
    if not user_dict['username'] or not user_dict['password'] or not user_dict['dob']:
        raise HTTPException(status_code=400, detail="Username, password, and date of birth are required.")
    
    # CHECK IF THE USERNAME ALREADY EXISTS
    user_exists = "SELECT * FROM users WHERE username = %s"
    cursor.execute(user_exists, (user_dict['username'],))
    existing_user = cursor.fetchone()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists.")

    # SET THE VALUE OF DATE_CREATED TO THE CURRENT TIME
    user_dict['date_created'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    query = "INSERT INTO users (user_id, username, password, dob, date_created) VALUES (%s, %s, %s, %s, %s)"
    values = (user_dict['user_id'], user_dict['username'], user_dict['password'], user_dict['dob'], user_dict['date_created'])
    
    try:
        cursor.execute(query, values)
        db.commit()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    # RETRIEVE THE NEWLY CREATED USER BY USERNAME
    user_query = "SELECT user_id, username, password, dob, date_created FROM users WHERE username = %s"
    cursor.execute(user_query, (user_dict['username'],))
    user_result = cursor.fetchone()
    field_names = ['user_id', 'username', 'password', 'dob', 'date_created']
    user_dict_with_fields = dict(zip(field_names, user_result))

    cursor.close()
    db.close()

    return user_dict_with_fields

# VERIFY LOGIN CREDENTIALS
@app.get("/users/login")
async def login(user: Login, content_type: str = Header("application/json")):
    user_dict = jsonable_encoder(user)

    db = connect_to_database("sql9.freemysqlhosting.net", "sql9614548", "uxn5nljy2g", "sql9614548")

    cursor = db.cursor()
    query = "SELECT * FROM users WHERE username = %s AND password = %s"
    cursor.execute(query, (user_dict['username'], user_dict['password']))

    try:
        row = cursor.fetchone()
        if row:
            user_id, username, password, dob, date_created = row
            user = {"user_id": user_id, "username": username, "password": password, "dob": dob, "date_created": date_created}
            return {"User: ": user}
        else:
            return {"message": "Login failed."}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        cursor.close()
        db.close()

# GET ALL USERS (TEST FUNCTION)
@app.get("/users/getUsers")
async def get_users():
    db = connect_to_database("sql9.freemysqlhosting.net", "sql9614548", "uxn5nljy2g", "sql9614548")

    cursor = db.cursor()
    query = "SELECT * FROM users"

    try:
        cursor.execute(query)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    users = []
    for user_id, username, password, dob, date_created in cursor:
        user = User(
            user_id=user_id,
            username=username,
            password=password,
            dob=dob,
            date_created=date_created
        )
        users.append(user)

    cursor.close()
    db.close()

    return {"Users": users}

# DELETE USER
@app.delete("/users/deleteUser")
async def delete_user(user: User_ID, content_type: str = Header("application/json")):
    db = connect_to_database("sql9.freemysqlhosting.net", "sql9614548", "uxn5nljy2g", "sql9614548")

    cursor = db.cursor()

    user_dict = jsonable_encoder(user)

    # USER_ID CONSTRAINT HAS "ON DELETE CASCADE" SO, WHEN THE USER IS DELETED, IT DELETES ENTRIES IN THE REVIEW TABLES WHERE USER_ID IS A FOREIGN KEY
    query = "DELETE FROM users WHERE user_id = %s"

    # NEED TO ALSO UPDATE OVERALL SONG/ALBUM RATINGS SINCE REVIEWS WILL BE DELETED

    cursor.execute(query, (user_dict['user_id'],))
    db.commit()
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="User not found.")

    cursor.close()
    db.close()

    return {"message": f"User with user_id {user_dict['user_id']} has been deleted."}

# CREATE A REVIEW
@app.post("/users/createSongReview")
async def create_song_review(review: Song_Review, content_type: str = Header("application/json")):
    review_dict = jsonable_encoder(review)

    db = connect_to_database("sql9.freemysqlhosting.net", "sql9614548", "uxn5nljy2g", "sql9614548")

    cursor = db.cursor()

    # VALIDATE THE INFORMATION
    if not review_dict['user_id'] or not review_dict['song_id'] or not review_dict['genre'] or not review_dict['num_rating'] or not review_dict['overall_thoughts'] or not review_dict['style'] or not review_dict['mood']:
        raise HTTPException(status_code=400, detail="Missing fields.")
    
    # CHECK IF THIS USER HAS ALREADY MADE A REVIEW FOR THIS SONG
    existing_review_query = "SELECT * FROM song_reviews WHERE user_id = %s AND song_id = %s"
    cursor.execute(existing_review_query, (review_dict['user_id'], review_dict['song_id']))
    existing_review = cursor.fetchone()

    if existing_review:
        raise HTTPException(status_code=400, detail="This user has already made a review for this song.")
    
    # SET THE VALUE OF DATE_CREATED TO THE CURRENT TIME
    review_dict['time_created'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    query = "INSERT INTO song_reviews (user_id, song_id, genre, num_rating, overall_thoughts, style, mood, would_recommend, time_created, last_edited) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    values = (review_dict['user_id'], review_dict['song_id'], review_dict['genre'], review_dict['num_rating'], review_dict['overall_thoughts'], review_dict['style'], review_dict['mood'], review_dict['would_recommend'], review_dict['time_created'], review_dict['last_edited'])
    
    try:
        cursor.execute(query, values)
        db.commit()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    # RETRIEVE THE NEWLY CREATED REVIEW
    review_query = "SELECT user_id, song_id, genre, num_rating, overall_thoughts, style, mood, would_recommend, time_created, last_edited FROM song_reviews WHERE user_id = %s AND song_id = %s"
    cursor.execute(review_query, (review_dict['user_id'], review_dict['song_id']))
    review_result = cursor.fetchone()
    field_names = ['user_id', 'song_id', 'genre', 'num_rating', 'overall_thoughts', 'style', 'mood', 'would_recommend', 'time_created', 'last_edited']
    review_dict_with_fields = dict(zip(field_names, review_result))

    cursor.close()
    db.close()

    return review_dict_with_fields

@app.get("/users/getUserReviews")
async def get_user_reviews(user: User_ID, content_type: str = Header("application/json")):
    user_dict = jsonable_encoder(user)
    db = connect_to_database("sql9.freemysqlhosting.net", "sql9614548", "uxn5nljy2g", "sql9614548")
    cursor = db.cursor()
    query = """
        SELECT sr.user_id, sr.song_id, sr.genre, sr.num_rating, sr.overall_thoughts, sr.style, sr.mood, sr.would_recommend, sr.time_created, sr.last_edited
        FROM users u 
        LEFT JOIN song_reviews sr ON u.user_id = sr.user_id
        WHERE u.user_id = %s AND sr.song_id IS NOT NULL
        UNION ALL
        SELECT ar.user_id, ar.album_id, ar.genre, ar.num_rating, ar.overall_thoughts, ar.style, ar.mood, ar.would_recommend, ar.time_created, ar.last_edited
        FROM users u 
        LEFT JOIN album_reviews ar ON u.user_id = ar.user_id
        WHERE u.user_id = %s AND ar.album_id IS NOT NULL;
    """
    cursor.execute(query, (user_dict['user_id'], user_dict['user_id'],))
    result = cursor.fetchall()
    field_names = ['user_id', 'song_id', 'song_genre', 'song_num_rating', 'song_overall_thoughts', 'song_style', 'song_mood', 'song_would_recommend', 'song_time_created', 'song_last_edited', 'album_id', 'album_genre', 'album_num_rating', 'album_overall_thoughts', 'album_style', 'album_mood', 'album_would_recommend', 'album_time_created', 'album_last_edited']
    review_dicts_with_fields = [dict(zip(field_names, row)) for row in result]
    cursor.close()
    db.close()
    return review_dicts_with_fields

# EDIT A REVIEW
# PASS IN THE SONG_ID AND USER_ID ALONG WITH ALL THE FIELDS FROM THE REVIEW FORM
@app.put("/users/editSongReview")
async def edit_song_review(review: Song_Review, content_type: str = Header("application/json")):
    review_dict = jsonable_encoder(review)

    db = connect_to_database("sql9.freemysqlhosting.net", "sql9614548", "uxn5nljy2g", "sql9614548")

    cursor = db.cursor()

    # VALIDATE THE INFORMATION
    if not review_dict['user_id'] or not review_dict['song_id'] or not review_dict['genre'] or not review_dict['num_rating'] or not review_dict['overall_thoughts'] or not review_dict['style'] or not review_dict['mood']:
        raise HTTPException(status_code=400, detail="Missing fields.")
    
    # CHECK IF THIS USER HAS ALREADY MADE A REVIEW FOR THIS SONG
    existing_review_query = "SELECT * FROM song_reviews WHERE user_id = %s AND song_id = %s"
    cursor.execute(existing_review_query, (review_dict['user_id'], review_dict['song_id']))
    existing_review = cursor.fetchone()

    if existing_review is None:
        raise HTTPException(status_code=400, detail="This user has not made an existing review for this song.")
    else:
        # GET THE TIME CREATED
        review_dict['time_created'] = existing_review[8]

    # SET THE VALUE OF TIME_EDITED TO THE CURRENT TIME
    review_dict['last_edited'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    query = "UPDATE song_reviews SET genre = %s, num_rating = %s, overall_thoughts = %s, style = %s, mood = %s, would_recommend = %s, last_edited = %s WHERE user_id = %s AND song_id = %s"
    values = (review_dict['genre'], review_dict['num_rating'], review_dict['overall_thoughts'], review_dict['style'], review_dict['mood'], review_dict['would_recommend'], review_dict['last_edited'], review_dict['user_id'], review_dict['song_id'])

    try:
        cursor.execute(query, values)
        db.commit()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    # RETRIEVE THE NEWLY CREATED REVIEW
    review_query = "SELECT user_id, song_id, genre, num_rating, overall_thoughts, style, mood, would_recommend, time_created, last_edited FROM song_reviews WHERE user_id = %s AND song_id = %s"
    cursor.execute(review_query, (review_dict['user_id'], review_dict['song_id']))
    review_result = cursor.fetchone()
    field_names = ['user_id', 'song_id', 'genre', 'num_rating', 'overall_thoughts', 'style', 'mood', 'would_recommend', 'time_created', 'last_edited']
    review_dict_with_fields = dict(zip(field_names, review_result))

    cursor.close()
    db.close()

    return review_dict_with_fields

# DELETE A SONG REVIEW
@app.delete("/users/deleteSongReview")
async def delete_song_review(user: User_Song, content_type: str = Header("application/json")):
    db = connect_to_database("sql9.freemysqlhosting.net", "sql9614548", "uxn5nljy2g", "sql9614548")

    cursor = db.cursor()

    user_dict = jsonable_encoder(user)

    # USER_ID CONSTRAINT HAS "ON DELETE CASCADE" SO, WHEN THE USER IS DELETED, IT DELETES ENTRIES IN THE REVIEW TABLES WHERE USER_ID IS A FOREIGN KEY
    query = "DELETE FROM song_reviews WHERE user_id = %s AND song_id = %s"

    # NEED TO ALSO UPDATE OVERALL SONG/ALBUM RATINGS SINCE REVIEWS WILL BE DELETED

    cursor.execute(query, (user_dict['user_id'], user_dict['song_id'],))
    db.commit()
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="User song review not found.")

    cursor.close()
    db.close()

    return {"message": f"User with user_id {user_dict['user_id']} and song_id {user_dict['song_id']} has been deleted."}

