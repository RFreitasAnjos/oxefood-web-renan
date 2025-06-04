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
        const response = await axios.post(`${API_URL}/${idCliente}`)
        return response;
    } catch ( error ) {
        console.error("Erro: ",error)
    }
}

export async function adicionarEndereco(endereco,idCliente){
    console.log(endereco,idCliente)
    try{
        const response = await axios.post(`${API_URL}/endereco/${idCliente}`,endereco)
        return response.status
    } catch ( error ) {
        console.log("Error: ", error);
    }
}

export async function removerEndereco ( endereco, idCliente ){ 
    console.log(endereco, idCliente)
    try{
        const response = await axios.delete(`${API_URL}/endereco/${idCliente}`);
        return response.status;
    } catch ( error ) {
        console.log("Error: ", error);
    }
}