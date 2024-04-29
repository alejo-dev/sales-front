import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import LoginForm from './Components/LoginForm/LoginForm';
import Nav from './Components/General/Nav';
import ShowProducts from './Components/ShowProducts/ShowProducts';
import ProtectedRoutes from './Components/General/ProtectedRoutes';

function App() {
  return (
    <BrowserRouter>
    <Nav />
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/products" element={<ShowProducts />} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App;
