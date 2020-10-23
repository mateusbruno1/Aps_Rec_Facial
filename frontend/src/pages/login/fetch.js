const faceapi = require('face-api.js');

faceapi.env.monkeyPatch({ 
  createCanvasElement: () => document.createElement('canvas'), 
  createImageElement: () => document.createElement('img') 
})

const loadLabels = () => {
    const labels = ['Andrey Gil']
    labels.map(async label => {
      const descriptions = []
      for (let i = 0; i < labels.length; i++) {
        let imagem = require(`../../face-api/lib/labels/${label}/${i}.png`)
        const img = faceapi.fetchImage(imagem)
        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor()  
        descriptions.push(detections.descriptor)
      }
    })
  }

export default loadLabels;