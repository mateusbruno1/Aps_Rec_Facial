import React, {Component} from 'react'
import {Container} from './styles';
import { Bounce } from 'react-activity';
import 'react-activity/lib/Bounce/Bounce.css';

export default class AuthCheck extends Component {

  constructor(props) {
    super(props);
    this.state = {
      default: false
    }
  }

  pegarparametros(){
    let query = window.location.search.slice(1);
    let partes = query.split('&');
    let data = {};
    partes.forEach(function (parte) {
        let chaveValor = parte.split('=');
        let chave = chaveValor[0];
        let valor = chaveValor[1];
        data[chave] = valor;
    });

    console.log(data);
  }

  componentDidMount() {
    setInterval(() => {
      this.pegarparametros();
    }, 2000).then(window.location= (`http://127.0.0.1:3000/home`));
  }

  render(){
    return(
      <Container>
        <div className="div">
          <h1>Carregando</h1>
          <Bounce className="bounce" color="#5d90d0" size={16} speed={1} animating={true} />
        </div>
      </Container>
    )
  }
}
