import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css';
import logoImg from '../../imagens/logo.svg'

export default function NewIncident() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');

  const history = useHistory();

  const ongId = localStorage.getItem('ongId')

async function handlenovocaso(e) {
  e.preventDefault();

  const data = {
    titulo,
    descricao,
    valor,
  };

  try {
    await api.post('ocorrencias', data, {
      headers: {
        Authorization: ongId,
      }
    })
     history.push('/perfil')
  } catch (err) {
    alert('Erro ao cadastrar caso, tente novamente.')
  }
}

  return (
    <div className="new-incident-container">
      <div className="content">
         <section>
           <img src={logoImg} alt="Sejam os Heroes"/>

           <h1>Cadastrar novo caso</h1>
           <p>Descreva o caso detalhadamente para encontrar
              um herói para resolver isso
           </p>
           <Link className="back-link" to="/perfil">
             <FiArrowLeft size={16} color="#e02041" />
             Voltar para Home
           </Link>
         </section>
         <form onSubmit={handlenovocaso}>
            <input 
            type="text"
              placeholder="Título do caso"
              value={titulo}
              onChange= {e => setTitulo(e.target.value)}
              />
            <textarea 
            type="text"
              placeholder="Descrição"
              value={descricao}
              onChange= {e => setDescricao(e.target.value)}
            />
           <input 
              type="number"
              placeholder="Valor em reais   $,$$"
              value={valor}
              onChange= {e => setValor(e.target.value)}
              />

            <button className="button" type="submit">Cadastar</button>
         </form>
      </div>
    </div>
  )
}