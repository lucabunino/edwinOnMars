<script>
import '../app.css'
const { data, children } = $props()

// Import from svelte/lib
import { page } from '$app/stores';
import { onMount } from 'svelte';
import { onNavigate } from '$app/navigation';

// Import stores
import { getCanvas } from '$lib/stores/canvas.svelte.js';
const canvaser = getCanvas();

// Variables
let innerHeight = $state()
let innerWidth = $state()
let scrollY = $state()
let canvasImgBlob = $state();
let drawingSaved = $state(false);
let ctaHeight = $state();
let loaded = $state(false);
let drawable = $state(false)
let drawn = $state(false)

// Grid (not needed in production)
let viewGrid = $state(false)
function handleKey({key}) {if (key === 'G') {viewGrid = !viewGrid}}

let canvas = $state();
let context = $state();
let drawing = $state(false);
let thickness = $state(5);

onMount(() => {
  loaded = true
});
$effect(() => {
  if (drawable) {
      setupCanvas();
      // context = canvas.getContext("2d");
      // context.fillStyle = data.color2;
      // context.fillRect(0, 0, canvas.width, canvas.height);
  }
  if ($page.url.pathname !== '/') {
    drawable = false
  }
});

const setupCanvas = () => {
  // Fix for retina screens
  const scale = window.devicePixelRatio || 1;
  canvas.width = innerWidth * scale;
  canvas.height = innerHeight * scale;
  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;
  
  context = canvas.getContext("2d");
  context.scale(scale, scale); // Scale to match CSS pixels
  context.fillStyle = data.color2;
  context.fillRect(0, 0, canvas.width / scale, canvas.height / scale);
};

const startDrawing = () => {
  drawn = true
  drawing = true;
  context.beginPath();
};

const stopDrawing = () => {
    drawing = false;
    context.closePath();
};

const resetDrawing = () => {
  drawn = false;
  drawingSaved = false;
  if (context) {
    setupCanvas(); // Reset the canvas with proper scaling
    drawing = false;
  }
};

const draw = (event) => {
  if (!drawing) return;

  const rect = canvas.getBoundingClientRect();
  const x = event instanceof MouseEvent
      ? event.clientX - rect.left
      : event.touches[0].clientX - rect.left;
  const y = event instanceof MouseEvent
      ? event.clientY - rect.top
      : event.touches[0].clientY - rect.top;

  context.lineWidth = thickness;
  context.lineCap = "round";
  context.strokeStyle = data.color1;

  context.lineTo(x, y);
  context.stroke();
  context.beginPath();
  context.moveTo(x, y);
};

const generateBlob = async (canvas) => {
  return new Promise((resolve) => {
    const originalWidth = canvas.width;
    const originalHeight = canvas.height;
    
    // Determine the longest side and set scale for 3000px
    const maxDimension = 4000;
    const scaleFactor = originalWidth > originalHeight 
      ? maxDimension / originalWidth 
      : maxDimension / originalHeight;

    const exportWidth = originalWidth * scaleFactor;
    const exportHeight = originalHeight * scaleFactor;

    // Create an offscreen canvas with the new scaled dimensions
    const offscreenCanvas = document.createElement("canvas");
    offscreenCanvas.width = exportWidth;
    offscreenCanvas.height = exportHeight;
    const offscreenContext = offscreenCanvas.getContext("2d");

    // Draw and scale the original canvas content onto the offscreen canvas
    offscreenContext.drawImage(canvas, 0, 0, exportWidth, exportHeight);

    // Generate the blob from the offscreen canvas
    offscreenCanvas.toBlob(async (blob) => {
      canvasImgBlob = blob;
      const arrayBuffer = await blob.arrayBuffer();
      resolve(blob);
    }, 'image/png');
  });
};


</script>

<svelte:head>
  {#if data.color1 === '#FFFBC1' && data.color2 === '#BA5826'}
    <link rel="icon" type="image/png" href="/favicon1/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="/favicon1/favicon.svg" />
    <link rel="shortcut icon" href="/favicon1/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon1/apple-touch-icon.png" />
    <meta name="apple-mobile-web-app-title" content="Edwin on Mars" />
    <link rel="manifest" href="/favicon1/site.webmanifest" />
  {/if}
  {#if data.color1 === '#10069F' && data.color2 === '#FFFBC1'}
    <link rel="icon" type="image/png" href="/favicon2/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="/favicon2/favicon.svg" />
    <link rel="shortcut icon" href="/favicon2/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon2/apple-touch-icon.png" />
    <meta name="apple-mobile-web-app-title" content="Edwin on Mars" />
    <link rel="manifest" href="/favicon2/site.webmanifest" />
  {/if}
  {#if data.color1 === '#FFFBC1' && data.color2 === '#10069F'}
    <link rel="icon" type="image/png" href="/favicon3/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="/favicon3/favicon.svg" />
    <link rel="shortcut icon" href="/favicon3/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon3/apple-touch-icon.png" />
    <meta name="apple-mobile-web-app-title" content="Edwin on Mars" />
    <link rel="manifest" href="/favicon3/site.webmanifest" />
  {/if}

  <title>Edwin on Mars | 20th Century Design Sale</title>
  <meta name="description" content="Edwin On Mars è una realtà multiforme che vuole far riscoprire il vero valore delle cose e invitare le persone a circondarsi di cose belle, nella concezione etica ed estetica del termine.">
  <link rel="canonical" href={$page.url}>
  <meta name="robots" content="index,follow">
  <meta name="googlebot" content="index,follow">
  <meta property="og:title" content="Edwin on Mars | 20th Century Design Sale">
  <meta property="og:description" content="Edwin On Mars è una realtà multiforme che vuole far riscoprire il vero valore delle cose e invitare le persone a circondarsi di cose belle, nella concezione etica ed estetica del termine.">
  <meta property="og:url" content={$page.url}>
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Edwin on Mars | 20th Century Design Sale">
  
  <meta property="og:image" content="/seo.webp">
  <meta property="og:image:width" content="300">
  <meta property="og:image:height" content="300">
</svelte:head>

<svelte:window onkeyup={handleKey} bind:scrollY bind:innerHeight bind:innerWidth></svelte:window>

{#if $page.url.host !== 'www.edwinonmars.com'}
  {#if viewGrid}
    <div id="layout" style="pointer-events:none;display: grid;position:fixed; z-index:999;width: -moz-available;width: -webkit-fill-available;height: -moz-available;height: -webkit-fill-available;grid-template-columns: repeat(12, 1fr);margin:var(--gutter);gap:var(--gutter);opacity:.2;"><div style="background-color:red"></div><div style="background-color:red"></div><div style="background-color:red"></div><div style="background-color:red"></div><div style="background-color:red"></div><div style="background-color:red"></div><div style="background-color:red"></div><div style="background-color:red"></div><div style="background-color:red"></div><div style="background-color:red"></div><div style="background-color:red"></div><div style="background-color:red"></div></div>
    <style>@media only screen and (max-width: 800px) {#layout {grid-template-columns: repeat(6, 1fr) !important} #layout>div:nth-child(even) {display:none}}</style>
  {/if}
{/if}

<div class="bg text-s"
style="--color1: {data.color1};--color2: {data.color2};"
class:inverted={$page.url.pathname !== '/'}
>
  {#if !drawable && $page.url.pathname === '/'}
    <img class="object" class:invisible={!loaded} src={innerWidth > 900 ? data.imgDesktop : data.imgMobile} alt="Immagine dell'evento" style="{innerWidth > 900 ? data.imgStyleDesktop : data.imgStyleMobile}">
  {/if}
  {#if !drawable}
    <header>
      <a href="/">
        <h1 class="text-m">
          <span>Edwin</span>
          <span>on Mars</span>
        </h1>
        <h2 class="text-l">20<sup>th</sup> Centu<span style="letter-spacing: 0;">r</span>y Design Sale</h2>
      </a>
      <nav>
        <a class="btn" class:active={$page.url.pathname === '/info'} href="/info">Info</a>
        {#if $page.url.pathname !== '/'}<a class="btn" href="/">Esci</a>{/if}
      </nav>
    </header>
  {/if}

  <main>
    <!-- {#if $page.url.pathname === '/' || $page.url.pathname === '/info'}
      <div class="rsvp-container">
        <a class="rsvp btn active" class:invisible={!loaded} href="/rsvp" class:inverted={$page.url.pathname === '/info'} class:info={$page.url.pathname === '/info'} class:draw={drawable} style="top: {innerWidth < 901 ? innerHeight - ctaHeight - 70 : ''}px; display:{innerWidth < 901 && $page.url.pathname === '/' && !drawable ? 'none' : ''}"
        onclick={async () => {
          if (drawn) {
            canvasImgBlob = await generateBlob(canvas);
            canvaser.updateCanvas(canvasImgBlob);
            drawingSaved = true
            drawable = false
            setTimeout(() => {
              drawingSaved = false
            }, 5000);
          }
        }}>RSVP</a>
      </div>
    {/if} -->
    {#if $page.url.pathname === '/'}
      {#if !drawable}
        <div class="homepage">
          <div>
            <h3 class="text-m">Fri 29.11&thinsp;—&thinsp;Sun 1.12</h3>
            <h3 class="text-m">Viale Ortles 88/A, Milano</h3>
          </div>
          <a class="rsvp btn active" class:invisible={!loaded} href="/rsvp" class:info={$page.url.pathname === '/info'} class:draw={drawable}
          style="top: unset; display:{innerWidth > 900 && $page.url.pathname === '/' ? 'none' : 'none'}">RSVP</a>
          <div bind:clientHeight={ctaHeight}>
            <p class="text-xs desktop-only">Vuoi disegnare tu? Clicca qui sotto e entra nella modalità disegno. Tieni premuto per unire i puntini. Una volta completato, potrai scaricare il tuo disegno.</p>
            <p class="text-xs mobile-only">Puoi disegnare anche tu un oggetto! Unisci i puntini e rispondi all'RSVP per riceverlo.</p>
            <button class="btn btn-mobile" onclick={() => drawable = true}>Disegna</button>
          </div>
        </div>
      {/if}
      {#if drawable}
        <div class="drawing">
          <div class="drawing-buttons top">
            <button class="btn" onclick={() => drawable = false}>Esci</button>
          </div>
          <div class="drawing-buttons bottom">
            <button class="btn" onclick={resetDrawing} ontouchstart={resetDrawing}>Ricomincia</button>
            {#if drawn}
            <!-- <button class="btn" onclick={async () => {
              if (drawn) {
                canvasImgBlob = await generateBlob(canvas);
                canvaser.updateCanvas(canvasImgBlob);
                drawingSaved = true
                setTimeout(() => {
                  drawingSaved = false
                }, 5000);
              }
            }}> -->
            <button class="btn" onclick={async () => {
              if (drawn) {
                const canvasImgBlob = await generateBlob(canvas);
                canvaser.updateCanvas(canvasImgBlob);
                drawingSaved = true;
            
                // Create a download link
                const url = URL.createObjectURL(canvasImgBlob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "drawing.png"; // Filename
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            
                // Revoke object URL after a short delay to free memory
                setTimeout(() => {
                  URL.revokeObjectURL(url);
                  drawingSaved = false;
                }, 5000);
              }
            }}>
              {#if !canvaser.canvas}
              Scarica
              {:else}
              Scarica
              {/if}
            </button>
            {/if}
            <!-- {#if drawingSaved}
              <p class="alert btn">Disegno salvato. Vai all'RSVP!<br>Per ricominciare il disegno, clicca su “ricomincia”. Puoi salvare una nuova versione cliccando su “sovrascrivi”.</p>
            {/if} -->
            <!-- <div class="controls">
              <label>
                  Spessore:
                  <input type="range" min="1" max="20" bind:value={thickness} />
              </label>
            </div> -->
          </div>
        </div>
      {/if}
    {:else}
      {@render children()}
    {/if}
  </main>
  {#if drawable}
    <img class="drawing-dots" src={innerWidth > 900 ? data.drawingDots : data.drawingDotsMobile} alt="Unisci i puntini">
    <canvas
      class:hidden={$page.url.pathname !== '/'}
      class="canvas"
      bind:this={canvas}
      onmousedown={startDrawing}
      onmouseup={stopDrawing}
      onmousemove={draw}
      ontouchstart={startDrawing}
      ontouchend={stopDrawing}
      ontouchmove={draw}>
    </canvas>
  {/if}

  {#if !drawable}
    <footer class:inverted={$page.url.pathname === '/'} class="text-xs">
      <div>
        <svg class:inverted={$page.url.pathname !== '/'} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1521.726 251.47">
          <path d="M497.987 64.38c-.2.5-.36.9-.46 1.16-4.78 12.82-7.81 22.62-11.01 33-2.77 8.95-5.63 18.2-9.73 29.6-4.54 12.65-21.57 65.9-27.75 85.35-.77 2.44-4.36 8.28-6.52 9.02-.23.08-.7.17-1.68.17-4.4 0-13.42-1.77-14.29-2.24-1.2-1.33-2.29-5.9-2.12-8.04.32-4.16 4.5-14.61 8.18-23.83 2.26-5.63 4.39-10.96 5.25-13.92 3.39-11.73 7.02-23.38 10.54-34.65 7.71-24.75 15-48.14 20.34-73.1 2.96-13.82 13.89-26.4 22.94-26.4 4.18 0 7.62 2.76 9.95 7.98 1.44 3.24-2.25 12.44-3.64 15.9Zm-58.69-31.72c-2.52-2.59-6.16-4.02-10.25-4.02-4.02 0-7.82 1.45-9.95 3.79-1.36 1.5-1.96 3.25-1.77 5.19.17 1.75 1.09 3.42 2.06 5.2 1.43 2.59 3.04 5.53 2.65 9.39-.98 9.75-13.38 43.51-18.14 54.26-.57 1.29-1.42 3.24-2.46 5.64-10.21 23.52-20.11 45.62-23.42 47.97-1.74 1.24-3.12 1.84-4.24 1.84-.77 0-2.6-.34-2.76-3.44-.56-19.33 3-36.79 6.77-55.27 1.09-5.3 2.21-10.79 3.22-16.3.49-2.71 1.63-7.18 2.94-12.36 3.19-12.54 8.52-33.52 5.84-36.82-4.15-4.09-7.97-6.07-11.68-6.07-7.39 0-13.42 8.13-19.24 16-.57.77-1.14 1.53-1.7 2.29-19.78 26.4-34.87 55.16-49.47 82.98-10.68 20.37-21.73 41.42-34.45 61.17-.26.41-.62.99-1.04 1.68-4.4 7.2-6.1 9.28-7.56 9.28-.42 0-.8-.17-1.07-.5-.55-.65-.62-1.84-.24-4.12l4.02-21.46c1.24-7.35 4.28-18.06 9.27-32.73l17.65-52.14 25.82-75.53c1.26-3.57 1-7.42-.72-10.58-2.71-4.98-6-7.5-9.76-7.5V0h-.01v.5c-4.38 0-9.47 3.34-14.71 9.65-9.43 11.38-16.92 29.7-15.41 37.7.24 1.28.92 2.32 1.64 3.43 1.1 1.69 2.35 3.61 2.06 6.54-1.31 12.98-10.64 35.64-19.66 57.56-6.19 15.04-12.04 29.25-14.97 39.51-3.45 12.05-14.23 52.81-8.19 71.33 1.97 6.04 9.47 10.65 15.23 11.17.34.03.69.04 1.03.04 10.49 0 21.12-14.43 28.16-23.98 1.19-1.62 2.31-3.15 3.34-4.48l63.69-111.23a2 2 0 0 1 1.75-1.02c1.06 0 1.94.79 2.03 1.85.73 8.26-1.09 19.46-3.03 31.31-3.56 21.82-7.6 46.56 4.7 55.87 3.84 2.9 7.9 4.37 12.07 4.37 7.67 0 15.91-4.84 24.5-14.38 8.28-9.22 20.25-33.44 31.23-63.23 10.63-28.82 17.71-55.71 18.04-68.52.13-4.8-1.16-8.61-3.81-11.33Zm-195.2 48.01c.02 17.52-4.99 34.12-7.98 42.46-9.07 25.28-51.04 86.31-71.29 103.66l-.98.84c-3.58 3.09-6.16 5.32-8.81 5.32-2.01 0-4.28-1.28-7.15-4.04-2.14-2.04-10.54-17.53-11.25-20.28-2.96-11.39 21.43-100.31 27.18-116.62 1.63-4.64 3.05-9.05 4.41-13.31 1.67-5.23 3.26-10.17 5.2-15.42.77-2.1 1.55-5.57 2.45-9.59 2-8.88 5.01-22.29 9.42-23.79 1.46-.5 2.79-.74 4.06-.74 3.13 0 5.34 1.5 7.68 3.08 1.79 1.22 3.65 2.48 5.95 3.03 3.5.83 6.48.98 9.37 1.12 5.62.27 10.48.5 17.15 6.08 9.66 8.08 14.57 20.93 14.59 38.2Zm-24.7-15.62c-.87-1.87-2.01-3.93-4.45-4.75-.83-.36-1.77-.55-2.8-.55-6.08 0-14.33 6.53-17.23 10.18-6.48 8.16-22.62 65.18-25.45 77.56-1.68 7.32-2.72 14.95-3.73 22.33-.91 6.66-1.85 13.55-3.25 20.16l-.58 2.68 2.17-1.69c12.91-10.08 30.41-34.22 42.57-58.69 8.5-17.11 21.46-48.59 12.75-67.23Zm431.56-33.44c-3.37-3.37-6.63-5.08-9.69-5.08-13.51 0-21.33 32.71-23.89 43.45-1.11 4.64-2.19 9.23-3.26 13.77-6.13 26.1-11.92 50.74-21.43 76.75-8.56 23.4-13.62 32.94-17.48 32.94-.67 0-1.28-.27-1.81-.82-3.41-3.52-3.34-19.39-2.99-31.01.37-12.25 1.46-25.17 2.62-38.84 2.2-26.05 4.48-52.97 1.59-76.14-1.04-8.36-5.12-12.97-11.5-12.97-7.63 0-16.35 6.53-19.85 14.87-3 7.14-6.68 16.19-10.95 26.66-13.97 34.33-33.1 81.34-43.36 97.77-.71 1.14-1.74 2.67-2.93 4.45-7.28 10.91-22.44 33.6-18.81 45.52.9 2.95 2.85 5.01 5.97 6.3 1.47.6 2.88.91 4.21.91 7.55 0 11.73-10.07 14.5-16.73.79-1.89 1.47-3.52 2.12-4.71 21.11-38.72 36.21-69.25 50.92-110.7.1-.29.23-.71.38-1.2 1.21-3.93 2.37-7.17 4.27-7.17 1.84 0 1.99 3.07 2 7.09 0 .63 0 1.17.02 1.48.43 5.72-.54 17.5-1.66 31.15-1.53 18.81-3.28 40.12-2.28 54.61 1.51 22.05 12.03 37.45 25.59 37.45 8.98 0 18.21-6.86 26-19.32 6.65-10.63 16.91-39.79 20.31-50.13 4.74-14.45 8.23-29.6 11.61-44.25 5.28-22.92 10.75-46.62 21.12-68.18 1.28-2.66.74-5.84-1.34-7.92ZM63.031 91.982c3.154-6.51 14.904-24.265 13.582-29.944-.336-1.446-2.538-2.967-2.538-3.214-.007-3.409 43.698-11.682 49.27-12.08 5.833-.418 15.66-.663 21.28.106 7.01.958 9.414 6.552 16.495.518 5.487-4.674 7.643-16.748-.974-18.836-25.511-6.183-89.064 9.23-114.65 18.92-11.96 4.531-32.455 10.678-27.63 26.096 4.097 13.09 25.166.847 29.87-1.047.395-.159.801.186.68.595-1.738 5.89-9.79 28.217-11.551 32.57-.69 1.703-4.586 14.994-5.683 15.79-4.106 2.978-15.906 1.355-21.742 3.956-9.06 4.039-9.263 16.167-.168 20.801 5.609 2.858 7.985-1.073 13.37.9C17.703 166.41-3.143 195.38.403 214.817c3.282 17.995 21.193 13.425 34.767 10.278 32.38-7.509 64.137-24.183 94.192-37.81 6.118-7.416 2.71-17.291-7.368-16.695-3.558.21-16.723 9.514-21.267 11.645-25.651 12.03-52.361 20.2-80.95 21.094 4.598-21.391 13.973-41.788 21.736-62.318 8.287-2.703 16.878-4.752 25.376-6.741 9.355-2.19 49.28-8.31 53.614-12.048 7.892-6.806.814-12.644-7.144-13.577l-62.159 10.684c-1.078-1.03 10.316-24.223 11.83-27.347Zm1359.396 72.378c-.03 2.09-.67 9.05-7.51 10.85-6.89 1.8-17.64 2.83-29.49 2.83-18.69 0-35.43-2.56-43.68-6.69-3.85-1.93-6.89-4.82-9.82-7.6-3.64-3.46-7.07-6.72-11.87-8.24l-.87-.28-.35.84c-3.34 7.9-7.53 15.25-11.59 22.37-3.48 6.11-6.77 11.89-9.6 18.01-1.26 2.74-3.63 9.91-6.15 17.51-3.1 9.36-7.34 22.17-8.63 23.46-1.26.74-3.19 1.15-5.44 1.15-4.96 0-11.46-2.09-13.31-5.47-2.49-4.54 1.82-20.12 3.9-27.61.29-1.05.54-1.98.75-2.77 11.08-41.51 26.87-93.14 50.91-124.24 2.94-3.81 6.82-7.41 10.57-10.89 3.56-3.3 6.93-6.43 9.35-9.57 2-2.6 4.11-7.03 6.56-12.17 5.04-10.57 11.31-23.73 18.46-23.73h.32c2.59.15 4.86 1.83 7.26 3.61 2.63 1.95 5.35 3.97 8.73 3.97 4.45-.02 8.78-1.82 13.36-3.73 4.72-1.96 9.61-3.99 14.72-3.99.19 0 .38 0 .57.01 10.57.31 22.04 8.55 22.27 20.33.5 25.01-27.8 51.07-52.77 74.06-11.87 10.93-23.08 21.26-29.86 30.33l-.28.38.1.45c1.34 5.82 23.93 7.85 24.16 7.86 1.09.09 2.32.13 3.63.13 5.09 0 11.17-.64 17.05-1.26 5.65-.6 11.49-1.22 16.18-1.22 2.97 0 5.23.24 6.92.74 3.18.94 5.53 5.48 5.45 10.57Zm-62.43-61.04c11.04-9.72 22.47-19.77 32.2-30.99.22-.25.48-.55.79-.9 8.79-10.03 18.37-22.13 14.3-26.69-.3-.34-.75-.51-1.35-.51-3.16 0-14.52 5.44-24.38 10.82-4.71 2.57-20.24 11.26-22.34 15.09l-.02.04-.01.03-24.2 53.53-2.29 5.06 3.92-3.95c7.39-7.47 15.52-14.62 23.38-21.53ZM947.137 31.4c-3.37-3.37-6.63-5.08-9.69-5.08-13.51 0-21.32 32.71-23.89 43.46-1.11 4.63-2.18 9.22-3.25 13.76-6.13 26.1-11.93 50.74-21.44 76.75-8.56 23.4-13.62 32.95-17.47 32.95-.67 0-1.28-.28-1.81-.83-3.42-3.52-3.35-19.38-3-31.01.37-12.25 1.47-25.17 2.62-38.84 2.21-26.04 4.49-52.97 1.6-76.14-1.04-8.36-5.13-12.97-11.5-12.97-7.64 0-16.36 6.53-19.86 14.87-3 7.14-6.68 16.19-10.94 26.66-13.97 34.33-33.1 81.34-43.37 97.77-.71 1.14-1.73 2.68-2.92 4.46-7.29 10.9-22.44 33.59-18.82 45.51.9 2.95 2.85 5.01 5.98 6.3 1.46.6 2.88.91 4.2.91 7.55 0 11.74-10.07 14.51-16.73.78-1.88 1.46-3.52 2.11-4.71 21.12-38.72 36.22-69.24 50.92-110.7.1-.29.23-.71.39-1.2 1.21-3.92 2.36-7.17 4.27-7.17 1.84 0 1.99 3.07 1.99 7.09 0 .63 0 1.17.03 1.48.42 5.72-.54 17.51-1.66 31.15-1.54 18.81-3.28 40.12-2.29 54.62 1.51 22.04 12.04 37.44 25.6 37.44 8.98 0 18.21-6.86 26-19.32 6.65-10.63 16.91-39.79 20.3-50.13 4.74-14.45 8.24-29.59 11.61-44.24 5.29-22.93 10.75-46.63 21.13-68.19 1.28-2.65.74-5.84-1.35-7.92Zm309.96 103.68c-3.35 11.57-6.51 22.49-8.38 30.88-.65 2.91-1.29 7.7-2.02 13.25-1.5 11.43-3.77 28.69-7.15 31.09-1.85 1.31-3.96 1.98-6.26 1.98-4.61 0-9.75-2.73-13.2-6.99l9.77-52.68.07-.41-.24-.35c-.41-.57-1.26-1.13-6.65-1.13-8.33 0-25.92 1.62-29.07 3.94-1.19.88-4.53 7.89-11.86 23.68-4.47 9.6-9.08 19.54-11 22.66-.28.46-.55.91-.82 1.35-3.33 5.47-5.96 9.79-10.2 9.79-2.06 0-4.46-1-7.32-3.05-8.38-5.98-5.35-11.35-1.17-18.78l.53-.94c1.09-1.94 2.54-4.36 4.07-6.92 4.61-7.68 10.34-17.23 12.23-23.65 1.15-3.92.34-6.63-.38-9.01-.43-1.47-.85-2.86-.83-4.48.06-7.01 2.94-8.39 6.59-10.14 2.04-.99 4.37-2.1 6.31-4.34 5.51-6.36 11.64-19.07 18.13-32.53 6.07-12.58 12.34-25.59 18.43-34.01 4.52-6.25 25.84-31.9 30.98-35.11 3.7-2.31 7.54-3.53 11.11-3.53 6.96 0 12.13 4.49 14.18 12.31 5.84 22.18-6.19 63.73-15.85 97.12Zm-6.49-74.25-2.24 2c-12.15 10.81-38.47 49.33-40.71 64.2-.25 1.61-.37 2.81.3 3.58.52.61 1.28.68 1.81.68.49 0 1.06-.07 1.94-.19l1.32-.17c18.88-2.53 23.32-3.63 24.18-4.52l.2-.21.06-.29 12.55-62.14.59-2.94Zm223.508-7.44c-11.392 24.35-14.155 45.434 3.162 67.682 6.595 8.472 19.245 12.953 15.224 25.392-2.56 7.918-32.04 32.919-40.065 38.709-10.813 7.801-20.028 14.881-33.32 17.17-5.372.924-9.684-4.835-12.11 6.058-2.591 11.643 2.083 19.147 14.376 18.596 25.751-1.155 87.748-51.661 95.77-76.074 8.949-27.232-27.543-43.876-27.854-60.027-.179-9.323 7.603-29.753 12.667-37.924 3.657-5.9 7.927-6.525 11.327-10.885 2.123-2.724 8.727-16.67 8.424-19.835-.832-8.691-16.047-13.484-23.687-6.516-4.13 3.767-21 31.426-23.914 37.654ZM770.532 164.073c12.699-29.28 31.972-86.987 20.327-117.563-4.58-12.024-11.498-8.877-19.656-13.597-6.213-3.596-7.215-11.048-17.213-8.84-3.495.773-21.904 18.99-23.866 22.71-4.152 7.869-.137 10.523-1.347 17.192-3.379 18.63-22.218 52.673-29.076 73.303-6.101 18.352-13.512 47.375-11.913 66.423 1.94 23.125 24.964 25.594 42.673 14.653 11.877-7.338 31.304-34.069 40.07-54.281Zm5.185-83.895c-1.403 26.75-16.417 68.341-30.128 89.566-3.455 5.348-18.728 29.372-25.88 32.606-11.53 5.212-14.272-5.31-13.301-14.587.955-9.131 7.411-33.242 10.234-42.89 7.318-25.009 15.604-51.083 30.348-75.96 4.24-5.275 9.234-15.588 16.341-15.6 17.377-.028 12.732 20.264 12.386 26.865Zm407.35-51.268c-1.63-5.26-8.12-9.29-13.16-9.75-.28-.03-.56-.04-.85-.04-5.23 0-12.72 4.12-22.25 12.24-7.45 6.36-14.69 13.99-18.62 18.6-11.27 13.21-25.64 33.11-42.7 59.13-1.49 2.29-7.23 12.78-14.5 26.07-11.67 21.33-27.65 50.54-32.3 56.92-.09.12-.19.25-.28.38-.35.5-1.17 1.65-1.5 1.65 0 0-.09-.06-.21-.36 0 0-.28-.94-.28-2.22 0-.43.03-.9.12-1.39 1.5-8.5 12.91-43.5 20.46-66.66 3.07-9.44 5.5-16.9 6.1-19.02 5.13-18.26 11.79-38.86 20.94-64.83l.03-.08-.01-.09c-.09-4.4-9.04-10.95-14.96-10.95-1.6 0-2.9.47-3.87 1.38l-.03.03-.03.04c-23.73 32.26-44.3 66.11-66.81 103.83-3.58 5.98-7.31 12.1-10.92 18.02-9.33 15.29-18.98 31.1-27.34 46.99l-1.08 2.06c-5.28 10.02-16.27 30.85-17.93 38.38-.77 3.53-.28 6.52 1.44 8.65 1.88 2.35 5.08 3.58 9.25 3.58.36 0 .72-.01 1.08-.02 3.48-.18 11.84-8.98 13.64-11.78 1.6-2.52 2.3-5.96 2.98-9.28.48-2.36.98-4.8 1.79-6.79 8.05-19.77 22.93-45.54 36.42-68.13.51-.85 2.18-3.76 4.71-8.17 10.71-18.66 43.32-75.46 46.31-76.87.12-.02.26-.04.38-.04s.22.03.25.06c.2.29-.27 1.52-.5 2.11-.16.43-.31.83-.38 1.15-2.17 8.61-10.87 31.31-19.29 53.25-8.34 21.74-16.96 44.21-19.14 52.8-1.24 4.9-5.02 19.83-4.53 24.55.91 8.68 8.05 15.23 16.63 15.23 1.11 0 2.25-.11 3.37-.33 11.76-2.28 21.65-20.47 28.86-33.75 1.58-2.9 3.07-5.64 4.36-7.8 2.31-3.86 4.6-7.69 6.87-11.5 17.78-29.81 34.59-57.97 56.24-86.26.84-1.1 1.91-2.8 3.15-4.76 3.71-5.9 9.32-14.82 15.82-18.63 1.46-.82 2.93-1.27 4.15-1.27.69 0 1.62.15 2.15.85.45.6.52 1.51.2 2.65l-55.46 140.74c-.57 1.44-.6 3.03-.1 4.48l.36 1.06c1.92 5.59 6.98 9.44 12.88 9.81l1.54.1c.08 0 .17.01.25.01 2.16 0 3.92-1.71 4-3.9.27-7.11 2.47-12.27 4.8-17.73l.59-1.39c13.16-31.17 26.99-66.06 42.29-106.68.42-1.11.92-2.41 1.47-3.85 5.68-14.83 16.26-42.42 13.15-52.48Z"/>
        </svg>
        <p style="margin-top: 1.1em;"><a target="_blank" href="https://www.instagram.com/edwinonmars/">@edwinonmars</a></p>
        <p><a href="mailto:info@edwinonmars.com">info@edwinonmars.com</a></p>
        <p>T. <a href="tel:+39 339 4729946">+39 339 4729946</a></p>
        <p style="margin-top: 2.2em;">P. IVA 01824020190</p>
      </div>
      <div>
        <p>Founder & Producer: Vera Salvaderi</p>
        <p>Co-Founder: David Di Segni</p>
        <p>Art Director: Pietro Vitali</p>
        <p>Visual Merchandiser: Carlos Valencia</p>
        <p>Art Curator: Cecilia Gaetarelli</p>
        <p>Graphic design & Development: <a href="https://giuliabenedetti.eu/" target="_blank">Giulia Benedetti <sup>↗</sup></a>, <a href="https://lucabunino.com/" target="_blank">Luca Bunino <sup>↗</sup></a></p>
        <p>PR: <a href="https://www.gcagency.it/" target="_blank">GC Agency <sup>↗</sup></a></p>
        <p>Illustrazioni: Giulia Baraldi, Silvia Cannella, Paola Carta</p>
        <p>Video Content Creator: <a href="https://www.instagram.com/_federicovega_?igsh=dTM3Z3ZrMTcwYno3" target="_blank">Federico Vega <sup>↗</sup></a></p>
      </div>
      <div>
        <div>
          <p><a href="/terms">Termini e condizioni</a></p>
          <p><a href="/privacy">Privacy Policy</a></p>
        </div>
        <p>©2024 Edwin on Mars</p>
      </div>
    </footer>
  {/if}
</div>


<style>
/* Global */
:global(.text-xs) {
  font-size: .9rem;
  font-weight: 500;
  letter-spacing: -0.005em;
  line-height: 1.15;
}
:global(.text-s) {
  font-size: 1.3rem;
  font-weight: 500;
  letter-spacing: -0.005em;
}
:global(.text-m) {
  font-size: 2.6rem;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.04em;
}
:global(.text-l) {
  font-size: 7.25rem;
  line-height: .8;
  font-weight: 360;
  letter-spacing: -0.06em;
}
:global(.btn) {
  font-size: 1.5rem;
  letter-spacing: -0.02em;
  padding: .3em 1em;
  border-radius: 3em;
  color: var(--color1);
  background-color: var(--color2);
  border: solid 2px var(--color1);
  pointer-events: all;
}
:global(.btn.active) {
  color: var(--color2);
  background-color: var(--color1);
  border: solid 2px var(--color1);
}
:global(.inverted .btn) {
  color: var(--color2);
  background-color: var(--color1);
  border: solid 2px var(--color2);
}
:global(.inverted .btn.active) {
  color: var(--color1);
  background-color: var(--color2);
  border: solid 2px var(--color2);
}
:global(.invisible) {
  visibility: hidden;
}
sup {
  font-size: .5em;
  font-weight: 700;
}
@media screen and (min-width: 600px) {
  :global(.btn:hover) {
    color: var(--color2);
    background-color: var(--color1);
    border: solid 2px var(--color1);
  }
  :global(.inverted .btn:hover) {
    color: var(--color1);
    background-color: var(--color2);
    border: solid 2px var(--color2);
  }
}
@media screen and (min-width: 1400px) {
  :global(.text-l) {
    font-size: 9.666666vw;
  }
  main {
    min-height: calc(100vh - 9.666666vw*0.8 - 2.6rem - 5rem - 2.1rem*1.1 - 8px) !important;
    min-height: calc(100svh - 9.666666vw*0.8 - 2.6rem - 5rem - 2.1rem*1.1 - 8px) !important;
  }
}
@media screen and (max-width: 900px) {
  :global(.text-xs) {
    font-size: 1.4rem;
  }
  :global(.text-s) {
    font-size: 1.4rem;
  }
  :global(.text-m) {
    font-size: 2.6rem;
  }
  :global(.text-l) {
    font-size: 18vw;
  }
  :global(.btn) {
    font-size: 2.2rem;
  }
  :global(.btn-mobile) {
    border-color: var(--color2);
  }
}

/* Layout */
.bg {
  color: var(--color1);
  background-color: var(--color2);
}
.inverted {
  color: var(--color2);
  background-color: var(--color1);
}
header {
  position: relative;
  width: 100%;
  padding: var(--gutter);
}
h1 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  width: 100%;
}
h2 {
  padding: calc(var(--gutter)*1.5) 0;
  -moz-text-align-last: justify;
  text-align-last: justify;
  text-align: justify;
}
nav {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  gap: .3em;
}
.homepage {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  position: absolute;
  height: calc(100% - var(--gutter)*2 - 5px);
}
.object {
  display: block;
  position: absolute;
}
.homepage>div:nth-child(1) {
  margin-top: calc(20vh - 5vw);
}
.homepage>div:nth-child(3) {
  max-width: 500px;
}
.homepage>div:nth-child(3) button {
  margin: var(--gutter) 0;
}
.drawing {
  position: relative;
  height: calc(100vh - var(--gutter)*2);
  pointer-events: none;
}
.drawing-buttons {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  gap: .3em;
  z-index: 3;
  position: relative;
}
.drawing-buttons.top {
  top: 0;
}
.drawing-buttons.bottom {
  position: absolute;
  bottom: calc(var(--gutter) + 4px);
}
.drawing-dots {
  display: block;
  position: absolute;
  top: 0;
  z-index: 1;
  width: 100dvw;
  height: 100svh;
  -o-object-fit: contain;
     object-fit: contain;
  padding: 2vh 2vw;
  pointer-events: none;
}
.canvas {
  position: absolute;
  top: 0;
  -ms-touch-action: none;
      touch-action: none;
}
.canvas.hidden {
  display: none;
}
:global(.alert:hover) {
  color: var(--color2);
  background-color: var(--color1);
}
:global(.alert) {
  color: var(--color2);
  background-color: var(--color1);
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  text-align: center;
  z-index: 2;
  border-radius: 1em;
}
:global(.alert.inverted) {
  color: var(--color1);
  background-color: var(--color2);
}
/* .controls label {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  gap: 1em;
  padding: .3em 0 .3em 1em;
  border: solid  var(--color2);
  font-size: 1.5rem;
}
.controls input {
  background-color: var(--color1);
} */
main {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  position: relative;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  min-height: calc(100vh - 7.25rem*.8 - 2.6rem - 5rem - 2.1rem*1.1 - 8px);
  min-height: calc(100svh - 7.25rem*.8 - 2.6rem - 5rem - 2.1rem*1.1 - 8px);
  padding: var(--gutter);
}
.rsvp-container {
  position: absolute;
  height: inherit;
  right: 0;
  position: absolute;
  height: calc(100% - var(--gutter)*2);
  pointer-events: none;
  margin: 0 var(--gutter);
}
@-webkit-keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
.rsvp {
  position: sticky;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  top: calc(100vh - 4em - var(--gutter));
  width: 4em;
  height: 4em;
  text-align: center;
  -ms-flex-line-pack: center;
      align-content: center;
  z-index: 1;
  -webkit-animation: rotate 8s linear infinite;
          animation: rotate 8s linear infinite;
  pointer-events: all;
}
.inverted.rsvp {
  color: var(--color1);
  background-color: var(--color2);
}
.rsvp:hover {
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
  color: var(--color1);
  background-color: var(--color2);
}
.inverted.rsvp:hover {
  -webkit-animation-play-state: paused;
          animation-play-state: paused;
  color: var(--color2);
  background-color: var(--color1);
}
@media screen and (max-width: 900px) {
  h2 {
    padding: calc(var(--gutter)*1.5) 0 calc(var(--gutter)*2);
  }
  main {
    min-height: calc(100vh - 7.5rem - 18vw*0.8*2 - 2.6rem - 2.7rem*1.1 + 8px);
    min-height: calc(100svh - 7.5rem - 18vw*0.8*2 - 2.6rem - 2.8rem*1.1 + 8px);
    padding: 0;
    -webkit-box-pack: end;
        -ms-flex-pack: end;
            justify-content: flex-end;
  }
  .homepage {
    width: 100%;
  }
  .homepage>div:nth-child(1) {
    margin-top: auto;
    padding: var(--gutter);
  }
  .homepage>div:nth-child(3) {
    max-width: unset;
    padding: var(--gutter);
    width: 100%;
    color: var(--color2);
    background-color: var(--color1);
  }
  .rsvp-container {
    width: 100%;
    margin: 0;
  }
  .rsvp {
    position: sticky;
    left: 0;
    margin: var(--gutter);
    width: -webkit-fill-available;
    height: auto;
    -webkit-animation: none;
            animation: none;
    padding: .3em 1em;
  }
  .homepage .rsvp {
    position: relative;
    margin-bottom: calc(var(--gutter)*2);
  }
  .rsvp.info {
    top: calc(100svh - 1.9em - var(--gutter)*2) !important;
    margin-bottom: calc(var(--gutter)*2);
  }
  .rsvp.draw {
    position: sticky;
    top: calc(100svh - 1.9em - var(--gutter)*2) !important;
    right: 0 !important;
    left: unset;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    margin-left: auto;
    margin: 0 calc(var(--gutter)) calc(var(--gutter)*2) auto;
  }
  .drawing {
    height: 100svh;
    padding: var(--gutter);
  }
  .drawing-buttons.top {
    top: calc(var(--gutter)*2);
  }
  .drawing-buttons.bottom {
    bottom: calc(var(--gutter)*2);
  }
  .drawing-dots {
    padding: calc(var(--gutter)*7) calc(var(--gutter)/2);
  }
  :global(.alert) {
    width: 80%;
  }
}
@media screen and (max-width: 600px) {
  .drawing-buttons.bottom {
    bottom: calc(var(--gutter)*4 + 2.8rem);
    width: -webkit-fill-available;
  }
  .drawing-buttons.bottom button {
    width: calc(50% - var(--gutter)/2 - 4px);
  }
  .rsvp.draw {
    width: auto;
    margin-left: var(--gutter);
  }
  :global(.alert) {
    width: calc(100% - var(--gutter)*2);
  }
}

/* Footer */
footer {
  width: 100%;
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: 1fr var(--gutter) 1fr var(--gutter) 1fr var(--gutter) 1fr;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--gutter);
  color: var(--color1);
  background-color: var(--color2);
  padding: var(--gutter);
  -webkit-box-align: last baseline;
      -ms-flex-align: last baseline;
          align-items: last baseline;
}
footer svg {
  fill: var(--color2);
  height: 2rem;
}
footer svg.inverted {
  fill: var(--color1);
  color: unset;
  background-color: unset;
}
footer div:nth-child(2) {
  -ms-grid-column: 2;
  -ms-grid-column-span: 2;
  grid-column: 2 / span 2;
}
footer div:nth-child(3) {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: end;
      -ms-flex-pack: end;
          justify-content: flex-end;
  column-gap: 2rem;
  row-gap: 1.1rem;
  flex-wrap: wrap;
}
footer div:nth-child(3)>div {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: end;
      -ms-flex-pack: end;
          justify-content: flex-end;
 column-gap: 2rem;
 row-gap: 1.1rem;
}
footer a:hover {
  text-decoration: underline;
}
@media screen and (max-width: 900px) {
  footer {
    display: block;
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
  footer svg {
    fill: var(--color2);
    height: 4rem;
  }
  footer div:nth-child(3) {
    flex-direction: column;
    margin-top: 3em;
    -webkit-box-pack: start;
        -ms-flex-pack: start;
            justify-content: flex-start;
  }
  footer div:nth-child(3)>div {
    flex-direction: column;
    row-gap: 0;
    -webkit-box-pack: start;
        -ms-flex-pack: start;
            justify-content: flex-start;
  }
}
</style>