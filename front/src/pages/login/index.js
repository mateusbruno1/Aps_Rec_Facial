import React, {Component} from 'react';
import Lottie from 'react-lottie';
import scan from '../../assets/lotties/18134-facial-recognition.json';
import medicos from '../../assets/lotties/21474-medical-frontliners.json';

// import { Container } from './styles';

const scanOptions = {
    loop: true,
    autoplay: true,
    animationData: scan,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

const medicosOptions = {
    loop: true,
    autoplay: true,
    animationData: medicos,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

export default class Login extends Component {
    
    render(){
        return(
            <div>
                <h1>Login</h1>
                <Lottie 
                    options={scanOptions}
                    height={400}
                    width={400}
                />
                <Lottie 
                    options={medicosOptions}
                    height={600}
                    width={600}
                />
            </div>
        )
    }
}