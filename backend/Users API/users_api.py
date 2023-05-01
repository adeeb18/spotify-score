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
    "*",
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

class User_Review(BaseModel):
    user_id: int
    id: str
    type: str

class Login(BaseModel):
    username: str
    password: str  

class Review(BaseModel):
    type: str
    user_id: int
    id: str
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
@app.post("/users/login")
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

@app.post("/users/createReview")
# THE TYPE FIELD SHOULD BE EITHER "SONG" OR "ALBUM". THAT WILL DETERMINE WHICH TABLE IT IS PLACED INTO
async def create_review(review: Review, content_type: str = Header("application/json")):
    review_dict = jsonable_encoder(review)

    db = connect_to_database("sql9.freemysqlhosting.net", "sql9614548", "uxn5nljy2g", "sql9614548")

    cursor = db.cursor()

    # VALIDATE THE INFORMATION
    if not review_dict['user_id'] or not review_dict['id'] or not review_dict['genre'] or not review_dict['num_rating'] or not review_dict['overall_thoughts'] or not review_dict['style'] or not review_dict['mood']:
        raise HTTPException(status_code=400, detail="Missing fields.")
    
    # CHECK IF THIS USER HAS ALREADY MADE A REVIEW FOR THIS ITEM
    existing_review_query = "SELECT * FROM {} WHERE user_id = %s AND {}_id = %s".format(review_dict['type'] + '_reviews', review_dict['type'])

    cursor.execute(existing_review_query, (review_dict['user_id'], review_dict['id']))
    existing_review = cursor.fetchone()

    if existing_review:
        raise HTTPException(status_code=400, detail="This user has already made a review for this item.")
    
    # SET THE VALUE OF DATE_CREATED TO THE CURRENT TIME
    review_dict['time_created'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    # INSERT THE REVIEW INTO THE APPROPRIATE TABLE
    if review_dict['type'] == 'song':
        query = "INSERT INTO song_reviews (user_id, song_id, genre, num_rating, overall_thoughts, style, mood, would_recommend, time_created, last_edited) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        values = (review_dict['user_id'], review_dict['id'], review_dict['genre'], review_dict['num_rating'], review_dict['overall_thoughts'], review_dict['style'], review_dict['mood'], review_dict['would_recommend'], review_dict['time_created'], review_dict['last_edited'])
        updateRating(review_dict['id'], review_dict['num_rating'], True, "song")
    elif review_dict['type'] == 'album':
        query = "INSERT INTO album_reviews (user_id, album_id, genre, num_rating, overall_thoughts, style, mood, would_recommend, time_created, last_edited) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        values = (review_dict['user_id'], review_dict['id'], review_dict['genre'], review_dict['num_rating'], review_dict['overall_thoughts'], review_dict['style'], review_dict['mood'], review_dict['would_recommend'], review_dict['time_created'], review_dict['last_edited'])
        updateRating(review_dict['id'], review_dict['num_rating'], True, "album")
    else:
        raise HTTPException(status_code=400, detail="Invalid review type.")
    
    try:
        cursor.execute(query, values)
        db.commit()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    # RETRIEVE THE NEWLY CREATED REVIEW
    review_query = "SELECT user_id, {}, genre, num_rating, overall_thoughts, style, mood, would_recommend, time_created, last_edited FROM {} WHERE user_id = %s AND {}_id = %s".format(review_dict['type'] + '_id', review_dict['type'] + '_reviews', review_dict['type'])
    cursor.execute(review_query, (review_dict['user_id'], review_dict['id']))
    review_result = cursor.fetchone()
    field_names = ['user_id', '{}_id'.format(review_dict['type']), 'genre', 'num_rating', 'overall_thoughts', 'style', 'mood', 'would_recommend', 'time_created', 'last_edited']
    review_dict_with_fields = dict(zip(field_names, review_result))

    cursor.close()
    db.close()

    return review_dict_with_fields

def updateRating(id: str, user_score: int, add: bool, type: str):
    db = connect_to_database("sql9.freemysqlhosting.net", "sql9614548", "uxn5nljy2g", "sql9614548")
    cursor = db.cursor()

    # SET VALUES BASED ON IF IT IS SONG OR ALBUM
    if type == "song":
        table = "overall_song_ratings"
        id_field = "song_id"
    elif type == "album":
        table = "overall_album_ratings"
        id_field = "album_id"
    else:
        raise ValueError("Invalid type parameter. Must be 'song' or 'album'.")

    # CHECK IF THERE IS AN ENTRY ALREADY
    check_query = f"SELECT * FROM {table} WHERE {id_field} = %s"
    cursor.execute(check_query, (id,))
    existing_item = cursor.fetchone()

    if add:
        if existing_item is None:
            query = f"INSERT INTO {table} ({id_field}, num_rating, score_sum, review_count) VALUES (%s, %s, %s, %s)"
            values = (id, user_score, user_score, 1)
            cursor.execute(query, values)
            db.commit()
        else:
            num_rating = existing_item[1]
            score_sum = existing_item[2]
            review_count = existing_item[3]

            if score_sum is None:
                score_sum = 0

            if user_score is not None:
                new_score_sum = int(score_sum) + int(user_score)
                new_review_count = int(review_count) + 1
                new_num_rating = round(new_score_sum / new_review_count, 2)

                query = f"UPDATE {table} SET num_rating = %s, score_sum = %s, review_count = %s WHERE {id_field} = %s"
                values = (new_num_rating, new_score_sum, new_review_count, id)
                cursor.execute(query, values)
                db.commit()
    else:
        # UPDATE THE EXISTING AVERAGE AND ASSOCIATED FIELDS
        num_rating = existing_item[1]
        score_sum = existing_item[2]
        review_count = existing_item[3]

        if score_sum is None:
            score_sum = 0

        if user_score is not None:
            new_score_sum = int(score_sum) - int(user_score)
            new_review_count = int(review_count) - 1
            if new_review_count == 0:
                # IF THE REVIEW COUNT HAS REACHED ZERO, DELETE THE ENTRY
                delete_query = f"DELETE FROM {table} WHERE {id_field} = %s"
                cursor.execute(delete_query, (id,))
                db.commit()
            else:
                new_num_rating = round(new_score_sum / new_review_count, 2)
                query = f"UPDATE {table} SET num_rating = %s, score_sum = %s, review_count = %s WHERE {id_field} = %s"
                values = (new_num_rating, new_score_sum, new_review_count, id)
                cursor.execute(query, values)
                db.commit()

    cursor.close()
    db.close()
    
    return

@app.post("/users/getUserReviews")
async def get_user_reviews(user: User_ID, content_type: str = Header("application/json")):

    user_dict = jsonable_encoder(user)
    db = connect_to_database("sql9.freemysqlhosting.net", "sql9614548", "uxn5nljy2g", "sql9614548")
    cursor = db.cursor()
    query = """
        SELECT u.user_id, sr.song_id AS item_id, sr.genre, sr.num_rating, sr.overall_thoughts, sr.style, sr.mood, sr.would_recommend, sr.time_created, sr.last_edited
        FROM users u 
        LEFT JOIN song_reviews sr ON u.user_id = sr.user_id
        WHERE u.user_id = %s AND sr.song_id IS NOT NULL
        UNION ALL
        SELECT u.user_id, ar.album_id AS item_id, ar.genre, ar.num_rating, ar.overall_thoughts, ar.style, ar.mood, ar.would_recommend, ar.time_created, ar.last_edited
        FROM users u
        LEFT JOIN album_reviews ar ON u.user_id = ar.user_id
        WHERE u.user_id = %s AND ar.album_id IS NOT NULL;
    """
    cursor.execute(query, (user_dict['user_id'], user_dict['user_id'],))
    result = cursor.fetchall()
    review_dicts_with_fields = []

    for row in result:
        field_names = ['user_id', 'id', 'genre', 'num_rating', 'overall_thoughts', 'style', 'mood', 'would_recommend', 'time_created', 'last_edited'] 
        review_dict = dict(zip(field_names, row))
        review_dicts_with_fields.append(review_dict)

    cursor.close()
    db.close()
    return review_dicts_with_fields

@app.get("/users/getAllReviews")
async def get_all_reviews():

    db = connect_to_database("sql9.freemysqlhosting.net", "sql9614548", "uxn5nljy2g", "sql9614548")
    cursor = db.cursor()
    query = """
        SELECT u.user_id, sr.song_id AS item_id, sr.genre, sr.num_rating, sr.overall_thoughts, sr.style, sr.mood, sr.would_recommend, sr.time_created, sr.last_edited
        FROM users u 
        LEFT JOIN song_reviews sr ON u.user_id = sr.user_id
        WHERE sr.song_id IS NOT NULL
        UNION ALL
        SELECT u.user_id, ar.album_id AS item_id, ar.genre, ar.num_rating, ar.overall_thoughts, ar.style, ar.mood, ar.would_recommend, ar.time_created, ar.last_edited
        FROM users u
        LEFT JOIN album_reviews ar ON u.user_id = ar.user_id
        WHERE ar.album_id IS NOT NULL;
    """
    cursor.execute(query)
    result = cursor.fetchall()
    review_dicts_with_fields = []

    for row in result:
        field_names = ['user_id', 'id', 'genre', 'num_rating', 'overall_thoughts', 'style', 'mood', 'would_recommend', 'time_created', 'last_edited'] 
        review_dict = dict(zip(field_names, row))
        review_dicts_with_fields.append(review_dict)

    cursor.close()
    db.close()
    return review_dicts_with_fields

# EDIT A REVIEW
# PASS IN THE SONG_ID AND USER_ID ALONG WITH ALL THE FIELDS FROM THE REVIEW FORM
@app.put("/users/editSongReview")
async def edit_song_review(review: Review, content_type: str = Header("application/json")):
    review_dict = jsonable_encoder(review)

    db = connect_to_database("sql9.freemysqlhosting.net", "sql9614548", "uxn5nljy2g", "sql9614548")

    cursor = db.cursor()
    
    # VALIDATE THE INFORMATION
    if not review_dict['user_id'] or not review_dict['id'] or not review_dict['genre'] or not review_dict['num_rating'] or not review_dict['overall_thoughts'] or not review_dict['style'] or not review_dict['mood']:
        raise HTTPException(status_code=400, detail="Missing fields.")
    
    # CHECK IF THIS USER HAS ALREADY MADE A REVIEW FOR THIS ITEM
    existing_review_query = "SELECT * FROM {} WHERE user_id = %s AND {}_id = %s".format(review_dict['type'] + '_reviews', review_dict['type'])

    cursor.execute(existing_review_query, (review_dict['user_id'], review_dict['id']))
    existing_review = cursor.fetchone()

    if existing_review is None:
        raise HTTPException(status_code=400, detail="This user has not made an existing review for this song.")
    else:
        # GET THE TIME CREATED
        review_dict['time_created'] = existing_review[8]
        old_score = existing_review[3]

    # SET THE VALUE OF TIME_EDITED TO THE CURRENT TIME
    review_dict['last_edited'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    if review_dict['type'] == 'song':
        query = "UPDATE song_reviews SET genre = %s, num_rating = %s, overall_thoughts = %s, style = %s, mood = %s, would_recommend = %s, last_edited = %s WHERE user_id = %s AND song_id = %s"
        values = (review_dict['genre'], review_dict['num_rating'], review_dict['overall_thoughts'], review_dict['style'], review_dict['mood'], review_dict['would_recommend'], review_dict['last_edited'], review_dict['user_id'], review_dict['id'])
        # UPDATE THE SCORE IN CASE THE RATING WAS CHANGED
        updateRating(review_dict['id'], old_score, False, "song")
        updateRating(review_dict['id'], review_dict['num_rating'], True, "song")
    elif review_dict['type'] == 'album':
        query = "UPDATE album_reviews SET genre = %s, num_rating = %s, overall_thoughts = %s, style = %s, mood = %s, would_recommend = %s, last_edited = %s WHERE user_id = %s AND album_id = %s"
        values = (review_dict['genre'], review_dict['num_rating'], review_dict['overall_thoughts'], review_dict['style'], review_dict['mood'], review_dict['would_recommend'], review_dict['last_edited'], review_dict['user_id'], review_dict['id'])
        updateRating(review_dict['id'], old_score, False, "album")
        updateRating(review_dict['id'], review_dict['num_rating'], True, "album")
    else:
        raise HTTPException(status_code=400, detail="Invalid review type.")

    try:
        cursor.execute(query, values)
        db.commit()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    # RETRIEVE THE NEWLY CREATED REVIEW
    review_query = "SELECT user_id, {}, genre, num_rating, overall_thoughts, style, mood, would_recommend, time_created, last_edited FROM {} WHERE user_id = %s AND {}_id = %s".format(review_dict['type'] + '_id', review_dict['type'] + '_reviews', review_dict['type'])
    cursor.execute(review_query, (review_dict['user_id'], review_dict['id']))
    review_result = cursor.fetchone()
    field_names = ['user_id', '{}_id'.format(review_dict['type']), 'genre', 'num_rating', 'overall_thoughts', 'style', 'mood', 'would_recommend', 'time_created', 'last_edited']
    review_dict_with_fields = dict(zip(field_names, review_result))

    cursor.close()
    db.close()

    return review_dict_with_fields

@app.delete("/users/deleteUser")
async def delete_user(user: User_ID, content_type: str = Header("application/json")):

    db = connect_to_database("sql9.freemysqlhosting.net", "sql9614548", "uxn5nljy2g", "sql9614548")
    cursor = db.cursor()

    user_dict = jsonable_encoder(user)

    # LOOP THROUGH ALL SONG REVIEWS AND UPDATE OVERALL SONG RATINGS
    song_query = "SELECT * FROM song_reviews WHERE user_id = %s"
    cursor.execute(song_query, (user_dict['user_id'],))
    song_reviews = cursor.fetchall()

    for review in song_reviews:
        updateRating(review[1], review[3], False, "song")

    # LOOP THROUGH ALL ALBUM REVIEWS AND UPDATE OVERALL ALBUM RATINGS
    album_query = "SELECT * FROM album_reviews WHERE user_id = %s"
    cursor.execute(album_query, (user_dict['user_id'],))
    album_reviews = cursor.fetchall()

    for review in album_reviews:
        updateRating(review[1], review[3], False, "album")

    # DELETE USER FROM USERS TABLE
    query = "DELETE FROM users WHERE user_id = %s"
    cursor.execute(query, (user_dict['user_id'],))
    db.commit()
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="User not found.")
    
    cursor.close()
    db.close()

    return {"message": f"User with user_id {user_dict['user_id']} has been deleted."}

# DELETE A REVIEW
@app.delete("/users/deleteReview")
async def delete_song_review(user: User_Review, content_type: str = Header("application/json")):
    db = connect_to_database("sql9.freemysqlhosting.net", "sql9614548", "uxn5nljy2g", "sql9614548")

    cursor = db.cursor()

    user_dict = jsonable_encoder(user)

    # USER_ID CONSTRAINT HAS "ON DELETE CASCADE" SO, WHEN THE USER IS DELETED, IT DELETES ENTRIES IN THE REVIEW TABLES WHERE USER_ID IS A FOREIGN KEY
    deleteQuery = "DELETE FROM {} WHERE user_id = %s AND {}_id = %s".format(user_dict['type'] + '_reviews', user_dict['type'])

    searchQuery = "SELECT * FROM {} WHERE user_id = %s AND {}_id = %s".format(user_dict['type'] + '_reviews', user_dict['type'])
    cursor.execute(searchQuery, (user_dict['user_id'], user_dict['id'],))
    song_reviews = cursor.fetchone()

    # NEED TO ALSO UPDATE OVERALL SONG/ALBUM RATINGS SINCE REVIEWS WILL BE DELETED
    if user_dict['type'] == 'song':
         updateRating(song_reviews[1], song_reviews[3], False, "song")
    elif user_dict['type'] == 'album':
         updateRating(song_reviews[1], song_reviews[3], False, "album")
    else:
        raise HTTPException(status_code=400, detail="Invalid review type.")

    cursor.execute(deleteQuery, (user_dict['user_id'], user_dict['id'],))
    db.commit()
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="User song review not found.")

    cursor.close()
    db.close()

    return {"message": f"User with user_id {user_dict['user_id']} and id {user_dict['id']} has been deleted."}