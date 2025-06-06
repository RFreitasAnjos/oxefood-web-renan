import { useEffect, useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import { removerEndereco } from "../Controller/cliente/ControllerCliente";

export const DetalhesEndereco = ({ enderecos }) => {
  const[lista, setLista] = useState([]);
      
  useEffect(() => {
      setLista(enderecos);
    }, [enderecos]);

  const remover = async (id) => {
    try{
      await removerEndereco(id);
      const novaLista = lista.filter((end) => end.id !== id);
      setLista(novaLista);
    } catch ( error ) {
      alert("Erro ao carregar lista");
      console.error("Erro ao carregar lista:", error);
    }
  }

  return (
    <div>
      <h3>Endereços</h3>
      <hr/>
      {lista.map((end, index) => (
        <div key={index} style={{ marginBottom: '1em', flexDirection:'row'}}>
          <div>
            <p><strong>Rua:</strong> {end.rua}</p>
            <p><strong>Número:</strong> {end.numero}</p>
            <p><strong>Cidade:</strong> {end.cidade}</p>
            <p><strong>Estado:</strong> {end.estado}</p>
          </div>  
          <div>
            <Button
              color="red"
              icon
              onClick={() => remover(end.id)}
            >
              <Icon name="trash"/>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
