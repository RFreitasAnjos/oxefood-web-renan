import axios from "axios";

const API_URL = 'http://localhost:8080/api/cliente';

export async function removerCliente(id) {
    try{
        await axios.delete(`${API_URL}/${id}`);
        // alert('Cliente removido com sucesso');
        // console.log('Cliente removido com sucesso');

        const response = await axios.get(API_URL);
        return response.data;
    } catch ( error ) {
        // alert('Erro ao remover cliente');
        // console.error('Erro ao remover cliente: ', error);
        throw error;
    }
   }

export async function carregarClientes() {
    try{
        const response = await axios.get(API_URL);
        return response.data;
    } catch ( error ){
        alert("Erro ao carregar clientes");
        console.error("Erro ao carregar clientes: ", error);
        throw error;
    }
   }

export function formatarData(dataParam) {
    if (dataParam === null || dataParam === '' || dataParam === undefined) {
        return ''
    }

    let arrayData = dataParam.split('-');
    return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
}

export async function salvarCliente(clienteRequest) {
    try{
        axios.post(API_URL, clienteRequest);
    } catch( error ) {
        console.error("Erro ao incluir o cliente.");
    }
    /*
    axios.post("http://localhost:8080/api/cliente", clienteRequest)
    .then((response) => {
        if(response.data.nome || null )
            alert("Verifique o campo NOME")
        console.log('Cliente cadastrado com sucesso.', response.data)
    })
    .catch((error) => { 
        console.log('Erro ao incluir o cliente.') 
    });
    */
}

export async function alterarCliente(idCliente){
    try{
        axios.post(`API_URL/${idCliente}`)
    } catch ( error ) {
        console.error("Erro: ",error)
    }
}