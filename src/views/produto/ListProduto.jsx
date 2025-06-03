import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Icon, Modal, Table } from 'semantic-ui-react';
import { carregarProduto, removerProduto } from "../../Controller/produto/ControllerProduto";
import MenuSistema from '../menu/MenuSistema';

export default function ListProduto () {

    const [lista, setLista] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState();

   useEffect(() => {
       carregarLista();
   }, [])

   const carregarLista = async () => {
        try{
            const produtos = await carregarProduto()
            setLista(produtos)
        } catch ( error ) {
            alert("Erro ao carregar os produtos");
            console.error("Erro ao carregar os produtos: ", error);
        } 
   }

   const confirmarRemocao = (id) => {
        setIdRemover(id);
        setOpenModal(true);
   }

   return(
    <div>
        <MenuSistema tela={'produto'} />
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
                    <Button
                        label='Nova Categoria'
                        circular
                        color='blue'
                        icon='clipboard'
                        floated='left'
                        as={Link}
                        to='/list-categoria'
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
                        {lista.map(p => {
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
        <Modal
            basic
            onClose={() => setOpenModal(false)}
            onOpen={() => setOpenModal(true)}
            open={openModal}
        >
            <Header icon>
                <Icon name='trash' />
                <div style={{marginTop: '5%'}}> Tem certeza que deseja remover esse registro? </div>
            </Header>
            <Modal.Actions>
                <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                    <Icon name='remove' /> Não
                </Button>
                <Button color='green' inverted onClick={() => removerProduto()}>
                    <Icon name='checkmark' /> Sim
                </Button>
            </Modal.Actions>
        </Modal>
       </div>
   )
}