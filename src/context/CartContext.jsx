import { createContext, useState, useEffect } from "react";
import { toast } from 'react-hot-toast';

export const CartContext = createContext();

 export const CartProvider = ({ children }) => {

    const [cartOne, setCartOne] = useState(() => {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartOne));
      }, [cartOne]);

      const addToCartOne = (productOne) => {

        

        let isItemAdded = true;
        setCartOne((prevCart) => {

          if (!Array.isArray(prevCart)) {
            return [{ ...productOne, quantity: 1 }];
          }

          const existingProduct = prevCart.find((item) => item.id === productOne.id);
          if(existingProduct){
            let isItemAdded = false;
            // toast.error("Product already in cart");
          }
          if (existingProduct) {
            return prevCart.map((item) =>
              item.id === productOne.id ? { ...item, quantity: item.quantity + 0 } : item
            );
          }
          if(!existingProduct){
            // toast.success("Product added to cart");
          }
          return [...prevCart, { ...productOne, quantity: 1 }];
        });
      };

      const increaseQuantity = (id) => {
        setCartOne((prevCart) =>
          prevCart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          )
        );
      };


      const decreaseQuantity = (id) => {
        setCartOne((prevCart) =>
          prevCart
            .map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0) 
        );
      };


      const removeFromCart = (id) => {
        setCartOne((prevCart) => prevCart.filter((item) => item.id !== id));
      };

      const clearCart = () => {
        setCartOne([]);
      };

      return (
        <CartContext.Provider
          value={{
            cartOne,
            addToCartOne,
            increaseQuantity,
            decreaseQuantity,
            removeFromCart,
            clearCart,
          }}
        >
          {children}
        </CartContext.Provider>
      );
    };

