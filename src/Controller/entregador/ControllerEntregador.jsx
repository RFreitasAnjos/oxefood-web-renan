import axios from "axios";

const API_URL = 'http://localhost:8080/api/entregador';

export async function removerEntregador(id) {
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

export async function carregarEntregador() {
    try{
        const response = await axios.get(API_URL);
        return response.data;
    } catch ( error ){
        alert("Erro ao carregar entregadores");
        console.error("Erro ao carregar entregadores: ", error);
        throw error;
    }
   }

export async function salvarEntregador(entregadorRequest) {
    try{
        axios.post(API_URL, entregadorRequest);
    } catch( error ) {
        console.error("Erro ao incluir o Entregador.", error);
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

export async function alterarEntregador(idEntregador){
    try{
        axios.post(`API_URL/${idEntregador}`)
    } catch ( error ) {
        console.error("Erro: ",error)
    }
}