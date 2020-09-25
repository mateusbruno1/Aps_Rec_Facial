import React, {Component} from 'react';
import Lottie from 'react-lottie';
import scan from '../../assets/lotties/18134-facial-recognition.json';
import medicos from '../../assets/lotties/21474-medical-frontliners.json';
import Webcam from 'react-webcam';
import { loadModels, getFullFaceDescription, createMatcher } from '../../face-api/face';
import { loadLabels } from '../../face-api/descriptors/labels';
import * as faceapi from 'face-api.js';
// import { Container } from './styles';

const WIDTH = 420;
const HEIGHT = 420;
const inputSize = 160;

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

  constructor(props) {
    super(props);
    this.webcam = React.createRef();
    this.state = {
      fullDesc: null,
      detections: null,
      descriptors: null,
      faceMatcher: null,
      match: null,
      facingMode: null
    };
  }

  async componentDidMount() {
    await loadModels();
    const labels = await loadLabels();
    console.log(labels);
    this.setState({ faceMatcher: await createMatcher(labels) });
    this.setInputDevice();
  };

  setInputDevice = () => {
    navigator.mediaDevices.enumerateDevices().then(async devices => {
      let inputDevice = await devices.filter(
        device => device.kind === 'videoinput'
      );
      if (inputDevice.length < 2) {
        await this.setState({
          facingMode: 'user'
        });
      } else {
        await this.setState({
          facingMode: { exact: 'environment' }
        });
      }
      this.startCapture();
    });
  };

  startCapture = () => {
    this.interval = setInterval(() => {
      this.capture();
    }, 1500);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  capture = async () => {
    if (!!this.webcam.current) {
      await getFullFaceDescription(
        this.webcam.current.getScreenshot(),
        inputSize
      ).then(fullDesc => {
        if (!!fullDesc) {
          this.setState({
            detections: fullDesc.map(fd => fd.detection),
            descriptors: fullDesc.map(fd => fd.descriptor)
          });
        }
      });

      if (!!this.state.descriptors && !!this.state.faceMatcher) {
        let match = await this.state.descriptors.map(descriptor =>
          this.state.faceMatcher.findBestMatch(descriptor)
        );
        this.setState({ match });
      }
    }
  };

    render(){      
      const { detections, match, facingMode } = this.state;
    let videoConstraints = null;
    let camera = '';
    if (!!facingMode) {
      videoConstraints = {
        width: WIDTH,
        height: HEIGHT,
        facingMode: facingMode
      };
      if (facingMode === 'user') {
        camera = 'Front';
      } else {
        camera = 'Back';
      }
    }

    let drawBox = null;
    if (!!detections) {
      drawBox = detections.map((detection, i) => {
        let _H = detection.box.height;
        let _W = detection.box.width;
        let _X = detection.box._x;
        let _Y = detection.box._y;
        return (
          <div key={i}>
            <div
              style={{
                position: 'absolute',
                border: 'solid',
                borderColor: 'blue',
                height: _H,
                width: _W,
                transform: `translate(${_X}px,${_Y}px)`
              }}
            >
              {!!match && !!match[i] ? (
                <p
                  style={{
                    backgroundColor: 'blue',
                    border: 'solid',
                    borderColor: 'blue',
                    width: _W,
                    marginTop: 0,
                    color: '#fff',
                    transform: `translate(-3px,${_H}px)`
                  }}
                >
                  {match[i]._label}
                </p>
              ) : null}
            </div>
          </div>
        );
      });
    }
        return(
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
            <div
        className="Camera"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <p>Camera: {camera}</p>
        <div
          style={{
            width: WIDTH,
            height: HEIGHT
          }}
        >
          <div style={{ position: 'relative', width: WIDTH }}>
            {!!videoConstraints ? (
              <div style={{ position: 'absolute' }}>
                <Webcam
                  audio={false}
                  width={WIDTH}
                  height={HEIGHT}
                  ref={this.webcam}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                />
              </div>
            ) : null}
            {!!drawBox ? drawBox : null}
          </div>
        </div>
      </div>
        )
    }
}