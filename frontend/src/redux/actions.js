export const addToCart = (product, quantity) => ({
    type: 'cart/addToCart',
    payload: { product, quantity },
  });
  
  export const removeFromCart = (productId) => ({
    type: 'cart/removeFromCart',
    payload: productId,
  });
  
  export const updateQuantity = (productId, quantity) => ({
    type: 'cart/updateQuantity',
    payload: { productId, quantity },
  });

  export const resetCart = () => ({
    type: 'cart/resetCart',
  });
  