const faceapi = require('face-api.js');

const loadLabels = () => {
    const labels = ['Andrey Gil']
    labels.map(async label => {
      const descriptions = []
      for (let i = 0; i < labels.length; i++) {
        const img = faceapi.fetchImage(`../../face-api/lib/labels/${label}/${i}.png`)
        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor()  
        descriptions.push(detections.descriptor)
      }
    })
  }

export default loadLabels;