import axios from 'axios';
import InputMask from 'comigo-tech-react-input-mask';
import { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import { salvarCliente } from '../../Controller/cliente/ControllerCliente';

export default function FormCliente () {

    const { state } = useLocation();
    const { idCliente, setIdCliente } = useState();
    const { cpfTocado, setCpfTocado} = useState(false);

    const [nome, setNome] = useState();
    const [cpf,setCpf] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [foneCelular, setFoneCelular] = useState();
    const [foneFixo, setFoneFixo] = useState();

    useEffect(() => {
       		if (state != null && state.id != null) {
           		axios.get("http://localhost:8080/api/cliente/" + state.id)
                .then((response) => {
               	    	       setIdCliente(response.data.id)
               	    	       setNome(response.data.nome)
               	    	       setCpf(response.data.cpf)
               	    	       setDataNascimento(response.data.dataNascimento)
               	    	       setFoneCelular(response.data.foneCelular)
               	    	       setFoneFixo(response.data.foneFixo)
           		})
       		}
   	}, [state])

    function formatarData(dataParam) {
        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }

const salvar = async () => {

    if(!nome || nome.trim() === '')
        return alert('O nome é obrigatório');
    if(nome.trim().length < 3)
        return alert('O nome deve ter pelo menos 3 letras');
    if(cpf.trim().length < 14){
        return alert('O CPF está inválido')
    }
    let clienteRequest ={
        nome: nome,
        cpf: cpf,
        dataNascimento: dataNascimento,
        foneCelular: foneCelular,
        foneFixo: foneFixo
    }
    try{
        await salvarCliente(clienteRequest)
        alert('Cliente salvo com sucesso');
        window.location.href = '/list-cliente';
    } catch ( error ) {
        alert('Erro ao salvar cliente');    
    }
}  

    return (

        <div>

            <menuSistema tela={'cliente'}/>

            <div style={{marginTop: '3%'}}>

                <Container textAlign='justified' >

                    { idCliente === undefined &&
                    <h2> <span style={{color: 'darkgray'}}> Cliente &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    { idCliente != undefined &&
                    <h2> <span style={{color: 'darkgray'}}> Cliente &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }


                    <Divider />

                    <div style={{marginTop: '4%'}}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    value={nome}
                                    label='Nome'
                                    maxLength="100"
                                    onChange={e => setNome(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='CPF'
                                    >
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                        value={cpf}
                                        onChange={(e) => {
                                            setCpf(e.target.value);
                                    }}         
                                    />
                                </Form.Input>

                            </Form.Group>
                            
                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Fone Celular'
                                    width={6}>
                                    <InputMask 
                                        mask="(99) 9 9999.9999"
                                        value={foneCelular}
                                        onChange={e => setFoneCelular(e.target.value)}
                                    /> 
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Fone Fixo'
                                    width={6}>
                                    <InputMask 
                                        mask="(99) 9999.9999"
                                        value={foneFixo}
                                        onChange={e => setFoneFixo(e.target.value)}
                                    /> 
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Data Nascimento'
                                    width={6}
                                >
                                    <InputMask 
                                        mask="99/99/9999" 
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        value={formatarData(dataNascimento)}
                                        onChange={e=> setDataNascimento(e.target.value)}
                                    /> 
                                </Form.Input>

                            </Form.Group>
                        
                        </Form>
                        
                        <div style={{marginTop: '4%'}}>
                        <Link to={'/list-cliente'}>
                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                            >
                                <Icon name='reply' />
                                Voltar
                            </Button>
                        </Link>        
                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={() => salvar(idCliente)}
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
