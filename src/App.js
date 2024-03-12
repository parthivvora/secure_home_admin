import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import PrivateRoutes from './Pages/PrivateRoutes';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Security from './Pages/Security';
import User from './Pages/User';
import Visitors from './Pages/Visitors';

function App() {
  const adminToken = sessionStorage.getItem("adminToken")
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={adminToken ? <Dashboard /> : <Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/users' element={<User />} />
          <Route path='/staff' element={<Security />} />
          <Route path='/visitors' element={<Visitors />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
