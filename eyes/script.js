const eyes = document.querySelectorAll('.eye')
const pupils = document.querySelectorAll('.pupil')
const lightning = document.querySelector('.lightning')
const {innerWidth,innerHeight} = window

window.addEventListener('mousemove', (event) => {
  const {clientX,clientY} = event

  const distanceX = 1 - Math.abs(clientX - innerWidth/2) / (innerWidth / 2)
  const distanceY = 1 - Math.abs(clientY - innerHeight/2) / (innerWidth / 2)
  const opacity = (distanceX + distanceY) / 2

  console.log(distanceX, distanceY)


  eyes.forEach(eye => {
    let x = eye.getBoundingClientRect().left + eye.clientWidth / 2;
    let y = eye.getBoundingClientRect().top + eye.clientHeight / 2;
    let radian = Math.atan2(x, clientY - y);
    let rotate = radian * (180 / Math.PI) * -1 + 270;
    eye.style.transform = `rotate(${rotate/10}deg)`;
  })

  pupils.forEach((pupil) => {
    // get x and y postion of cursor
    var rect = pupil.getBoundingClientRect();
    var x = (clientX - rect.left) / 15;
    var y = (clientY - rect.top) / 15;
    pupil.style.transform = `translate(${x}px, ${y}px)`;
  });

  lightning.style.opacity = opacity

})