export default (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [newProduct(action.payload), ...state.products],
      };
    case "REMOVE_PRODUCT":
      return state.products.filter((product) => product.id !== action.payload);
    default:
      return state;
  }
};

const newProduct = (product) => {
  product["quantity"] = 1;
  return product;
};
