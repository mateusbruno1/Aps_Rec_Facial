
const video = document.querySelector("video");

async function camera(){
  const videoStream = await navigator.mediaDevices.getUserMedia({video:true});
  video.srcObject = videoStream;
}
const recfac = document.querySelector('#RecFac')


recfac.addEventListener("click", function(event) {
  Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('assets/lib/face-api/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('assets/lib/face-api/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('assets/lib/face-api/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('assets/lib/face-api/models'),
    faceapi.nets.ageGenderNet.loadFromUri('assets/lib/face-api/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('assets/lib/face-api/models'),
  ]).then(camera)
})

const loadLabels = () => {
  const labels = ['Mateus Bruno', 'Andrey Gil']
  return Promise.all(labels.map(async label => {
      const descriptions = []
      for (let i = 1; i <= 1; i++) {
          const img = await faceapi.fetchImage(`assets/lib/face-api/labels/${label}/${i}.png`)
          const detections = await faceapi
              .detectSingleFace(img)
              .withFaceLandmarks()
              .withFaceDescriptor()
          descriptions.push(detections.descriptor)
      }
      return new faceapi.LabeledFaceDescriptors(label, descriptions)
  }))
}

video.addEventListener('play', async () => {
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
          console.log(label);
      })
  }, 100)
})

const btnLogin = document.querySelector('#btnlogin')
btnLogin.addEventListener("click", function(event) {
    async function login(){
        const email = document.querySelector('#user').value
        const password = document.querySelector('#password').value
        try {
            const {data} = await axios.post('http://127.0.0.1:3333/sessions',{
                email,
                password
            });
            
            if (data){ 

                console.log(data);
                const {user,token} = data;
                const {id,medic,provider,name} = user;
              
                window.location= (`http://127.0.0.1:3000/auth?id=${id}&token=${token}&medic=${medic}&provider=${provider}&name=${name}`);   
            }
        } catch (error) {
            alert('Usuario não encontrado')
        }


        console.log(data);
    }
    login();
    
})
const btnCadastrar = document.querySelector('#btncadastrar')
btnCadastrar.addEventListener("click", function(event) {
    window.location= ("http://127.0.0.1:3000/cadastro");

})