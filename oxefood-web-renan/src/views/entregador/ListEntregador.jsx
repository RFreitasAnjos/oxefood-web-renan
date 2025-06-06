import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Icon, Modal, Table } from 'semantic-ui-react';
import { carregarEntregador, removerEntregador } from '../../Controller/entregador/ControllerEntregador';
import { formatarData } from '../../utils/utils';
import MenuSistema from '../menu/menuSistema';

export default function ListEntregador () {

   const [lista, setLista] = useState([]);
   const [openModal, setOpenModal] = useState(false);
   const [idRemover, setIdRemover] = useState();

   useEffect(() => {
       carregarLista();
   }, [])

const carregarLista = async () => {
    try{
        const entregadores = await carregarEntregador();
        setLista(entregadores);
    }   catch ( error ) {
        alert("Erro ao carregar lista");
        console.error("Erro ao carregar lista:", error);
    }
}

const confirmarRemocao = (id) => {
        setIdRemover(id);
        setOpenModal(true);
}
   
const remover = async () => {
        try{
            const novaLista = await removerEntregador(idRemover);
            setLista(novaLista);
            setOpenModal(false);
        } catch ( error ) {
            alert("Erro ao remover cliente");
            console.error("Erro ao remover: ", error);
        }
   }


return(
    <div>
        <MenuSistema tela={'entregador'} />
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
                                            <Link to="/form-entregador" state={{id:entregador.id}} style={{color:'green'}}>
                                               <Icon name='edit' />
                                            </Link>
                                      </Button> &nbsp;
                                      <Button
                                               inverted
                                               circular
                                               color='red'
                                               title='Clique aqui para remover este entregador'
                                               icon
                                               onClick={e => confirmarRemocao(entregador.id)}>
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
                   <Button color='green' inverted onClick={() => remover()}>
                       <Icon name='checkmark' /> Sim
                   </Button>
               </Modal.Actions>
         </Modal>

       </div>
   )
}
