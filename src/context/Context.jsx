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

// Function to send requests with the stored token
// export const useAuthRequest = () => {
//   const { state } = useContext(AuthContext);

//   const sendRequest = async (url, method = 'GET', body = null) => {
//     try {
//       const token = state.token;
//       if (!token) {
//         throw new Error('No authentication token found');
//       }

//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: body ? JSON.stringify(body) : null,
//       });

//       const data = await response.json();
    
//       return data;
//     } catch (error) {
//        return {status:false,message:"Error sending request"}
//     }
//   };

//   return sendRequest;
// };
