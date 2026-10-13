function addToCart(array, item, quantity) {
  if (quantity < 1) {
    throw new RangeError("Quantity could not be negative or zero value");
  }

  if (item.stock < quantity) {
    throw new RangeError("Quantity could not be greater then stock value");
  }

  const sameItemInCart = array.filter((arrayItem) => arrayItem.id === item.id);
  if (sameItemInCart.length < 1) {
    array.push({ ...item, quantity: quantity });
  } else {
    sameItemInCart[0].quantity += quantity;
  }
  return array;
}

function changeQuantity(cart, id, quantity) {
  if (quantity < 1) {
    throw new RangeError("Quantity could not be negative or zero value");
  }

  const matchedItems = cart.filter((cartItem) => cartItem.id === id);
  if (matchedItems.length > 0) {
    if (matchedItems[0].stock < quantity) {
      throw new RangeError("Quantity could not be greater then stock value");
    }
    matchedItems[0].quantity = quantity;
  }
  return cart; 
}

function removeFromCart(cart, id) {
  return cart.filter((cartItem) => cartItem.id !== id);
}

function calculateCartSubtotal(cart) {
  return cart.reduce((result, current) => result += current.price * current.quantity, 0);
}

function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart);
  const discount = 'SAVE10' === promoCode && subtotal >= 20_000 ? subtotal * 0.1 : 0;
  const delivery = subtotal >= 50_000 ? 0 : 30_000;

  return {
    subtotal: subtotal,
    discount: discount,
    delivery: delivery,
    total: subtotal - discount + delivery,
  };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
