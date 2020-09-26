export default (state, action) => {
  const cartData = localStorage.getItem("cart");
  var total = 0;
  let totalProducts = state.totalProducts;

  // const { userDetails } = useContext(AuthContext);

  switch (action.type) {
    case "FETCH_CART":
      return {
        ...state,
        products: JSON.parse(cartData),
        total: getTotal(cartData),
      };
    case "ADD_PRODUCT":
      const setNewCart = [newProduct(action.payload), ...state.products];
      localStorage.setItem("cart", JSON.stringify(setNewCart));
      total = getTotal(setNewCart);
      return {
        products: setNewCart,
        total,
        totalProducts: totalProducts + 1,
      };
    case "DELETE_PRODUCT":
      const setCart = deleteProduct(state.products, action.payload);
      localStorage.setItem("cart", JSON.stringify(setCart));
      total = getTotal(setCart);

      return {
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
        total,
        totalProducts: totalProducts - 1,
      };
    case "INCREMENT_QUANTITY":
      let dataAfterIncrement = increment(state.products, action.payload);
      total = getTotal(dataAfterIncrement);
      localStorage.setItem("cart", JSON.stringify(dataAfterIncrement));

      return {
        products: dataAfterIncrement,
        total,
        totalProducts: totalProducts + 1,
      };
    case "DECREMENT_QUANTITY":
      let dataAfterDecrement = decrement(state.products, action.payload);
      total = getTotal(dataAfterDecrement);
      localStorage.setItem("cart", JSON.stringify(dataAfterDecrement));
      return {
        products: dataAfterDecrement,
        total,
        totalProducts: totalProducts - 1,
      };
    case "CLEAR_CART":
      const empty = [];
      localStorage.setItem("cart", JSON.stringify(empty));
      return {
        products: [],
        total: 0,
        totalProducts: 0,
      };
    default:
      return state;
  }
};

const newProduct = (product) => {
  product["quantity"] = 1;
  return product;
};

const deleteProduct = (products, productToBeDeletedId) => {
  const dataAfterDelete = products.filter(
    (product) => product.id !== productToBeDeletedId
  );
  // sessionStorage.setItem("cart", JSON.stringify(dataAfterDelete));
  return dataAfterDelete;
};

const getTotal = (products) => {
  // console.log(products);
  // console.log("LOgged from getTotal");
  const tempTotal = products.reduce((currentTotal, product) => {
    return product.price * product.quantity + currentTotal;
  }, 0);
  console.log(tempTotal);
  console.log("Total from reducer");
  return tempTotal;
};

const increment = (oldProducts, id) => {
  const oldProduct = oldProducts.filter((product) => product.id === id);
  let product = oldProduct[0];
  product.quantity += 1;
  oldProducts.splice(oldProducts.indexOf(product), 1, product);
  // localStorage.setItem("cart", JSON.stringify(oldProducts));
  return oldProducts;
};

const decrement = (oldProducts, id) => {
  const oldProduct = oldProducts.filter((product) => product.id === id);
  let product = oldProduct[0];
  product.quantity -= 1;
  oldProducts.splice(oldProducts.indexOf(product), 1, product);
  // localStorage.setItem("cart", JSON.stringify(oldProducts));
  return oldProducts;
};
