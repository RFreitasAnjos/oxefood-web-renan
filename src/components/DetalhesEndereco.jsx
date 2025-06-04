import { Button, Icon } from "semantic-ui-react";
import { removerEndereco } from '../Controller/cliente/ControllerCliente.jsx';

export const DetalhesEndereco = ({ enderecos }) => {
  return (
    <div>
      <h3>Endereços</h3>
      <hr/>
      {enderecos.map((end, index) => (
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
              onClick={() => removerEndereco(enderecos.id)}
            >
              <Icon name="trash"/>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
