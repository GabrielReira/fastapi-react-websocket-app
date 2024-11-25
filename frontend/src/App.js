import './App.css';
import React, { useState, useEffect } from 'react';
import CreateProductCard from './components/createProductCard';
import ProductInfoCard from './components/productInfoCard';
import { fetchProducts, createProduct, subscribeToWebsocket } from './services/api';
import { Container, Box, Grid2 } from '@mui/material';

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
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
    <Container className='App'>
      <h1 className='title'>Gabriel's App</h1>
      <CreateProductCard
        name={name}
        setName={setName}
        price={price}
        setPrice={setPrice}
        weight={weight}
        setWeight={setWeight}
        description={description}
        setDescription={setDescription}
        handleSubmit={handleSubmit}
      />
      <Box className='productsListBox'>
        <h2>Products List</h2>
        <Grid2 container spacing={1}>
          {products.map((product, index) => (
            <ProductInfoCard key={index} product={product} />
          ))}
        </Grid2>
      </Box>
    </Container>
  );
}

export default App;