import { Container, Grid, Image } from 'semantic-ui-react';
import MenuSistema from '../menu/menuSistema';

export default function Home () {

   return(
       <div>
        <MenuSistema/>
           <div style={{marginTop: '5%'}}>
               <Container>
                   <Grid columns={2} divided>
                       <Grid.Row>
                           <Grid.Column>
                               <Image src='/logo-IFPE.png' size='large' />
                           </Grid.Column>
                           <Grid.Column>
                              
                               Bem vindo ao sistema <strong>OxeFood</strong> ! <br/>
                               Este sistema foi desenvolvido na disciplina de Desenvolvimento para WEB III. <br/> <br/>
                               Para acessar o código da <strong>API</strong> do sistema, acesse: <a href='https://github.com/RFreitas/oxefood-api-renan' target='_blank'> https://github.com/RFreitasAnjos/oxefood-api-renan </a> <br/> <br/>
                               Para acessar o código do <strong>Módulo WEB</strong>, acesse: <a href='https://github.com/RFreitasAnjos/oxefood-web-renan' target='_blank'> https://github.com/RFreitasAnjos/oxefood-web-renan </a>

                           </Grid.Column>
                       </Grid.Row>
                   </Grid>
               </Container>
           </div>
       </div>
   )
}
