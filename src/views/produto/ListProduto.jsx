import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table } from 'semantic-ui-react';
import MenuSistema from '../menu/MenuSistema';

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
                              <Table.HeaderCell>Código</Table.HeaderCell>
                              <Table.HeaderCell>Categoria</Table.HeaderCell>
                              <Table.HeaderCell>Título</Table.HeaderCell>
                              <Table.HeaderCell>Descrição</Table.HeaderCell>
                              <Table.HeaderCell>Valor Unitário</Table.HeaderCell>
                              <Table.HeaderCell>Tempo Mínimo de Entrega</Table.HeaderCell>
                              <Table.HeaderCell>Tempo Máximo de Entrega</Table.HeaderCell>
                              <Table.HeaderCell textAlign='center' width={2}>Ações</Table.HeaderCell>
                          </Table.Row>
                      </Table.Header>
                 
                      <Table.Body>
                        {this.state.listaProdutos.map(p => {
                                  <Table.Row key={p.id}>
                                  <Table.Cell>{p.codigo}</Table.Cell>
                                  <Table.Cell>{p.categoria.descricao}</Table.Cell>
                                  <Table.Cell>{p.titulo}</Table.Cell>
                                  <Table.Cell>{p.descricao}</Table.Cell>
                                  <Table.Cell>{p.valorUnitario}</Table.Cell>
                                  <Table.Cell>{p.tempoEntregaMinimo}</Table.Cell>
                                  <Table.Cell>{p.tempoEntregaMaximo}</Table.Cell>
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
                            })}
                           </Table.Body>
                       </Table>
                   </div>
               </Container>
           </div>

       </div>
   )
}
