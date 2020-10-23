import React, {Component} from 'react';
import { Container } from './styles.js';
import Lottie from 'react-lottie';
import medicos from '../../assets/lotties/21474-medical-frontliners.json';

// import { Container } from './styles';

const medicosOptions = {
    loop: true,
    autoplay: true,
    animationData: medicos,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

export default class Landing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            default: false
        }
    }

    render(){
        return(
            <Container>
                <div className="left">

                    <div className="div-texto">
                        <h1>Sua plataforma de consultas on-line.</h1>
                        <h2>Ajudamos pacientes a se encontrarem com seus médicos sem sair de casa.</h2>
                    </div>

                    <div className="div-botoes">
                        <button className="login">Login</button>
                        <button className="cadastre-se">Cadastre-se</button>
                    </div>
                </div>

                <div className="right">
                    <div className="div-anim">
                        <Lottie 
                            options={medicosOptions}
                            height={600}
                            width={600}
                        />
                    </div>
                </div>
            </Container>
        )
    }
}