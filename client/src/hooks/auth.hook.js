import { useState, useCallback, useEffect } from "react";
const storageName = "userData";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((token, userId) => {
    setToken(token);
    setUserId(userId);
    localStorage.setItem(
      storageName,
      JSON.stringify({
        userId,
        token,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem(storageName));
    if (authUser && authUser.token) {
      const { token, userId } = authUser;
      login(token, userId);
    }
    setReady(true);
  }, [login]);

  return { login, logout, userId, token, ready };
};
