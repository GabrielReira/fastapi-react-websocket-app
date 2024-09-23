from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import json


app = FastAPI()
DATABASE = 'data/data.json'

class Item(BaseModel):
    name: str
    description: str = None

@app.get('/')
async def root():
    return {'status': 'ok'}

@app.get('/items/')
async def get_items():
    return read_db()

@app.get('/items/{item_id}')
async def get_item(item_id: int):
    items = read_db()
    if item_id < 0 or item_id >= len(items):
        return HTTPException(status_code=404, detail='Item not found')
    return {'item': items[item_id]}

@app.post('/items/')
async def create_item(item: Item):
    db = read_db()
    db.append(item.model_dump())
    write_db(db)
    return {'result': item}

def read_db():
    try:
        with open(DATABASE, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return []

def write_db(data):
    with open(DATABASE, 'w') as file:
        json.dump(data, file, indent=2)
