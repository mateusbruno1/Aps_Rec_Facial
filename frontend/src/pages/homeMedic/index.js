import React, {Component} from 'react';
import api from '../../services/api';

// import { Container } from './styles';

export default class HomeMedic extends Component {

  constructor(props) {
    super(props);
    this.state = {
      default: false,
    }
  }

    render(){
        return(
            <div>
                <h1>HomeMedic</h1>
            </div>
        )
    }
}
