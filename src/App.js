import { Segment } from 'semantic-ui-react';
import './App.css';


import './App.css';
import FormCliente from './views/cliente/FormCliente';
import Rotas from './Routes';

function App() {
  return (
    <div className="App">
      
      <Rotas/>

    <div style={{marginTop: '6%'}}>
      <Segment vertical color='grey' size='tiny' textAlign='center'>
        &copy; 2025 - Projeto WEB III - IFPE Jaboatão dos Guararapes
      </Segment>
    </div>

  </div>

  );
}

export default App;
