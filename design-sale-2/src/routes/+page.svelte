<script>
  import { onMount } from 'svelte';
  import { quadOut } from 'svelte/easing';
  import { Spring, Tween } from 'svelte/motion';

  let bg;
  let innerWidth = $state(0);
  let innerHeight = $state(0);

  const mouseX = new Tween(0, { duration: 1000, easing: quadOut });
  const mouseY = new Tween(0, { duration: 1000, easing: quadOut });
  let cursorX = $state(0)
  let cursorY = $state(0)

  let lastTime = performance.now();
  const baseStrength = 1;
  let percentage = $derived(innerWidth > 900 ? .4 : .8)
  const buffer = 2;
  const offset = 1.1;
  const multiplier = 3;
  const objectsNumber = 24;
  let cellSize = $derived(innerWidth*percentage);

  function handleMouseMove(e) {
    if (innerWidth > 600) {
      cursorX = e.clientX;
      cursorY = e.clientY; 
    }
  }

  function loop(now) {
    const dt = now - lastTime;
    lastTime = now;

    const offsetX = cursorX - innerWidth / 2;;
    const offsetY = cursorY - innerHeight / 2;

    const distance = Math.sqrt(offsetX ** 2 + offsetY ** 2);

    const t = Math.min(dt / 1000, 1);
    const eased = quadOut(t);

    const safeRadius = Math.min(innerWidth, innerHeight) * 0.9;
    const falloff = .9;

    let strength = baseStrength;

    if (distance < safeRadius) {
      const normalized = distance / safeRadius;
      strength *= normalized ** falloff; // smoothly reduce strength to 0
    }

    const velocity = {
      x: -offsetX * strength,
      y: -offsetY * strength
    };
    
    mouseX.target = (cursorX + velocity.x * eased)*multiplier;
    mouseY.target = (cursorY + velocity.y * eased)*multiplier;
    if (innerWidth > 600) {
      requestAnimationFrame(loop); 
    } else {
      requestAnimationFrame(verticalLoop);
    }
  }

  function verticalLoop(now) {
    const dt = now - lastTime;
    lastTime = now;

    const scrollSpeed = 30; // pixels per second
    cursorY += (dt / 1000) * scrollSpeed;

    if (cursorY > innerHeight * 2) {
      cursorY = 0;
    }

    mouseY.target = cursorY--;
    mouseX.target = cursorX--;
    if (innerWidth <= 600) {
      requestAnimationFrame(verticalLoop);
    } else {
      requestAnimationFrame(loop);
    }
  }


  function pseudoRandom(x, y) {
    const val = Math.sin(x * 928371 + y * 189231) * 43758.5453;
    return Math.abs(val % 1);
  }

  function getVisibleCells() {
  const cols = Math.ceil(innerWidth / cellSize) + buffer * 2;
  const rows = Math.ceil(innerHeight / cellSize) + buffer * 2;

  const startX = Math.floor(-mouseX.current * offset / cellSize) - buffer;
  const startY = Math.floor(-mouseY.current * offset / cellSize) - buffer;

  const cells = [];

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      const gx = startX + x;
      const gy = startY + y;

      const noise = pseudoRandom(gx, gy);
      const index = Math.floor(noise * objectsNumber) + 1;

      const shift = (gy % 2 === 0) ? 0 : cellSize / 2;

      cells.push({
        src: `/objects/${String(index).padStart(2, '0')}.webp`,
        x: gx * cellSize + shift,
        y: gy * cellSize
      });
    }
  }
  return cells;
}
onMount(() => {
  if (innerWidth > 600) {
    requestAnimationFrame(loop);
  } else {
    requestAnimationFrame(verticalLoop);
  }
})

let startX = $state(0)
let startY = $state(0)
function handleTouchStart(e) {
  const touch = e.touches[0];
  if (touch) {
    startX = touch.clientX;
    startY = touch.clientY;
  }
}

function handleTouchMove(e) {
  const touch = e.touches[0];
  if (touch) {
    const dx = touch.clientX - startX;
    const dy = touch.clientY - startY;

    cursorX += dx*2;
    cursorY += dy*2;

    startX = touch.clientX;
    startY = touch.clientY;
  }
}
</script>

<!-- <svelte:window
  bind:innerHeight
  bind:innerWidth
  onmousemove={(e) => handleMouseMove(e)}
  ontouchstart={(e) => handleTouchStart(e)}
  ontouchmove={(e) => handleTouchMove(e)}
  ontouchend={(e) => handleTouchEnd(e)}
/> -->
<svelte:window
  bind:innerHeight
  bind:innerWidth
  onmousemove={(e) => handleMouseMove(e)}
  ontouchstart={(e) => handleTouchStart(e)}
  ontouchmove={(e) => handleTouchMove(e)}
  ontouchend={(e) => handleTouchEnd(e)}
/>

<section id="std">
  <div>
    <h2 class="text-xs uppercase" style="margin-bottom: .5rem;">Opening times</h2>
    <time class="text-m" datetime="">Fri 6.6 — Mon 9.6<br>10am to 7pm</time>
  </div>
  <div>
    <h2 class="text-xs uppercase" style="margin-bottom: .5rem;">Location</h2>
    <a class="text-m" href="https://maps.app.goo.gl/G7cZVUgH9JzySP3Y7" target="_blank" rel="noopener noreferrer">Spazio Bergognone 26</a>
  </div>
</section>

<div id="bg"
bind:this={bg}
style="background-position: {mouseX.current}px {mouseY.current}px"
>
{#each getVisibleCells() as obj, i (obj.x + ':' + obj.y)}
  <img
    src={obj.src}
    alt=""
    class="object"
    style="transition-delay: {i*10}ms; width: {innerWidth*percentage}px; left: {obj.x + mouseX.current*offset}px; top: {obj.y + mouseY.current*offset}px;"
  />
{/each}
</div>

<style>
#std {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--gutter);
  position: fixed;
  bottom: 0;
  margin-bottom: calc(var(--gutter) * 2);
  width: calc(100% - var(--gutter)*2);
}
#std > div:nth-child(1) {
  grid-column: 1 / span 4;
}
#std > div:nth-child(2) {
  grid-column: 5 / span 9;
}
#bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  background-image: 
    linear-gradient(to right, rgba(0, 0, 0, 0.1) 2px, transparent 2px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 2px, transparent 2px);
  background-size: 10vw 10vw;
  background-repeat: repeat;
  z-index: -2;
  pointer-events: none;
  opacity: 1;
  transition: var(--transition);
  transition-property: opacity, filter;
}
.object {
  position: absolute;
  height: auto;
  pointer-events: none;
  user-select: none;
  filter: brightness(.7);
  mix-blend-mode: multiply;
  opacity: 1;
  transition: var(--transition);
  transition-property: opacity, filter;
}
@media screen and (max-width: 900px) {
  #std {
    margin-bottom: 9rem;
  }
}
@media screen and (max-width: 700px) {
  #bg {
    background-image: 
      linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 2px),
      linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 2px);
    background-size: 30vw 30vw;
  }
  #std {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    row-gap: calc(var(--gutter)*3);
  }
  #std > div:nth-child(1) {
    grid-column: 1 / span 1;
  }
  #std > div:nth-child(2) {
    grid-column: 1 / span 1;
  }
}
</style>