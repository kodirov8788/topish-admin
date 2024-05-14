import { createContext, useReducer, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [sensor, setSensor] = useState(false);

  // Retrieve state from localStorage or use default if it doesn't exist
  const initialState = JSON.parse(localStorage.getItem('authState')) || { user: null };
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('authState', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ ...state, dispatch, isLoading, setIsLoading, sensor, setSensor }}
    >
      {children}
    </AuthContext.Provider>
  );
};
