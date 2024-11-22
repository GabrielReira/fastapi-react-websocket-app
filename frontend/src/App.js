import './App.css';
import React, {useState, useEffect} from 'react';
import { fetchProducts, createProduct, subscribeToWebsocket } from './services/api';
import { Container, Box, Grid2, TextField, Button, Card, CardContent, Grid } from '@mui/material';

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
    <Container>
      <Box className='createProductCard' component='form' onSubmit={handleSubmit}>
        <h2>Create a Product</h2>
        <Grid2 container spacing={1}>
          <Grid2 item size={4}>
            <TextField
              label='Name'
              value={name}
              onChange={e => setName(e.target.value)}
              required
              fullWidth
            />
          </Grid2>
          <Grid2 item size={4}>
            <TextField
              label='Price (€)'
              value={price}
              onChange={e => setPrice(e.target.value)}
              type='number'
              required
              fullWidth
            />
          </Grid2>
          <Grid2 item size={4}>
            <TextField
              label='Weight (kg)'
              value={weight}
              onChange={e => setWeight(e.target.value)}
              type='number'
              fullWidth
            />
          </Grid2>
          <Grid2 item size={12}>
            <TextField
              label='Description'
              value={description}
              onChange={e => setDescription(e.target.value)}
              multiline
              rows={2}
              fullWidth
            />
          </Grid2>
        </Grid2>
        <Grid2 className='addProductBtn'>
          <Button type='submit' variant='contained' fullWidth>
            Add product
          </Button>
        </Grid2>
      </Box>

      <Box className='infoProductCard'>
        <h2>Products List</h2>
        <Grid2 container spacing={1}>
            {products.map((product, index) => (
              <Grid2 item size={4} key={index}>
                <Card>
                  <CardContent>
                    {product.name} <br/>
                    €{product.price} <br/>
                    {product.weight}kg <br/>
                    {product.description}
                  </CardContent>
                </Card>
              </Grid2>
            ))}
        </Grid2>
      </Box>
    </Container>
  );
}

export default App;
