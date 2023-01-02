from fastapi import FastAPI
import psycopg2

def get_connection():
    conn = psycopg2.connect(
        host="localhost",
        port=5432,
        user="username",
        password="password",
        dbname="database_name"
    )
    return conn

app = FastAPI()

@app.get("/")
def read_root():
    return {"host"}