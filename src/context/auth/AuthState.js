import { useSelector } from 'react-redux';

export function AuthState() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const logoutError = useSelector((state) => state.auth.logoutError);
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const loginError = useSelector((state) => state.auth.loginError);
  const checkAuthError = useSelector((state) => state.auth.checkAuthError);

  return {
    isAuthenticated,
    logoutError,
    user,
    isLoading,
    loginError,
    checkAuthError,
  };
}
