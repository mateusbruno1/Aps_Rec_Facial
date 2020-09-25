import * as faceapi from 'face-api.js';
import canvas from 'canvas';
// import {} from '../lib/labels/'

export async function loadLabels() {
    const labels = ['Andrey_Gil', 'Mateus_Bruno']
    return Promise.all(labels.map(async label => {
        const descriptions = []
        for (let i = 1; i <= 1; i++) {
            const img = await canvas.loadImage(`../lib/labels/${label}/${i}.png`)
            // const img = await canvas.loadImage('../lib/labels/Andrey_Gil/1.png');
            const detections = await faceapi
                .detectSingleFace(img)
                .withFaceLandmarks()
                .withFaceDescriptor()
            descriptions.push(detections.descriptor)
        }
        return new faceapi.LabeledFaceDescriptors(label, descriptions)
    }))
  }