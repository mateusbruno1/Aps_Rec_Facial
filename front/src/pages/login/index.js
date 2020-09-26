import React from 'react';
import Lottie from 'react-lottie';
import scan from '../../assets/lotties/18134-facial-recognition.json';
import medicos from '../../assets/lotties/21474-medical-frontliners.json';
// import * as canvas from 'canvas';
import * as faceapi from 'face-api.js';

function login() {

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
 
  async function camera(){
    const video = document.querySelector("video");
    const videoStream = await navigator.mediaDevices.getUserMedia({video:true});
    videoStream ? video.srcObject = videoStream : alert('Nenhuma camera foi detectada');
  }

  function loadModels(){
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('login/lib/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('login/lib/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('login/lib/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('login/lib/models'),
      faceapi.nets.ageGenderNet.loadFromUri('login/lib/models'),
      faceapi.nets.ssdMobilenetv1.loadFromUri('login/lib/models'),
    ]).then(camera())
   }  


    const loadLabels = () => {
      const labels = ['Mateus Bruno']
      return Promise.all(labels.map(async label => {
          const descriptions = []
          for (let i = 1; i <= 1; i++) {
              const img = await faceapi.fetchImage(`../../lib/face-api/labels/${label}/${i}.png`)
              const detections = await faceapi
                  .detectSingleFace(img)
                  .withFaceLandmarks()
                  .withFaceDescriptor()
              descriptions.push(detections.descriptor)
          }
          return new faceapi.LabeledFaceDescriptors(label, descriptions)
      }))
    }

   async function startvideo ()  {
    alert('entrei')
    const video = document.querySelector("video");
    const canvas = faceapi.createCanvasFromMedia(video)
    const canvasSize = {
        width: video.width,
        height: video.height
    }
    const labels = await loadLabels()
    const content = document.querySelector("#content")
    faceapi.matchDimensions(canvas, canvasSize)
    content.appendChild(canvas)
    setInterval(async () => {
        const detections = await faceapi
            .detectAllFaces(
                video,
                new faceapi.TinyFaceDetectorOptions()
            )
            .withFaceLandmarks()
            .withFaceExpressions()
            .withAgeAndGender()
            .withFaceDescriptors()
        const resizedDetections = faceapi.resizeResults(detections, canvasSize)
        const faceMatcher = new faceapi.FaceMatcher(labels, 0.6)
        const results = resizedDetections.map(d =>
            faceMatcher.findBestMatch(d.descriptor)
        )
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
        resizedDetections.forEach(detection => {
            const { age, gender, genderProbability } = detection
            new faceapi.draw.DrawTextField([
                `${parseInt(age, 10)} years`,
                `${gender} (${parseInt(genderProbability * 100, 10)})`
            ], detection.detection.box.topRight).draw(canvas)
        })
        results.forEach((result, index) => {
            const box = resizedDetections[index].detection.box
            const { label, distance } = result
            new faceapi.draw.DrawTextField([
                `${label} (${parseInt(distance * 100, 10)})`
            ], box.bottomRight).draw(canvas)
        })
    }, 100)
  }

  return (
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
                 <div id="content">
                    <h1>login</h1>
                    <form action="">
                      <input type="text" name="" id="" placeholder="Nome de Usuario" />
                      <input type="password" name="" id="" placeholder="Senha" />
                      <button>Entrar</button>
                      <button>Cadastrar</button>
                    </form>
                    <button id="RecFac" onClick={()=>{loadModels()}}>Reconhecimento Facial</button>
                    <video onin id="can" width="301" height="301px" muted ></video> 
                  </div>

            </div>
  );
}

export default login;