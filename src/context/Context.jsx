import React, { createContext, useReducer, useEffect } from 'react';

const initialState = {
  // user: null,
  token: null,
  isAuthenticated: false,
  user: {},
  cartCount: 0
};

export const setProfileData = (data) => {
  return {
    type: "SET_USER",
    data
  }
}

export const setCartCount = (cart) => {
  return {
    type: "SET_CART_COUNT",
    cart
  }
}

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_UP':
    case 'SIGN_IN':
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
        email: action.payload.email
      };

    case 'SET_CART_COUNT':
      return {
        ...state,
        cartCount: action.cart
      };
    case 'SET_USER':
      return {
        ...state,
        user: { ...state.user, ...action.data }
      };
    case 'LOG_OUT':
      return initialState;
    default:
      return state;
  }
};

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  let contextData;
  try {
    let storedD = JSON.parse(localStorage.getItem('appState'));
    if (storedD.token && storedD.user) {
      contextData = storedD;
    } else {
      throw new Error('No stored data found');
    }
  } catch (err) {
    console.log(err);
    contextData = initialState;
  }

  const [state, dispatch] = useReducer(authReducer, contextData);

  useEffect(() => {
    localStorage.setItem('appState', JSON.stringify(state));
  }, [state]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
