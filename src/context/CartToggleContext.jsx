import { createContext, useState, useEffect, useContext } from "react";

export const CartToggleContext = createContext();

export const CartToggleProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

const toggleCart = () => {
 setIsCartOpen(true)
}

 return (
        <CartToggleContext.Provider
          value={{ isCartOpen,
            setIsCartOpen,
            toggleCart
          }}
        >
          {children}
        </CartToggleContext.Provider>
      );

  };
  export const useCartToggle = () => useContext(CartToggleContext);