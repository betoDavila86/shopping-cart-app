import React from 'react';
import { useState } from "react";
import { useQuery } from "react-query";

// Components MUI
import { Drawer, LinearProgress, Grid, Badge } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";

import { Item, Cart } from './Components';

// styles
import { Wrapper, StyledButton } from "./App.styles";

// types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

function App() {
  const [isCartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { isLoading, data, error } = useQuery<CartItemType[]>(
    "products",
    getProducts,
  );

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((acc: number, item) => acc + item.amount, 0);
  const handleAddToCart = (currentItem: CartItemType) => {
    // is item in the cart already?
    setCartItems((prevState) => {
      const isItemInCart = prevState.find(cartItem => cartItem.id === currentItem.id);
      if (isItemInCart) {
        return prevState.map(cartItem =>
          cartItem.id === currentItem.id ?
            { ...cartItem, amount: cartItem.amount + 1 } :
            cartItem);
      }
      // first time item added
      return [...prevState, { ...currentItem, amount: 1 }];
    })
  };
  const handleRemoveFromCart = (id: number) => null;


  const showData = () => {
    if (isLoading) return <LinearProgress />
    if (data) {
      return (
        <Wrapper>
          <Drawer
            anchor="right"
            open={isCartOpen}
            onClose={() => setCartOpen(false)}>
            <Cart
              cartItems={cartItems}
              onAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart}
            />
          </Drawer>
          <StyledButton onClick={() => setCartOpen(true)}>
            <Badge badgeContent={getTotalItems(cartItems)} color="error">
              <AddShoppingCart />
            </Badge>
          </StyledButton>
          <Grid container spacing={3} >
            {data.map(item =>
              <Grid item key={item.id} xs={12} sm={6} md={4}>
                <Item
                  item={item}
                  onAddToCart={handleAddToCart}
                />
              </Grid>)}
          </Grid>
        </Wrapper>
      );
    }
    if (error) return <p>Something went wrong :(</p>
  }

  return (
    <div>
      {showData()}
    </div>
  );
}

export default App;
