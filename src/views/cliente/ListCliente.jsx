import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Icon, Modal, Table } from 'semantic-ui-react';
import { DetalhesEndereco } from "../../components/DetalhesEndereco";
import { carregarClientes, removerCliente } from '../../Controller/cliente/ControllerCliente';
import { formatarData } from "../../utils/utils";
import MenuSistema from '../menu/MenuSistema';

export default function ListCliente () {

    const [lista, setLista] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState();
    const [enderecoCliente, setEnderecoCliente] = useState();
    const [mostrarEndereco, setMostrarEndereco] = useState(false);
    const [clienteSelecionados, setClienteSelecionados] = useState();
    const [openModalEndereco, setOpenModalEndereco] = useState(false);

   useEffect(() => {
       carregarLista();
   }, []);

   const carregarLista = async () => {
        try{
            const clientes = await carregarClientes();
            setLista(clientes);
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
            const novaLista = await removerCliente(idRemover);
            setLista(novaLista);
            setOpenModal(false);
        } catch ( error ) {
            alert("Erro ao remover cliente");
            console.error("Erro ao remover: ", error);
        }
   }

   const mostrarEnderecos = (id) => {
        const clienteSelecionado = lista.find(c => c.id === id);    
    if( clienteSelecionado ){
        setEnderecoCliente(clienteSelecionado.enderecos || [])
        setMostrarEndereco(true);
    }   
   }

   const removerEndereco = async () => {
        try{
            const novaLista = await removerEndereco(idRemover);
            setLista(novaLista);
            setOpenModalEndereco(false);
        } catch ( error ) {
            alert("Erro ao remover endereco");
            console.log("Erro ao remover: ", error)
        }
   }

return(
    <div>
        <MenuSistema tela={'cliente'} />
        <div style={{marginTop: '3%'}}>

            <Container textAlign='justified' >

                <h2> Cliente </h2>
                <Divider />

                <div style={{marginTop: '4%'}}>
                    <Button
                        label='Novo'
                        circular
                        color='orange'
                        icon='clipboard outline'
                        floated='right'
                        as={Link}
                        to='/form-cliente'
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


                          { lista.map(cliente => (

                              <Table.Row key={cliente.id}>
                                  <Table.Cell>{cliente.nome}</Table.Cell>
                                  <Table.Cell>{cliente.cpf}</Table.Cell>
                                  <Table.Cell>{formatarData(cliente.dataNascimento)}</Table.Cell>
                                  <Table.Cell>{cliente.foneCelular}</Table.Cell>
                                  <Table.Cell>{cliente.foneFixo}</Table.Cell>
                                  <Table.Cell width={3} textAlign='center'>
                                    
                                    <Button
                                        inverted
                                        circular
                                        color="yellow"
                                        title='Clique para visualizar os enderecos adicionados'
                                        icon
                                        onClick={() => mostrarEnderecos(cliente.id)}>        
                                        <Icon name="dropdown"/>        
                                    </Button> &nbsp;                               
                                      <Link to="/form-cliente" state={{id:cliente.id}} style={{color:'green'}}>
                                            <Button
                                            inverted
                                            circular
                                            color='green'
                                            title='Clique aqui para editar os dados deste cliente'
                                            icon>
                                               <Icon name='edit' />
                                            </Button> &nbsp;
                                        </Link>
                                      <Button
                                               inverted
                                               circular
                                               color='red'
                                               title='Clique aqui para remover este cliente'
                                               icon
                                               onClick={e => confirmarRemocao(cliente.id)}>
                                                   <Icon name='trash' />
                                           </Button>

                                       </Table.Cell>
                                   </Table.Row>
                               ))}



                           </Table.Body>
                       </Table>
                   </div>
               </Container>
               <div>
                 <Container>
                    <div>
                        { mostrarEndereco &&(
                            <DetalhesEndereco enderecos={enderecoCliente}>
                               
                            </DetalhesEndereco>
                        )}
                    </div>
                 </Container>
               </div>
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
