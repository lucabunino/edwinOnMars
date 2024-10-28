<script>
  import '../app.css'
  const { children } = $props()

  // Import from svelte/lib
  import { page } from '$app/stores';
  import { onNavigate } from '$app/navigation';

  // Import stores
  // import { getCategory } from '$lib/stores/category.svelte.js';
  // const categoryer = getCategory();
  // import { getHeight } from '$lib/stores/height.svelte.js';
  // const heighter = getHeight();

  // Variables
  let innerHeight = $state()
  let innerWidth = $state()
  let scrollY = $state()

  let colorPairs = [
    ['#FFFBC1', '#10069F'],
    ['#43B02A', '#FFFBC1'],
    ['#10069F', '#43B02A'],
    ['#FFFBC1', '#BA5826']
  ];
  let color1 = $state();
  let color2 = $state();
  let rotationRSVP = $state(0);
  function pickRandomColors() {
    const randomIndex = Math.floor(Math.random() * colorPairs.length);
    [color1, color2] = colorPairs[randomIndex];
  }
  pickRandomColors();
  
  $effect(() => {
	});

  // Functions
  function rotateRSVP(params) {
    rotationRSVP ++;
  }

  // Grid (not needed in production)
  let viewGrid = $state(false)
  function handleKey({key}) {if (key === 'G') {viewGrid = !viewGrid}}
</script>

<svelte:head>
  <title>TODO: Title</title>
  <meta name="description" content="TODO: Description">
  <link rel="canonical" href={$page.url}>
  <meta name="robots" content="index,follow">
  <meta name="googlebot" content="index,follow">
  <meta property="og:title" content="TODO: Title">
  <meta property="og:description" content="TODO: Description">
  <meta property="og:image" content="/seo.webp">
  <meta property="og:url" content={$page.url}>
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Title">
</svelte:head>

<svelte:window onkeyup={handleKey} bind:scrollY bind:innerHeight bind:innerWidth onscroll={rotateRSVP}></svelte:window>

{#if viewGrid}
  <div id="layout" style="pointer-events:none;display: grid;position:fixed; z-index:999;width: -moz-available;width: -webkit-fill-available;height: -moz-available;height: -webkit-fill-available;grid-template-columns: repeat(12, 1fr);margin:var(--gutter);gap:var(--gutter);opacity:.2;"><div style="background-color:red"></div><div style="background-color:red"></div><div style="background-color:red"></div><div style="background-color:red"></div><div style="background-color:red"></div><div style="background-color:red"></div><div style="background-color:red"></div><div style="background-color:red"></div><div style="background-color:red"></div><div style="background-color:red"></div><div style="background-color:red"></div><div style="background-color:red"></div></div>
  <style>@media only screen and (max-width: 800px) {#layout {grid-template-columns: repeat(6, 1fr) !important} #layout>div:nth-child(even) {display:none}}</style>
{/if}


<div class="bg text-s"
style="--color1: {color1};--color2: {color2};"
class:inverted={$page.url.pathname !== '/'}
>
  <header>
    <a href="/">
      <h1 class="text-m">
        <span>Edwin</span>
        <span>on Mars</span>
      </h1>
      <h2 class="text-l">20<sup class="text-m">th</sup> Century Design Sale</h2>
    </a>
    <nav>
      <a class="btn" class:active={$page.url.pathname === '/info'} href="/info">Info</a>
      {#if $page.url.pathname !== '/'}<a class="btn" href="/">Esci</a>{/if}
    </nav>
  </header>

  <main>
    {#if $page.url.pathname !== '/rsvp'}
      <div class="rsvp-container">
        <a class="rsvp btn active" href="/rsvp">RSVP</a>  
      </div>
    {/if}
    {#if $page.url.pathname === '/'}
      <div class="homepage">
        <div>
          <h3 class="text-m">Fri 29.11&thinsp;—&thinsp;Sun 1.12</h3>
          <h3 class="text-m">Viale Ortles 88/A, Milano</h3>
        </div>
        <div>
          <p>Vuoi disegnare tu? Clicca su “Inizia” e entra nella modalità disegno. Tieni premuto per unire i puntini. Una volta salvato, il disegno ti verrà inviato insieme alla conferma di avvenuta ricezione dell’RSVP.</p>
          <button class="btn" href="/disegno">Disegna</button>
        </div>
      </div>
    {:else}
      {@render children()}
    {/if}
  </main>

  <footer class:inverted={$page.url.pathname === '/'}>
    <div>
      <div>
        <p>©2024 Edwin on Mars</p>
        <p>Via Roma 100, 20125 Milano</p>
      </div>
      <a href="/privacy">Privacy policy</a>
    </div>
    <div>
      <p>Ig: <a href="#">@edwinonmars</a></p>
      <p>Email: <a href="mailto:info@edwinonmars.com">info@edwinonmars.com</a></p>
      <p>Tel: <a href="tel:+39 345 8591006">+39 345 8591006</a></p>
    </div>
    <div>
      <p>Founder and creative director: Vera Salvaderi</p>
      <p>PR and communication strategy: Giulia Baraldi</p>
      <p>Illustrazioni: Giulia Baraldi, Silvia Cannella, Paola Carta</p>
      <p>Allestimento Cecilia Gaetarelli, Carlos Valencia, Pietro Vitali</p>
      <p>Graphic design: Giulia Benedetti, Luca Bunino</p>
    </div>
  </footer>
</div>

<style>
/* Global */
:global(.text-s) {
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: -0.005em;
}
:global(.text-m) {
  font-size: 2.88rem;
  font-weight: 500;
  letter-spacing: -0.04em;
}
:global(.text-l) {
  font-size: 7rem;
  font-weight: 360;
  letter-spacing: -0.05em;
}
:global(.btn) {
  font-size: 1.6rem;
  letter-spacing: -0.02em;
  padding: .3em 1em;
  border-radius: 3em;
  color: var(--color1);
  background-color: var(--color2);
  border: solid 1px var(--color1);
}
:global(.btn:hover) {
  color: var(--color2);
  background-color: var(--color1);
}
:global(.btn.active) {
  color: var(--color2);
  background-color: var(--color1);
  border-color: var(--color1);
}
:global(.inverted .btn) {
  color: var(--color2);
  background-color: var(--color1);
  border-color: var(--color2);
}
:global(.inverted .btn:hover) {
  color: var(--color1);
  background-color: var(--color2);
  border-color: var(--color1);
}
:global(.inverted .btn.active) {
  color: var(--color1);
  background-color: var(--color2);
  border-color: var(--color2);
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
  display: flex;
  justify-content: space-between;
  width: 100%;
}
h2 {
  -moz-text-align-last: justify;
  text-align-last: justify;
  text-align: justify;
}
nav {
  display: flex;
  gap: .5em;
}
.homepage {
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
}
main {
  display: flex;
  position: relative;
  flex-direction: column;
  min-height: calc(100dvh - 300px);
  padding: var(--gutter);
}
.rsvp-container {
  position: absolute;
  height: inherit;
  right: 0;
  height: 100%;
  padding: var(--gutter) 0;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.rsvp {
  position: sticky;
  display: block;
  padding: 0;
  top: calc(100vh - 4em - var(--gutter));
  margin: var(--gutter);
  width: 4em;
  height: 4em;
  text-align: center;
  align-content: center;
  z-index: 1;
  animation: rotate 5s linear infinite;
}
.inverted.rsvp {
  color: var(--color2);
  background-color: var(--color1);
}
.rsvp:hover {
  animation-play-state: paused;
  color: var(--color1);
  background-color: var(--color2);
}
.inverted.rsvp:hover {
  animation-play-state: paused;
  color: var(--color2);
  background-color: var(--color1);
}

footer {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--gutter);
  color: var(--color1);
  background-color: var(--color2);
  padding: var(--gutter);
}
footer div:nth-child(1) {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
footer div:nth-child(3) {
  grid-column: 3 / span 2;
}
</style>