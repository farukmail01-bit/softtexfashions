import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('softtex_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(!user);
  const [toast, setToast] = useState(null); // { message, type: 'success' | 'error' | 'info' }

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4000);
  }, []);

  const getApiBase = () => {
    const base = window.__SOFTTEX_BASE_URL__ || window.__SOF値EX_BASE_URL__ || '';
    return base.replace(/\/$/, '');
  };

  const apiFetch = useCallback(async (endpoint, options = {}) => {
    const base = getApiBase();
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${base}${cleanEndpoint}`;

    const headers = {
      'Accept': 'application/json',
      ...(options.headers || {}),
    };

    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include',
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.message || `Request failed with status ${response.status}`);
    }
    return data;
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      const res = await apiFetch('/api/admin/check');
      if (res && res.authenticated && res.user) {
        setUser(res.user);
        localStorage.setItem('softtex_admin_user', JSON.stringify(res.user));
      } else {
        setUser(null);
        localStorage.removeItem('softtex_admin_user');
      }
    } catch {
      // Ignore background check failure
    } finally {
      setIsLoading(false);
    }
  }, [apiFetch]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await apiFetch('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (res.success && res.user) {
        setUser(res.user);
        localStorage.setItem('softtex_admin_user', JSON.stringify(res.user));
        showToast('Logged in successfully! Welcome to Softtex Admin CMS.', 'success');
        return { success: true };
      }
      throw new Error(res.message || 'Login failed');
    } catch (err) {
      showToast(err.message, 'error');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiFetch('/api/admin/logout', { method: 'POST' }).catch(() => {});
    } finally {
      setUser(null);
      localStorage.removeItem('softtex_admin_user');
      showToast('Logged out successfully', 'info');
    }
  };

  return (
    <AdminContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        checkAuth,
        apiFetch,
        showToast,
        toast,
      }}
    >
      {children}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl backdrop-blur-md border animate-bounce-in text-sm font-medium transition-all"
             style={{
               backgroundColor: toast.type === 'error' ? 'rgba(239, 68, 68, 0.95)' : toast.type === 'info' ? 'rgba(59, 130, 246, 0.95)' : 'rgba(16, 185, 129, 0.95)',
               color: '#fff',
               borderColor: 'rgba(255, 255, 255, 0.2)',
             }}>
          <span>{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2 hover:opacity-75 font-bold">✕</button>
        </div>
      )}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
