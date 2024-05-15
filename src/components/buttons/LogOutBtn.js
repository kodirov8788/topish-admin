import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../context/auth/AuthApi';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../../context/auth/AuthSlice';
function LogoutButton() {
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log('isAuthenticated:', isAuthenticated);
  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(clearUser());
      navigate('/login');
    } catch (error) {
      console.log('Logout failed', error);
    }
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleLogout}
      disabled={isLoading}
    >
      {isLoading ? 'Logging out...' : 'Logout'}
    </button>
  );
}

export default LogoutButton;
