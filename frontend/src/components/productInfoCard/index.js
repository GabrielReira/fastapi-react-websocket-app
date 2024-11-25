import React from 'react';
import './styles.css';
import { Grid2, Card, CardContent } from '@mui/material';

function ProductInfoCard({ product }) {
  return (
    <Grid2 item size={4}>
      <Card>
        <CardContent>
          <span className='productName'>{product.name}</span> <br />
          €{product.price} <br />
          {product.weight}kg <br />
          {product.description}
        </CardContent>
      </Card>
    </Grid2>
  );
}

export default ProductInfoCard;