import { useState } from "react";
import { Card, ShoeList, CartList } from "./components";

function App() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("shoes")) || []
  );

  const [deletedArr, setDeletedArr] = useState([]);

  const setLocalStorageValue = (listData) => {
    localStorage.setItem("shoes", JSON.stringify(listData));
    setCart(listData);
  };

  const handleAddToCart = (data, id) => {
    if (cart.map((x) => x.id).includes(id)) {
      return;
    }
    const shoe = {
      ...data,
      quantity: 1,
    };
    const listShoe = [...cart, shoe];
    setLocalStorageValue(listShoe);
  };

  const removeItem = (id) => {
    const listShoe = JSON.parse(localStorage.getItem("shoes")) || [];
    const deleteArr = [...deletedArr, id];
    setDeletedArr(deleteArr);
    const newList = listShoe.filter((item) => !deleteArr.includes(item.id));
    setTimeout(() => {
      setDeletedArr(deletedArr.filter((item) => item !== id));
      setLocalStorageValue(newList);
    }, 500);
  };

  const handleChange = (item, qty) => {
    const index = cart.indexOf(item);
    const arr = cart;
    arr[index].quantity += qty;
    if (arr[index].quantity === 0) {
      const deleteArr = [...deletedArr, item.id];
      setDeletedArr(deleteArr);
      const newList = arr.filter((item) => !deleteArr.includes(item.id));

      setTimeout(() => {
        setDeletedArr(deletedArr.filter((item) => item !== item.id));
        setLocalStorageValue(newList);
      }, 500);
    } else {
      setLocalStorageValue([...arr]);
    }
  };

  return (
    <main>
      <Card title="Our Products">
        <ShoeList onAdd={handleAddToCart} cart={cart} />
      </Card>
      <Card title="Your cart" visiblePrice={true} cart={cart}>
        <CartList
          cart={cart}
          onDelete={removeItem}
          onChange={handleChange}
          deletedArr={deletedArr}
        />
      </Card>
    </main>
  );
}

export default App;
