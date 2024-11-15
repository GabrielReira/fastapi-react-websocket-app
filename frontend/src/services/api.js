const API_URL = 'http://localhost:8000';

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products/`);
    return response.json();
  }
  catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const createProduct = async (product) => {
  try {
    const response = await fetch(`${API_URL}/products/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    return response.json();
  }
  catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const subscribeToWebsocket = (onMessage, onError) => {
  const socket = new WebSocket(`${API_URL.replace('http', 'ws')}/ws`);
  socket.onmessage = (event) => {
    onMessage(JSON.parse(event.data));
  }
  socket.onerror = (error) => {
    onError(error);
  }
  return socket;
};