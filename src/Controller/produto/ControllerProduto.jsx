import axios from "axios";

const API_URL = 'http://localhost:8080/api/produto';

export async function removerProduto(id) {
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

export async function carregarProduto() {
    try{
        const response = await axios.get(API_URL);
        return response.data;
    } catch ( error ){
        alert("Erro ao carregar produtos");
        console.error("Erro ao carregar produtos: ", error);
        throw error;
    }
   }

export async function salvarProdutos(entregadorRequest) {
    try{
        axios.post(API_URL, entregadorRequest);
    } catch( error ) {
        console.error("Erro ao incluir o produtos.", error);
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

export async function alterarProduto(idProduto){
    try{
        axios.post(`API_URL/${idProduto}`)
    } catch ( error ) {
        console.error("Erro: ",error)
    }
}