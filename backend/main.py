from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import json


app = FastAPI()
DATABASE = 'data/data.json'

class Product(BaseModel):
    name: str
    weight: float = None
    price: float = None
    description: str = None

@app.get('/')
async def root():
    return {'status': 'ok'}

@app.get('/products/')
async def get_products():
    return read_db()

@app.get('/products/{product_id}')
async def get_product(product_id: int):
    products = read_db()
    if product_id < 0 or product_id >= len(products):
        return HTTPException(status_code=404, detail='Product not found')
    return {'product': products[product_id]}

@app.post('/products/')
async def create_product(product: Product):
    db = read_db()
    db.append(product.model_dump())
    write_db(db)
    return {'result': product}

def read_db():
    try:
        with open(DATABASE, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return []

def write_db(data):
    with open(DATABASE, 'w') as file:
        json.dump(data, file, indent=2)
