import React from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { useState } from 'react';


const Cadastrar = () => {
  
  const [usuario, setUsuario] = useState({
    nome: '',
    telefone: '',
    email: '',
    senha: ''
  })
  const [confirmaSenha, setConfirmaSenha] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    console.log(usuario)
    console.log(confirmaSenha)

  }
  function handleChange(e) {
    const { name, value } = e.target;
    if(name === 'confirmaSenha'){
      setConfirmaSenha(value)
    }
    setUsuario({ ...usuario, [name]: value});
  }
    
  return (
    <Form onSubmit={handleSubmit}>
      <h1 className='text-center mt-2'>Cadastrar</h1>
      <Form.Group className="mb-3" controlId="formBasicNome">
        <Form.Label>Nome:</Form.Label>
        <Form.Control onChange={handleChange} type="text" name='nome' value={usuario.nome} placeholder="Digite o seu nome" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicTelefone">
        <Form.Label>Telefone:</Form.Label>
        <Form.Control type="tel" onChange={handleChange} name='telefone' value={usuario.telefone} placeholder="Digite o seu telefone" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>E-mail:</Form.Label>
        <Form.Control type="email" onChange={handleChange} name='email' value={usuario.email} placeholder="Digite o seu email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Senha:</Form.Label>
        <Form.Control type="password" onChange={handleChange} name='senha' value={usuario.senha} placeholder="Digite a sua senha" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicConfirmSenha">
        <Form.Label>Confirmação de senha:</Form.Label>
        <Form.Control type="password" name='confirmaSenha' value={confirmaSenha} onChange={handleChange} placeholder="Confirme a sua senha" />
      </Form.Group>

      <Container className='d-flex justify-content-center'>
        <Button variant="primary" type="submit">
          Cadastrar
        </Button>
      </Container>
      <p className='text-center mt-2'>Já tem uma conta ? então <Link to={'/login'}>clique aqui</Link> </p>
    </Form>
  );
}
export default Cadastrar;