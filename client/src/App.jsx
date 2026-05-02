import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Home, Login, Register } from './pages';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
function App() {
  const { checkAuth, user, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth()
  },[checkAuth])
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={user ? <Home /> : <Navigate to={'/login'} />}
        />
        <Route
          path='/login'
          element={!user ? <Login /> : <Navigate to={'/'} />}
        />
        <Route
          path='/register'
          element={!user ? <Register /> : <Navigate to={'/'} />}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
