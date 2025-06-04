import InputMask from "comigo-tech-react-input-mask/lib/react-input-mask.development";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Dropdown, Form } from "semantic-ui-react";
import { estados } from "../constants/Estados";
import { adicionarEndereco } from "../Controller/cliente/ControllerCliente";

export function FormEndereco({idCliente, onEnderecoSalvo}){

    const {state} = useLocation();

        const [rua, setRua] = useState();
        const [numero, setNumero] = useState();
        const [bairro, setBairro] = useState();
        const [cidade, setCidade] = useState();
        const [cep, setCep] = useState();
        const [complemento, setComplemento] = useState();
        const [uf, setUf] = useState();
        const [estadoSelecionado, setEstadoSelecionado] = useState();


    const salvar = async () => {
        let enderecoRequest = {
            rua: rua,
            numero: numero,
            bairro: bairro,
            cidade: cidade,
            cep: cep,
            complemento: complemento,
            uf: uf,
        }
        try{
            console.log(enderecoRequest, state.id)
            await adicionarEndereco(enderecoRequest, state.id);
            alert('Endereco salvo com sucesso');
            if(onEnderecoSalvo)
                onEnderecoSalvo();
            window.location.ref = '/list-cliente';
        } catch ( error ){
            alert('Erro ao salvar cliente');
        }
    }

        return (
            
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
                                    value={cep}
                                    onChange={e=> setCep(e.target.value)}
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
                                        setUf(estados.value)
                                        setEstadoSelecionado(estados.value)
                                    }}
                                />
                            </Form.Input>
                                

                            <Form.Input
                                required
                                fluid
                                label="Cidade"
                                width={5}
                                value={cidade}
                                onChange={e => setCidade(e.target.value)}
                            >
                            </Form.Input>
                            

                            <Form.Input
                                required
                                fluid
                                label="Bairro"
                                width={5}
                                value={bairro}
                                onChange={e => setBairro(e.target.value)}
                            >
                            </Form.Input>

                        </Form.Group>

                        <Form.Group>
                            <Form.Input
                                required
                                fluid
                                label="Rua"
                                width={8}
                                value={rua}
                                onChange={e => setRua(e.target.value)}
                            >    
                            </Form.Input>

                            <Form.Input
                                required
                                fluid
                                label="Numero"
                                width={2}
                                value={numero}
                                onChange={e => setNumero(e.target.value)}
                            >
                            </Form.Input>

                            <Form.Input
                                fluid
                                label="Complemento"
                                placeholder="Opcional"
                                width={6}
                                value={complemento}
                                onChange={e => setComplemento(e.target.value)}
                            >
                            </Form.Input>
                        </Form.Group>
                    </Form.Field>
        
        )
    }