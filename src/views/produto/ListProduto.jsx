import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table } from 'semantic-ui-react';
import MenuSistema from '../menu/menuSistema';

export default function ListProduto () {

   const [lista, setLista] = useState([]);

   useEffect(() => {
       carregarLista();
   }, [])

   function carregarLista() {

       axios.get("http://localhost:8080/api/produto")
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
}return(
    <div>
        <MenuSistema tela={'cliente'} />
        <div style={{marginTop: '3%'}}>

            <Container textAlign='justified' >

                <h2> Produto </h2>
                <Divider />

                <div style={{marginTop: '4%'}}>
                    <Button
                        label='Novo'
                        circular
                        color='orange'
                        icon='clipboard outline'
                        floated='right'
                        as={Link}
                        to='/form-produto'
                    />
<br/><br/><br/>
                  
                  <Table color='orange' sortable celled>

                      <Table.Header>
                          <Table.Row>
                              <Table.HeaderCell>Produto</Table.HeaderCell>
                              <Table.HeaderCell>Codigo</Table.HeaderCell>
                              <Table.HeaderCell>Data validade</Table.HeaderCell>
                              {/*<Table.HeaderCell>Fone Celular</Table.HeaderCell>*/}
                              {/*<Table.HeaderCell>Fone Fixo</Table.HeaderCell>*/}
                              <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                          </Table.Row>
                      </Table.Header>
                 
                      <Table.Body>

                          { lista.map(Produto => (

                              <Table.Row key={Produto.id}>
                                  <Table.Cell>{Produto.nome}</Table.Cell>
                                  <Table.Cell>{Produto.cpf}</Table.Cell>
                                  <Table.Cell>{formatarData(Produto.dataNascimento)}</Table.Cell>
                                  <Table.Cell>{Produto.foneCelular}</Table.Cell>
                                  <Table.Cell>{Produto.foneFixo}</Table.Cell>
                                  <Table.Cell textAlign='center'>

                                      <Button
                                          inverted
                                          circular
                                          color='green'
                                          title='Clique aqui para editar os dados deste cliente'
                                          icon>
                                               <Icon name='edit' />
                                      </Button> &nbsp;
                                      <Button
                                               inverted
                                               circular
                                               color='red'
                                               title='Clique aqui para remover este cliente'
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
