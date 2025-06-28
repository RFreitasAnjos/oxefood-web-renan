import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Header, Icon, Modal, Table } from "semantic-ui-react";
import { alterarCategoria, carregarCategorias, removerCategoria, salvarCategoria } from "../../Controller/categoria/ControllerCategoria";
import MenuSistema from "../menu/menuSistema";

export default function ListCategoria() {
    
    const { state } = useLocation();

    const[lista,setLista] = useState([]);
    const[idCategoria,setIdCategoria] = useState(null);
    const[descricao, setDescricao] = useState();
    const[openModal,setOpenModal] = useState(false);


    useEffect(() => {
        carregarLista();
    },[]);

    useEffect( () => {
        if(state != null && state.id != null){
             axios.get("http://localhost:8080/api/categoriaproduto/" + state.id)
            .then((response) => {
                setIdCategoria(response.data.id);
                setDescricao(response.data.descricao);
            }).catch((error) => console.log(error));
        }
    }, [state])
    
    const carregarLista = async () => {
        try{
            const categorias = await carregarCategorias();
            setLista(categorias);
            console.log(categorias);
        } catch ( error ) {
            console.error('Erro ao carregar categorias', error);
        }
    }

    const salvar = async () => {
        let categoriaRequest = {
            descricao: descricao
        }
        try{
            let novaLista;
            if(idCategoria)
                novaLista =await alterarCategoria(idCategoria, categoriaRequest)
            else
                novaLista = await salvarCategoria(categoriaRequest);
            setLista(novaLista);
            setIdCategoria(null);
            setDescricao("");
        } catch ( error ) {
            alert('Erro ao salvar categoria');
        }
    }

    const confirmarRemocao = (id) => {
        setIdCategoria(id);
        setOpenModal(true);
   }

   const remover = async () => {
        try{
            const novaLista = await removerCategoria(idCategoria);
            setLista(novaLista);
            setOpenModal(false);
        } catch ( error ){  
            alert("erro ao remover categoria.", error)
            console.log("Erro: ", error);
        }
   }


    return (
        <div>
            <MenuSistema tela={'categoria'}/>
            <div style={{marginTop: '3%'}}>
                <Container textAlign="justified">
                <h2> Categoria </h2>
                <Divider/>

                <div style={{marginTop: '4%'}}> 
                    <Form>
                        <Form.Group widths={"equal"}>
                            <Form.Input
                                required
                                fluid
                                label='Descricao'
                                maxLength='50'
                                width={4}
                                value={descricao}
                                onChange={e => setDescricao(e.target.value)}
                            />
                        </Form.Group>
                    </Form>

                </div>
                <div>
                    <Button
                        inverted
                        circular
                        icon
                        labelPosition="left"
                        color="blue"
                        floated="right"
                        onClick={() => salvar()}
                        >
                        <Icon name='save'/>
                            {idCategoria ? 'Atualizar' : 'Salvar'}
                    </Button>
                </div>

            <Table color="orange" sortable celled>

                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Código</Table.HeaderCell>
                        <Table.HeaderCell>Descrição</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {lista.map(categoria => (

                        <Table.Row key={categoria.id}>
                            <Table.Cell>{categoria.id}</Table.Cell>
                            <Table.Cell>{categoria.descricao}</Table.Cell>
                            <Table.Cell textAlign="center">
                                
                            <Link to="/list-categoria" state={{id:categoria.id}}>
                                <Button
                                    inverted
                                    circular
                                    color="green"
                                    title='Clique aqui para editar os dados'
                                    icon>
                                        <Icon name='edit'/>
                                </Button>&nbsp;
                            </Link>
                                <Button
                                    inverted
                                    circular
                                    color='red'
                                    title='Clique aqui para remover esta categoria.'
                                    icon
                                    onClick={e => {confirmarRemocao(categoria.id)}}>
                                        <Icon name="trash"></Icon>    
                                </Button>

                            </Table.Cell>
                        </Table.Row>
                    ))}
                        </Table.Body>
                    </Table>
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