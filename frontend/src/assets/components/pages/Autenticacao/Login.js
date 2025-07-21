import React from 'react'


import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
     <Form >
      <h1 className='text-center mt-2'>Login</h1>
      <Form.Group className="mb-3" controlId="formBasicNome">
        <Form.Label>Nome:</Form.Label>
        <Form.Control  type="email" name='email'  placeholder="Digite o seu email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicTelefone">
        <Form.Label>Telefone:</Form.Label>
        <Form.Control type="password"  name='senha' placeholder="Digite a sua senha" />
      </Form.Group>

      <Container className='d-flex justify-content-center'>
        <Button variant="primary" type="submit">
          Entrar
        </Button>
      </Container>
      <p className='text-center mt-2'>Ainda não tem uma conta ? então <Link to={'/cadastrar'}>clique aqui</Link> </p>
    </Form>
  )
}

export default Login