import axios from "axios";

const API_URL = 'http://localhost:8080/api/categoriaproduto';

export async function salvarCategoria(categoriaRequest){
    try{
        await axios.post(API_URL, categoriaRequest);
        const response = await axios.get(API_URL);
        return response.data;
    } catch ( error ){
        console.error('Erro ao incluir Categoria.', error);
        throw error;
    }
}

export async function removerCategoria(id){
    try{
        await axios.delete(`${API_URL}/${id}`);
        const response = await axios.get(API_URL)
        return response.data;
    } catch ( error ){
        console.error('Erro ao excluir a categoria');
    }
}

export async function carregarCategorias(){
    try{
        const response = await axios.get(API_URL);
        return response.data;
    } catch ( error ) {
        alert('Erro ao carregar Categorias');
        console.error("Erro ao carregar categorias: ", error);
        throw error;
    }
}

export async function alterarCategoria(idCategoria, categoriaRequest){
    try{
        await axios.put(`${API_URL}/${idCategoria}`, categoriaRequest)
        const response = await axios.get(API_URL);  
        return response.data;
    } catch ( error ) {
        console.error("Erro: ",error);
        throw error;
    }
}