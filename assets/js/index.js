const video = document.querySelector("video");
async function camera(){
  const videoStream = await navigator.mediaDevices.getUserMedia({video:true});
  video.srcObject = videoStream;
}
const recfac = document.querySelector('#RecFac')

recfac.addEventListener("click", function(event) {
  camera();
})


    