import axios from "axios";
import InputMask from 'comigo-tech-react-input-mask';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../menu/menuSistema';

export default function FormLivro () {

    const {state} = useLocation();
    const [idLivro, setIdLivro] = useState();

    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [qtdPaginas,setqtdPaginas] = useState('');
    const [anoLancamento, setAnoLancamento] = useState('');
    const [preco, setPreco] = useState('');
    const [idEditora,setIdEditora] = useState('');
    const [listaEditora, setListaEditora] = useState([]);

    useEffect(() => {
        if(state != null && state.id != null){
            axios.get("http://localhost:8080/api/editora/"+ state.id)
            .then((response) => {
                setTitulo(response.data.titulo)
                setAutor(response.data.autor)
                setqtdPaginas(response.data.qtdPaginas)
                setAnoLancamento(response.data.anoLancamento)
                setPreco(response.data.preco)
                setIdEditora(response.data.idEditora)
            })
        }

        axios.get("http://localhost:8080/api/editora")
        .then((response) => {
            const dropDownEditora = response.data.map( c => ({ text: c.nome, value: c.id}));
            setListaEditora(dropDownEditora);
        })
    },[state])

    function salvar() {
        let livroRequest ={
            idEditora: idEditora,
            titulo: titulo,
            autor: autor,
            preco: parseFloat(preco.replace(',','.')),
            qtdPaginas: qtdPaginas,
            anoLancamento: anoLancamento
        }
        if ( idEditora != null) {
            axios.put("http://localost:8080/api/editora/livro/" + idEditora, livroRequest)
            .then((response) => {
                alert('Livro Alterado com sucesso.')
                console.log('Livro Alterado com sucesso.')
            })
            .catch((error) => {
                alert('Erro ao alterar um Livro.') 
                console.log('Erro ao alterar um Livro.')
            })    
        } else {
            axios.post("http://localhost:8080/api/editora/livro/", livroRequest)
            .then((response) => {
                alert(`livro ${titulo} cadastrado`)
                console.log(`livro ${titulo} cadastrado`)
            })
            .catch((error) =>{
                alert(`Erro ao incluir o livro ${titulo}`)
                console.log(`Erro ao incluir o livro ${titulo}`)
            })
        }
    }

    return (

<div>
            <MenuSistema tela={'livro'} />
            <div style={{ marginTop: '3%' }}>
                <Container textAlign='justified'>
                    { idLivro === undefined &&
                        <h2> <span style={{color: 'darkgray'}}> Livro &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    { idLivro != undefined &&
                        <h2> <span style={{color: 'darkgray'}}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }

                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Form>
                            <Form.Group widths='equal'>
                                
                                <Form.Input
                                    required
                                    fluid
                                    label='Título'
                                    placeholder="Informe o título do produto"
                                    maxLength="100"
                                    value={titulo}
                                    onChange={e => setTitulo(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.TextArea
                                    fluid
                                    label='Descrição'
                                    placeholder='Informe ano de lancamento'
                                    value={anoLancamento}
                                    onChange={e => setAnoLancamento(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Select
                                    required
                                    fluid
                                    tabIndex='3'
                                    placeholder='Selecione'
                                    label='Categoria'
                                    options={listaEditora}
                                    value={idEditora}
                                    onChange={(e,{value}) => {
                                        setIdEditora(value)
                                    }}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Input
                                    required
                                    fluid
                                    label='Valor Unitário'
                                    width={6}
                                >
                                    <InputMask
                                        required
                                        mask="9999,99"
                                        value={preco || ''} 
                                        onChange={e => setPreco(e.target.value)}
                                    />
                                </Form.Input>

                                
                            </Form.Group>
                        </Form>

                        <div style={{ marginTop: '4%' }}>
                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                                onClick={() => window.location.href = '/form-livro'}
                            >
                                <Icon name='reply' />
                                Listar
                            </Button>

                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={salvar}
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
}
