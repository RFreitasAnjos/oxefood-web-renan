import axios from 'axios';
import InputMask from 'comigo-tech-react-input-mask';
import { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import { FormEndereco } from '../../../oxefood-web-renan/src/components/FormEndereco';
import { salvarCliente } from '../../../oxefood-web-renan/src/Controller/cliente/ControllerCliente';
import { formatarData } from '../../../oxefood-web-renan/src/utils/utils';

export default function FormCliente () {

    const { state } = useLocation();
    const[idCliente, setIdCliente] = useState();
    //const[cpfTocado, setCpfTocado] = useState(false);
    const[mostraForm, setMostraForm] = useState(false);

    const [nome, setNome] = useState();
    const [cpf,setCpf] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [foneCelular, setFoneCelular] = useState();
    const [foneFixo, setFoneFixo] = useState();
    //const[enderecos, setEnderecos] = useState();


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

const salvar = async () => {
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

// const adicionarEndereco = (novoEndereco) => {
//     setEnderecos([...enderecos, novoEndereco]);
//     setMostraForm(false);
// }

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

                            <Form.Group>
                                
                            </Form.Group>
                            
                            <Form.Group widths={'equal'}>
                                {idCliente != undefined && (
                                    <FormEndereco idCliente={idCliente} />
                                )}
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
