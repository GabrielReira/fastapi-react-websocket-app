import React from 'react';
import './styles.css';
import { Box, Grid2, TextField, Button } from '@mui/material';

function CreateProductCard({ name, setName, price, setPrice, weight, setWeight, description, setDescription, handleSubmit }) {
  return (
    <Box className='createProductBox' component='form' onSubmit={handleSubmit}>
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
            required
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
      <Box className='addProductBtn'>
        <Button type='submit' variant='contained' fullWidth>
          Add Product
        </Button>
      </Box>
    </Box>
  );
}

export default CreateProductCard;