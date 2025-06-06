import axios from 'axios';
import InputMask from 'comigo-tech-react-input-mask';
import { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { Button, Container, Divider, Dropdown, Form, Icon } from 'semantic-ui-react';
import { estados } from '../../constants/Estados';
import { salvarEntregador } from '../../Controller/entregador/ControllerEntregador';
import { formatarData } from '../../utils/utils';

export default function FormEntregador () {

    const { state } = useLocation();
    const [idEntregador, setIdEntregador] = useState(); 
    const [estadoSelecionado, setEstadoSelecionado] = useState();

    const [nome, setNome] = useState();
    const [cpf,setCpf] = useState();
    const [rg,setRg] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [foneCelular, setFoneCelular] = useState();
    const [foneFixo, setFoneFixo] = useState();
    const [enderecoRua, setEnderecoRua] = useState();
    const [enderecoNumero, setEnderecoNumero] = useState();
    const [enderecoBairro, setEnderecoBairro] = useState();
    const [enderecoCidade, setEnderecoCidade] = useState();
    const [enderecoCep, setEnderecoCep] = useState();
    const [enderecoComplemento, setEnderecoComplemento] = useState();
    const [enderecoUf, setEnderecoUf] = useState();

    useEffect(() => {
        if(state != null && state.id != null){
            axios.get("http://localhost:8080/api/entregador/" + state.id)
            .then((response) => {
                setIdEntregador(response.data.id)
                setNome(response.data.nome)
                setCpf(response.data.cpf)
                setRg(response.data.rg)
                setDataNascimento(response.data.dataNascimento)
                setFoneCelular(response.data.foneCelular)
                setFoneFixo(response.data.foneFixo)
                setEnderecoRua(response.data.enderecoRua)
                setEnderecoNumero(response.data.enderecoNumero)
                setEnderecoBairro(response.data.enderecoBairro)
                setEnderecoCidade(response.data.enderecoCidade)
                setEnderecoComplemento(response.data.enderecoComplemento)
                setEnderecoCep(response.data.enderecoUf)
            })
        }
    },[state])

const salvar = async () => {
    let entregadorRequest ={
        nome: nome,
        cpf: cpf,
        rg:rg,
        dataNascimento: dataNascimento,
        foneCelular: foneCelular,
        foneFixo: foneFixo,
        enderecoRua: enderecoRua,
        enderecoNumero: enderecoNumero,
        enderecoBairro: enderecoBairro,
        enderecoCidade: enderecoCidade,
        enderecoCep: enderecoCep,
        enderecoComplemento: enderecoComplemento,
        enderecoUf: enderecoUf,
    }

    try{
        await salvarEntregador(entregadorRequest)
        alert('Entregador criado com sucesso');
        window.location.href = '/list-entregador';
    } catch( error ){
        alert('Erro ao salvar cliente');
    }
}

    return (

        <div>

            <menuSistema tela={'entregador'}/>

            <div style={{marginTop: '3%'}}>

                <Container textAlign='justified' >

                    <h2> <span style={{color: 'darkgray'}}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

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
                                    width={4}
                                    label='CPF'>
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                        value={cpf}
                                        onChange={e => setCpf(e.target.value)}
                                    /> 
                                </Form.Input>
                                <Form.Input
                                    required
                                    fluid
                                    width={4}
                                    label='RG'
                                    value={rg}
                                    onChange={e => setRg(e.target.value)}
                                >
                                </Form.Input>

                            </Form.Group>
                            
                            <Form.Group>

                                <Form.Input
                                    required
                                    fluid
                                    label='Fone Celular'
                                    width={6}>
                                    <InputMask 
                                        mask="(99) 99999.9999"
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
                                    required
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

                            <Form.Field>
                                    <h3><span style={{color: 'darkgray', textDecoration:'underline'}}> Endereço</span></h3>
                                
                                <Form.Group>

                                    

                                    <Form.Input
                                        required
                                        fluid
                                        label="CEP"
                                        width={3}
                                    >
                                        <InputMask
                                            mask="99999-999"
                                            maskChar={null}
                                            placeholder="Ex: 50000-000"
                                            value={enderecoCep}
                                            onChange={e=> setEnderecoCep(e.target.value)}
                                        />
                                    </Form.Input>
                                    
                                    <Form.Input
                                        required
                                        label="UF"
                                        width={3}
                                        >
                                        <Dropdown
                                            fluid
                                            selection
                                            placeholder='UF'
                                            options={estados}
                                            value={estadoSelecionado}
                                            onChange={(e,estados) => {
                                                setEnderecoUf(estados.value)
                                            }}
                                        />
                                    </Form.Input>
                                        

                                    <Form.Input
                                        required
                                        fluid
                                        label="Cidade"
                                        width={5}
                                        value={enderecoCidade}
                                        onChange={e => setEnderecoCidade(e.target.value)}
                                    >
                                    </Form.Input>
                                    

                                    <Form.Input
                                        required
                                        fluid
                                        label="Bairro"
                                        width={5}
                                        value={enderecoBairro}
                                        onChange={e => setEnderecoBairro(e.target.value)}
                                    >
                                    </Form.Input>

                                </Form.Group>

                                <Form.Group>
                                    <Form.Input
                                        required
                                        fluid
                                        label="Rua"
                                        width={8}
                                        value={enderecoRua}
                                        onChange={e => setEnderecoRua(e.target.value)}
                                    >    
                                    </Form.Input>

                                    <Form.Input
                                        required
                                        fluid
                                        label="Numero"
                                        width={2}
                                        value={enderecoNumero}
                                        onChange={e => setEnderecoNumero(e.target.value)}
                                    >
                                    </Form.Input>

                                    <Form.Input
                                        fluid
                                        label="Complemento"
                                        placeholder="Opcional"
                                        width={6}
                                        value={enderecoComplemento}
                                        onChange={e => setEnderecoComplemento(e.target.value)}
                                    >
                                    </Form.Input>
                                </Form.Group>
                            </Form.Field>
                        
                        </Form>
                        
                        <div style={{marginTop: '4%'}}>
                        <Link to={'/list-entregador'}>
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
                                onClick={() => salvar(idEntregador)}
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