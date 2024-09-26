import React, {useState, useEffect} from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  useEffect (() => {
    fetch('http://localhost:8000/products/')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error))
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      name: name,
      weight: parseFloat(weight),
      price: parseFloat(price),
      description: description
    };
    fetch('http://localhost:8000/products/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts([...products, data.result]);
        setName('');
        setWeight('');
        setPrice('');
        setDescription('');
      }).catch((error) => console.error(error))
  }

  return (
    <div>
      <h2>Create a Product</h2>
      <form onSubmit={handleSubmit}>
        <input type='text' value={name} placeholder='Name' onChange={e => setName(e.target.value)} />
        <input type='text' value={weight} placeholder='Name' onChange={e => setWeight(e.target.value)} />
        <input type='text' value={price} placeholder='Name' onChange={e => setPrice(e.target.value)} />
        <input type='text' value={description} placeholder='Name' onChange={e => setDescription(e.target.value)} />
        <button type='submit'>CREATE</button>
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
