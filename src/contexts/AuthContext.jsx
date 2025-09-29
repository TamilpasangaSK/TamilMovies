import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [premiumUsers, setPremiumUsers] = useState(() => {
    const saved = localStorage.getItem('premiumUsers');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('premiumUsers', JSON.stringify(premiumUsers));
  }, [premiumUsers]);

  const login = (email, password, isAdmin = false) => {
    // Check for admin credentials
    const adminCheck = email === 'admin@tamilmovieshub.com' && password === 'admin123';
    const isPremium = premiumUsers.includes(email);
    
    const userData = {
      email,
      isAdmin: adminCheck || isAdmin,
      isPremium: isPremium,
      name: adminCheck ? 'Admin User' : email.split('@')[0]
    };
    
    setUser(userData);
    return userData;
  };

  const purchasePremium = (email) => {
    if (!premiumUsers.includes(email)) {
      const newPremiumUsers = [...premiumUsers, email];
      setPremiumUsers(newPremiumUsers);
      
      // Update current user if they're logged in
      if (user && user.email === email) {
        setUser({ ...user, isPremium: true });
      }
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, purchasePremium }}>
      {children}
    </AuthContext.Provider>
  );
};