const mouthShapes = [
  {
    letters: ['a','e'],
    position: {x:-77, y:-70}
  },
  {
    letters: ['b'],
    position: {x:-1036, y:-70}
  },
  {
    letters: ['d'],
    position: {x:-1511, y:-70}
  },
  {
    letters: ['f'],
    position: {x:-1514, y:-377}
  },
  {
    letters: ['g'],
    position: {x:-77, y:-684}
  },
  {
    letters: ['h'],
    position: {x:-555, y:-684}
  },
  {
    letters: ['i'],
    position: {x:-1036, y:-684}
  },
  {
    letters: ['k','c'],
    position: {x:-1516, y:-684}
  },
  {
    letters: ['l'],
    position: {x:-77, y:-991}
  },
  {
    letters: ['m'],
    position: {x:-558, y:-991}
  },
  {
    letters: ['n'],
    position: {x:-1037, y:-991}
  },
  {
    letters: ['o'],
    position: {x:-78, y:-1291}
  },
  {
    letters: ['p'],
    position: {x:-78, y:-1604}
  },
  {
    letters: ['r'],
    position: {x:-555, y:-1604}
  },
  {
    letters: ['s','x','j'],
    position: {x:-1036, y:-1604}
  },
  {
    letters: ['t'],
    position: {x:-76, y:-1907}
  },
  {
    letters: ['u'],
    position: {x:-1516, y:-1907}
  },
  {
    letters: ['v'],
    position: {x:-76, y:-2210}
  },
  {
    letters: ['w', 'q'],
    position: {x:-76, y:-2210}
  },
  {
    letters: ['y'],
    position: {x:-1035, y:-2210}
  },
  {
    letters: ['z', ' '],
    position: {x:-1516, y:-2210}
  }
]

const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

const mouthElement = document.querySelector('.mouth')
const textInput = document.querySelector('input')
const button = document.querySelector('button')

let audioLoaded = false
const audioFiles = {}
alphabet.forEach(letter => {
  audioFiles[letter] = new Audio(`../tts/sounds/${letter}.wav`)
  audioFiles[letter].playbackRate = .25
})

button.addEventListener('click', handleButtonClick)

function handleButtonClick() {
  const inputArray = textInput.value.toLowerCase().split('').filter(value => alphabet.includes(value))
  let i = 0;
  const interval = setInterval(function() {  
    if (i < inputArray.length) {
      const char = inputArray[i]
      if (alphabet.includes(char)){
        animateMouth(char);
        i++;
      }
    } else {
      animateMouth(' ')
      clearInterval(interval)
    }
  }, 200)
}

function animateMouth(char) {
  const charShape = mouthShapes.find(shape => shape.letters.includes(char))
  const {position} = charShape
  mouthElement.style.backgroundPosition = `${position.x}px ${position.y}px`
  if (audioFiles[char]) {
    audioFiles[char].play()
  }
}