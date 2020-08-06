export default (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [newProduct(action.payload), ...state.products],
      };
    case "DELETE_PRODUCT":
      return {
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };
    case "INCREMENT_QUANTITY":
      return {
        products: increment(state.products, action.payload),
      };
    case "DECREMENT_QUANTITY":
      return {
        products: decrement(state.products, action.payload),
      };
    default:
      return state;
  }
};

const newProduct = (product) => {
  product["quantity"] = 1;
  return product;
};

const increment = (oldProducts, id) => {
  const oldProduct = oldProducts.filter((product) => product.id === id);
  let product = oldProduct[0];
  product.quantity += 1;
  oldProducts.splice(oldProducts.indexOf(product), 1, product);
  return oldProducts;
};

const decrement = (oldProducts, id) => {
  const oldProduct = oldProducts.filter((product) => product.id === id);
  let product = oldProduct[0];
  product.quantity -= 1;
  oldProducts.splice(oldProducts.indexOf(product), 1, product);
  return oldProducts;
};
