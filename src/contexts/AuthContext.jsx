import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      dispatch({
        type: 'LOGIN',
        payload: {
          token,
          user: JSON.parse(user),
        },
      });
    }
    dispatch({ type: 'SET_LOADING', payload: false });
  }, []);

  const login = async (email, password) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Mock API call - replace with real API
    const mockUsers = [
      { id: 1, email: 'manager@company.com', password: 'manager123', role: 'Manager', name: 'John Manager' },
      { id: 2, email: 'keeper@company.com', password: 'keeper123', role: 'Store Keeper', name: 'Jane Keeper' },
    ];

    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      const token = 'mock-jwt-token-' + user.id;
      const userData = { ...user };
      delete userData.password;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      dispatch({
        type: 'LOGIN',
        payload: { user: userData, token },
      });
      
      dispatch({ type: 'SET_LOADING', payload: false });
      return { success: true };
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
      return { success: false, message: 'Invalid credentials' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};