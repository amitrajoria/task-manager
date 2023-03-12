import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import AllRoutes from './pages/AllRoutes';

function App() {

  const isAuth = useSelector((store) => store.AuthReducer.isAuth);
  const nevigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(!isAuth) {
      if(location.pathname !== '/signup')
        nevigate('/login', {replace : true});
    }
  }, [])
  
  return (
    <div className="App">
      <AllRoutes />
    </div>
  );
}

export default App;
