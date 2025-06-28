import axios from "axios";

const API_URL = 'http://localhost:8080/api/editora';

export async function adicionarLivro(idEditora, livro){
   try{
      const response = await axios.post (`${API_URL}/livro/${idEditora}`, livro)
      return response.status
   } catch( error ){
      console.error("Error: ", error);
   }
}

export async function removerLivro(id){
   try{
      const response = await axios.delete(`${API_URL}/livro/${id}`);
      return response.status;
   } catch( error ){
      console.error("Error:", error);
   }
}

export async function alterarLivro(idEditora){
   try{
      const response = await axios.post(`${API_URL}/${idEditora}`)
      return response.status;
   } catch( error ){
      console.error("Error: ", error)
   }
}