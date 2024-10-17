const {Engine, Runner, Composite, Render, Bodies,Constraint, MouseConstraint} = Matter


function init() {
  const w = window.innerWidth
  const h = window.innerHeight
  const sectionTag = document.querySelector('section.flowers')
  
  // Engine = computation and math
  // Renderer = draws what the engine computes
  const engine = Engine.create({
    gravity: {
      scale: -0.01
    }
  })
  
  const renderer = Render.create({
    element: sectionTag,
    engine: engine,
    options: {
      height: h,
      width: w,
      background: '#00000000',
      wireframes: false,
      pixelRatio: window.devicePixelRatio
    }
  })
  const wallOptions = {
    isStatic: true,
    render: {
      fillStyle: 'green'
    }
  }
  const ground = Bodies.rectangle(w/2, h, w, 50, wallOptions)
  
  const mouseControl = MouseConstraint.create(engine, {
    element: sectionTag,
    constraint: {
      render: {
        // visible: false
      }
    }
  })
  
  Composite.add(engine.world, [
    ground, 
    mouseControl,
    createFlowers()
  ])
  
  function createFlowers(){
    const flowerSprites = ['flower1', 'flower2', 'flower3', 'flower4', 'flower5', 'flower6', 'flower7', 'flower8']
    const flower = Composite.create({ label: 'flowers' });
    const numberOfFlowers = 15
    const distance = w/numberOfFlowers
    for (let i = 0; i < numberOfFlowers; i++) {
      if ( i < numberOfFlowers -1 ) {
        const xPos = (i+1)*distance
        const randomFlower = flowerSprites[Math.floor(Math.random()*flowerSprites.length)]
        const flowerHeight = Math.max(Math.min(Math.random()*h, h*.75), h*.25)
  
        const circle = Bodies.circle(xPos, flowerHeight, 50, {
          render: {
            sprite: {
              texture: `./${randomFlower}.png`,
            } 
          }
        })
        const constraint = Constraint.create(
          { 
            pointA: { x: xPos, y: h }, 
            bodyB: circle,
            stiffness: .05,
            render: {
              type: 'spring',
              strokeStyle: 'limegreen'
            }
          }
        );
        Composite.addBody(flower, circle);
        Composite.addConstraint(flower, constraint);
      }
    }
    return flower
  
  }
  Runner.run(engine)
  Render.run(renderer)
}

init()

