import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import api from '../../services/api'

import './styles.css';

import logoImg from '../../imagens/logo.svg'

export default function Profile() {
  const [casos, setCasos] = useState([]);

  const ongId = localStorage.getItem('ongId')
  const ongNome = localStorage.getItem('ongNome')
  
  const history = useHistory();

  useEffect(() => {
    api.get('perfil', {
      headers: {
        Authorization: ongId,
        }
      }).then(response => {
        setCasos(response.data)    
    })
    }, [ongId]);

   async function handleDeletecasos(id) {
     try {
       await api.delete(`ocorrencias/${id}`, {
        headers: {
          Authorization: ongId
        }
       });
       setCasos(casos.filter(casos => casos.id !== id))
     } catch (err) {
       alert('Erro ao deletar caso, tente novamente.')
     };
   }

   function handleLogout() {
    localStorage.clear()

    history.push('/')
   }

  return (
    <div className="profile-conteiner">
      <header>
         <img src={logoImg} alt="Sejam os Heroes" />
         <span>Bem vinda, {ongNome}</span>

         <Link className="button" to="/casos/novo">
                Cadastrar novo caso</Link>
         <button onClick={handleLogout} type="button">
             <FiPower size={18} color="#e02041" />
         </button>
      </header>
      <h1>Casos cadastrados</h1>
      <ul>
        {casos.map(casos => (
        <li key={casos.id}>
          <strong>CASO:</strong>
          <p>{casos.titulo}</p>

          <strong>DESCRIÇÃO:</strong>
          <p>{casos.descricao}</p>

          <strong>VALOR:</strong>
          <p>{Intl.NumberFormat(
            'pt-BR', {style: 'currency', 
          currency: 'BRL'})
          .format(casos.valor)}</p>

          <button onClick={() => handleDeletecasos(casos.id)}
                  type="button">
            <FiTrash2 size={20} color="#a8a8b3" />
          </button>
        </li>)) }
      </ul>

    </div>
  )
}