import React, {Component, useRef} from 'react';
import Lottie from 'react-lottie';
import scan from '../../assets/lotties/18134-facial-recognition.json';
import medicos from '../../assets/lotties/21474-medical-frontliners.json';
import * as faceapi from 'face-api.js';
// import { Container } from './styles';
import './styles.css';
// import {} from '../../face-api/lib/labels'
import loadLabels from './fetch';

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

  const videoWidth = 648;
  const videoHeight = 489;
export default class Login extends Component {

  constructor(props) {
    super(props);
    this.webcam = React.createRef();
    this.canvas = React.createRef();
    this.state = {
      initializing: false,
    };
  }

  componentDidMount() {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + '/models';
      this.setState({
        initializing: true
      });
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(this.startVideo());
    }
    loadModels();
  }

  startVideo() {
    const constraints = { audio: false, video: { width: videoWidth, height: videoHeight } };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function(mediaStream) {
        const video = document.querySelector("video");

        video.srcObject = mediaStream;
        video.onloadedmetadata = function(e) {
          video.play();
        };
      })
      .catch(function(err) {
        console.log(err.name + ': ' + err.message);
      })
  }

  handleVideoOnPlay = () => {
    setInterval(async() => {
      if (this.state.initializing) {
        this.setState({
          initializing: false
        });
      }
      this.canvas.current.innerHTML = faceapi.createCanvasFromMedia(this.webcam.current);
      const displaySize = {
        width: videoWidth,
        height: videoHeight
      }
      const labels = await loadLabels();
      faceapi.matchDimensions(this.canvas.current, displaySize);
      const detections = await faceapi.detectAllFaces(this.webcam.current, new faceapi.TinyFaceDetectorOptions).withFaceLandmarks().withFaceExpressions();
      const resizesDetections = faceapi.resizeResults(detections, displaySize);
      this.canvas.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
      faceapi.draw.drawDetections(this.canvas.current, detections);
      faceapi.draw.drawFaceLandmarks(this.canvas.current, detections);
      faceapi.draw.drawFaceExpressions(this.canvas.current, detections);

      console.log(detections);

    }, 1000)
  }

    render(){      
        return(
          <div>
            <span>{this.state.initializing ? 'Iniciando' : 'Pronto'}</span>
            <div className="display-flex justify-content-center">
              <video 
                ref={this.webcam} 
                autoPlay 
                onPlay={this.handleVideoOnPlay}
                />
              <canvas 
                ref={this.canvas} className="position-absolute" />
            </div>
          </div>
            // <div>
            //     <h1>Login</h1>
            //     <Lottie 
            //         options={scanOptions}
            //         height={400}
            //         width={400}
            //     />
            //     <Lottie 
            //         options={medicosOptions}
            //         height={600}
            //         width={600}
            //     />
            //     <div id="content">
            //     <h1>login</h1>
            //     <form action="">
            //       <input type="text" name="text" id="text" placeholder="Nome de Usuario" />
            //       <input type="password" name="pass" id="pass" placeholder="Senha" />
            //       <button>Entrar</button>
            //       <button>Cadastrar</button>
            //     </form>
            //     <button 
            //       id="RecFac"
            //       onClick={() => this.loadModels()}
            //         >Reconhecimento Facial</button>

            //     <video id="video" width="301px" height="301px" muted></video>
            //   </div>
            // </div>
        )
    }
}