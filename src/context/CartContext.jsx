import { createContext, useState, useEffect } from "react";
import { toast } from 'react-hot-toast';

export const CartContext = createContext();

 export const CartProvider = ({ children }) => {

    const [cartOne, setCartOne] = useState(() => {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    });
    const [cartError, setCartError] = useState(false);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartOne));
      }, [cartOne]);

      // const addToCartOne = (productOne) => {

      //   setCartOne((prevCart) => {

      //     if (!Array.isArray(prevCart)) {
      //       return [{ ...productOne, quantity: 1 }];
      //     }

      //     const existingProduct = prevCart.find((item) => item.id === productOne.id);
         
      //     if (existingProduct) {
      //       return prevCart.map((item) =>
      //         item.id === productOne.id ? { ...item, quantity: item.quantity + 0 } : item
      //       );
      //     }
      //     return [...prevCart, { ...productOne, quantity: 1 }];
      //   });
      // };

      const addToCartOne = (productOne) => {
       
        setCartOne((prevCart) => {
          if (!Array.isArray(prevCart)) {
            return [{ ...productOne, quantity: 1, store_id: productOne.store_id }];
          }

          if (prevCart.length > 0 && prevCart[0].store_id !== productOne.store_id) {
            setCartError(true); 
            return prevCart; 
          }

          const existingProduct = prevCart.find((item) => item.id === productOne.id);
          
          if (existingProduct) {
            return prevCart.map((item) =>
              item.id === productOne.id ? { ...item, quantity: item.quantity + 1 } : item
            );
          }
          return [...prevCart, { ...productOne, quantity: 1 }];
        });
      };

    
      

      useEffect(() => {
        if (cartOne.length > 0) {
          const uniqueStores = new Set(cartOne.map((item) => item.store_id));
          if (uniqueStores.size > 0) {
            setCartError(false);
          }
        }
      }, [cartOne]);



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
            cartError,
            setCartError
          }}
        >
          {children}
        </CartContext.Provider>
      );
    };

