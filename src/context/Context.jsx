import React, { createContext, useReducer, useEffect } from 'react';

const initialState = {
  // user: null,
  token: null,
  isAuthenticated: false,
};


const authReducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_UP':
    case 'SIGN_IN':
      return {
        ...state,
        // user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case 'LOG_OUT':
      return initialState;
    default:
      return state;
  }
};


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() =>{
    const tokenExists = JSON.parse(localStorage.getItem('user'))
    if(tokenExists){
      dispatch({type: 'SIGN_IN', payload: tokenExists})
    }
  },[]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
