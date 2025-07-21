import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './assets/components/pages/Autenticacao/Login';
import Cadastrar from './assets/components/pages/Autenticacao/Cadastrar';
import Home from './assets/components/pages/Home';
import Menu from './assets/components/Layout/Menu';
import Footer from './assets/components/Layout/Footer';
import Container from 'react-bootstrap/esm/Container';

function App() {
  return (
    <Router>
      <Menu/>
      <Container>
      <Routes>

        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/cadastrar' element={<Cadastrar/>}/>

      </Routes>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;
