import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table } from 'semantic-ui-react';
import MenuSistema from '../menu/MenuSistema';

export default function ListEntregador () {

   const [lista, setLista] = useState([]);
   const [openModal, setOpenModal] = useState(false);
   const [idRemover, setIdRemover] = useState();

   useEffect(() => {
       carregarLista();
   }, [])

   function carregarLista() {
       axios.get("http://localhost:8080/api/entregador")
       .then((response) => {
           setLista(response.data)
       })
   }
   
   function formatarData(dataParam) {

    if (dataParam === null || dataParam === '' || dataParam === undefined) {
        return ''
    }

    let arrayData = dataParam.split('-');
    return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }
    
return(
    <div>
        <MenuSistema tela={'cliente'} />
        <div style={{marginTop: '3%'}}>

            <Container textAlign='justified' >

                <h2> Entregador </h2>
                <Divider />

                <div style={{marginTop: '4%'}}>
                    <Button
                        label='Novo'
                        circular
                        color='orange'
                        icon='clipboard outline'
                        floated='right'
                        as={Link}
                        to='/form-entregador'
                    />
<br/><br/><br/>
                  
                  <Table color='orange' sortable celled>

                      <Table.Header>
                          <Table.Row>
                              <Table.HeaderCell>Nome</Table.HeaderCell>
                              <Table.HeaderCell>CPF</Table.HeaderCell>
                              <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                              <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                              <Table.HeaderCell>Fone Fixo</Table.HeaderCell>
                              <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                          </Table.Row>
                      </Table.Header>
                 
                      <Table.Body>

                          { lista.map(entregador => (

                              <Table.Row key={entregador.id}>
                                  <Table.Cell>{entregador.nome}</Table.Cell>
                                  <Table.Cell>{entregador.cpf}</Table.Cell>
                                  <Table.Cell>{formatarData(entregador.dataNascimento)}</Table.Cell>
                                  <Table.Cell>{entregador.foneCelular}</Table.Cell>
                                  <Table.Cell>{entregador.foneFixo}</Table.Cell>
                                  <Table.Cell textAlign='center'>

                                      <Button
                                          inverted
                                          circular
                                          color='green'
                                          title='Clique aqui para editar os dados deste entregador'
                                          icon>
                                               <Icon name='edit' />
                                      </Button> &nbsp;
                                      <Button
                                               inverted
                                               circular
                                               color='red'
                                               title='Clique aqui para remover este entregador'
                                               icon>
                                                   <Icon name='trash' />
                                           </Button>

                                       </Table.Cell>
                                   </Table.Row>
                               ))}

                           </Table.Body>
                       </Table>
                   </div>
               </Container>
           </div>

       </div>
   )
}
