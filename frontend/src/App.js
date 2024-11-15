import React, {useState, useEffect} from 'react';
import { fetchProducts, createProduct, subscribeToWebsocket } from './services/api';

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  useEffect (() => {
    // HTTP first request to load products
    fetchProducts().then((data) => setProducts(data));

    // Connect to WebSocket to retrieve newly products in real-time
    const socket = subscribeToWebsocket(
      (newProduct) => setProducts(newProduct),
      (error) => console.error('Websocket error:', error)
    );

    return () => socket.close();
  }, []);

  // HTTP request to create a new product
  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      name: name,
      weight: parseFloat(weight),
      price: parseFloat(price),
      description: description
    };
    createProduct(newProduct).then(() => {
      setName('');
      setWeight('');
      setPrice('');
      setDescription('');
    });
  }

  return (
    <div>
      <h2>Create a Product</h2>
      <form onSubmit={handleSubmit}>
        <input type='text' value={name} placeholder='Name' onChange={e => setName(e.target.value)} />
        <input type='text' value={weight} placeholder='Weight' onChange={e => setWeight(e.target.value)} />
        <input type='text' value={price} placeholder='Price' onChange={e => setPrice(e.target.value)} />
        <input type='text' value={description} placeholder='Description' onChange={e => setDescription(e.target.value)} />
        <button type='submit'>ADD PRODUCT</button>
      </form>

      <h2>Products List</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.name} - {product.weight}kg - €{product.price} - {product.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
