## HOW TO RUN THE API
- To run the API, go into your terminal and use "cd" until you reach the folder where ```users_api.py``` is located.
- Next, paste ```uvicorn users_api:app --host 0.0.0.0 --port 8000``` to start the API.

## PASSING BY BODY
- The endpoint to call a certain function can be found above the function definition.
  - For example, the create user function has this endpoint:
  - ```@app.post("/users/createUser")```
  - Therefore, since it is hosted on localhost 8000, the function's full endpoint should be:
  - ```http://localhost:8000/users/createUser```

- To see what you need to specifically pass in, look at the def and see what class should be passed in:
  - For example, the create user function has this:
  - ```async def create_user(user: User, content_type: str = Header("application/json")):```
    - This means that whatever is in the "User" class needs to be passed in.
    - The "User" class looks like this:
    ```
      class User(BaseModel):
      user_id: Optional[int]
      username: str
      password: str
      dob: date
      date_created: Optional[date]
    ```
    - Example body for the create user function:
    ```
    {
      "user_id": null,
      "username" : "username",
      "password": "pass",
      "dob": "2020-10-02",
      "date_created": null
    }
    ```
    - Make sure to know what you **need** to pass in and what is optional. The fields that have "Optional" are not needed and can have "null" in its place.
