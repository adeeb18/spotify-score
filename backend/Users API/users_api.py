from fastapi import FastAPI, Header, HTTPException
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
import mysql.connector
from pydantic import BaseModel
from pydantic.schema import Optional, Dict
from datetime import datetime
from datetime import date

app = FastAPI()

class User(BaseModel):
    user_id: Optional[str]
    username: str
    password: str
    dob: date
    date_created: Optional[date]

    # DO "Optional[Dict]" TO MAKE IT OPTIONALLY NULL

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

def generate_user_id(db):
    cursor = db.cursor()
    for i in range(1, 9999):
        user_id = str(i).zfill(4)
        query = "SELECT COUNT(*) FROM users WHERE user_id = %s"
        values = (user_id,)
        cursor.execute(query, values)
        count = cursor.fetchone()[0]
        if count == 0:
            user_id = str(i).zfill(4)
            return user_id
    raise ValueError("Max number of users reached!")

@app.post("/users/create")
async def create_user(user: User, content_type: str = Header("application/json")):
    user_dict = jsonable_encoder(user)

    db = connect_to_database("spotifyscore.mysql.database.azure.com", "spotifyscore", "8wWrp52ey^2^", "spotifyscore")

    # VALIDATE THE INFORMATION
    if not user_dict['username'] or not user_dict['password'] or not user_dict['dob']:
        raise HTTPException(status_code=400, detail="Username, password, and date of birth are required.")

    # SET THE VALUE OF USER_ID TO A UNIQUE ID STRING
    user_dict['user_id'] = generate_user_id(db)

    # SET THE VALUE OF DATE_CREATED TO THE CURRENT TIME
    user_dict['date_created'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    cursor = db.cursor()
    query = "INSERT INTO users (user_id, username, password, dob, date_created) VALUES (%s, %s, %s, %s, %s)"
    values = (user_dict['user_id'], user_dict['username'], user_dict['password'], user_dict['dob'], user_dict['date_created'])
    
    try:
        cursor.execute(query, values)
        db.commit()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    return {"message": "User created successfully."}

@app.get("/users/getUsers")
async def get_users():
    db = connect_to_database("spotifyscore.mysql.database.azure.com", "spotifyscore", "8wWrp52ey^2^", "spotifyscore")

    cursor = db.cursor()
    query = "SELECT * FROM users"
    cursor.execute(query)

    users = []
    for user_id, username, password, dob, date_created in cursor.fetchall():
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

    return {"users": users}
