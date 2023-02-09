import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './App.css';
import AllRoutes from './pages/AllRoutes';

function App() {

  const isAuth = useSelector((store) => store.AuthReducer.isAuth);
  const nevigate = useNavigate();

  useEffect(() => {
    if(!isAuth) {
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
