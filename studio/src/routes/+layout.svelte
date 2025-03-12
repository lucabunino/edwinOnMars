<script>
import "../app.css";
let { children } = $props();
import Switch from '$lib/components/Switch.svelte'
import { onMount } from 'svelte'
let sliderValue = $state();
let domLoaded = $state(false)
$effect(() => { domLoaded = true })

let showBanner = $state()
onMount(() => {
  const cookieConsent = localStorage.getItem('cookieConsent');
  if (cookieConsent === 'accepted') {
    showBanner = false;
  } else {
    showBanner = true;
  }
})

// Functions
function acceptCookies() {
  localStorage.setItem('cookieConsent', 'accepted');
  showBanner = false;
}
</script>

{#if domLoaded}
  <div>
    <header>
      <a href="/" class="logo swiss-28">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 168.255 85.172">
          <path d="m18.739 40.47 22.749-3.91c2.912.342 5.503 2.478 2.615 4.97-1.587 1.368-16.199 3.607-19.622 4.409-3.11.728-6.255 1.478-9.288 2.467-2.84 7.514-6.272 14.978-7.955 22.807 10.463-.327 20.239-3.317 29.627-7.72 1.663-.78 6.481-4.185 7.783-4.262 3.689-.218 4.936 3.396 2.697 6.11-11 4.988-22.622 11.09-34.473 13.838C7.904 80.331 1.35 82.004.148 75.418-1.15 68.304 6.479 57.7 8.286 50.639c-1.97-.722-2.84.717-4.893-.33-3.328-1.695-3.254-6.134.062-7.612 2.136-.952 6.454-.358 7.957-1.448.402-.291 1.828-5.156 2.08-5.779.644-1.593 3.591-9.765 4.228-11.92.044-.15-.105-.276-.25-.218-1.72.693-9.432 5.174-10.931.383-1.766-5.642 5.735-7.892 10.112-9.55 9.364-3.547 32.623-9.188 41.96-6.925 3.154.765 2.364 5.183.356 6.894-2.591 2.208-3.471.16-6.036-.19-2.057-.28-5.654-.191-7.789-.039-2.039.146-18.034 3.174-18.032 4.422 0 .09.806.647.93 1.176.483 2.078-3.817 8.576-4.972 10.959-.554 1.143-4.724 9.631-4.33 10.008Zm65.123 17.06c4.766-10.988 12-32.646 7.629-44.121-1.719-4.513-4.315-3.332-7.377-5.103-2.332-1.35-2.708-4.146-6.46-3.317-1.312.29-8.221 7.126-8.957 8.522-1.558 2.954-.052 3.95-.506 6.453-1.268 6.991-8.338 19.768-10.912 27.51-2.29 6.888-5.071 17.78-4.471 24.93.728 8.679 9.369 9.605 16.015 5.499 4.458-2.754 11.749-12.786 15.039-20.372Zm1.946-31.485c-.526 10.04-6.161 25.649-11.307 33.614-1.297 2.008-7.029 11.024-9.713 12.237-4.328 1.957-5.356-1.992-4.992-5.474.359-3.427 2.781-12.476 3.841-16.097 2.746-9.386 5.856-19.172 11.39-28.508 1.59-1.98 3.465-5.85 6.133-5.855 6.521-.01 4.778 7.605 4.648 10.083Zm60.435 43.795c.07-2.849 1.011-4.908 1.88-7.044 5.22-12.825 10.144-25.925 14.871-38.99 1.59-4.396 6.323-16.488 5.044-20.438-.581-1.796-2.842-3.213-4.673-3.358-4.215-.334-12.194 8.115-14.87 11.336-5.078 6.11-10.869 14.837-15.232 21.688-1.422 2.233-13.972 26.663-16.632 30.41-.324.455-.778 1.22-1.031.58 0 0-.211-.65-.087-1.41.72-4.416 8.56-28.698 9.255-31.302 2.093-7.84 4.698-15.959 7.308-23.686-.062-1.759-4.87-4.927-6.586-3.266-8.734 12.209-16.277 25.088-23.794 38.064-4.527 7.814-9.482 15.731-13.597 23.817-1.604 3.152-6.098 11.819-6.704 14.751-.605 2.927 1.282 4.345 4.149 4.164 1.141-.072 4.12-3.234 4.758-4.263.959-1.547.955-4.074 1.645-5.834 2.972-7.586 8.767-17.79 12.933-24.977 1.063-1.834 17.063-30.942 18.25-31.249.922-.212.251.948.157 1.403-1.493 6.288-11.968 32.479-13.47 38.754-.459 1.916-1.722 7.233-1.528 8.885.413 3.51 3.603 5.898 7.126 5.168 5.135-1.064 9.268-10.891 11.763-15.182 7.297-12.548 13.765-24.146 22.498-35.871 1.197-1.608 3.675-6.73 6.84-8.643 1.603-.927 3.06-.574 2.642.983l-19.505 51.465a2.175 2.175 0 0 0-.013 1.505l.136.38a5.124 5.124 0 0 0 4.568 3.388l.561.028a1.28 1.28 0 0 0 1.338-1.256Z"/>
        </svg>
        <p>Studio</p>
      </a>
      <Switch value={sliderValue} fontSize={.8} checked={false}/>
    </header>

    <main>
      {@render children()}
    </main>

    <footer>
      <div>
        <p>© Edwin on Mars</p>
        <p>P.IVA 01824020190</p>
        <a href="mailto:studio@edwinonmars.com">studio@edwinonmars.com</a>
        <a href="https://www.instagram.com/edwinonmars/" target="_blank" rel="noopener noreferrer">@edwinonmars</a>
        <a href="/cookies">Cookies</a>
        <a href="/privacy">Privacy</a>
      </div>
      <p class="swiss-12">Design & Development: <a class="underline" href="https:///www.giuliabenedetti.eu/" target="_blank" rel="noopener noreferrer">Giulia Benedetti</a> e <a class="underline" href="https://www.lucabunino.com/" target="_blank" rel="noopener noreferrer">Luca Bunino</a></p>
    </footer>
    {#if showBanner}
      <div id="cookie-banner">
        <p>Utilizziamo solo cookie tecnici per garantirti la migliore esperienza di navigazione sul sito.</p>
        <p>Questi cookie sono necessari per il funzionamento del sito e non richiedono il tuo consenso.</p>
        <p>Per saperne di più, consulta la nostra <a href="cookies" class="white underline hover-green">Cookie Policy</a></p>
        <button class="btn swiss-16" onclick={acceptCookies}>Ok, ho capito</button>
      </div>
    {/if}
  </div>
{/if}

<style>
/* Header */
header {
  padding: 0 0 var(--margin);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.logo {
  display: flex;
  gap: .5em;
}
svg {
  width: 8vw;
  fill: var(--black);
}

/* Footer */
footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
footer div {
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-auto-flow: column;
  column-gap: var(--margin);
}

/* Cookies */
#cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  padding: .888rem var(--margin);
  width: 100%;
  line-height: 1.2;
  height: auto;
  z-index: 3;
  /* border-top: solid 1px var(--white); */
  color: var(--white);
  background-color: var(--black);
}
#cookie-banner>button {
  background-color: unset;
  color: var(--white);
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  margin-top: 1rem;
  padding: 0;
  display: block;
}
#cookie-banner>button:hover {
  opacity: .3;
}

@media screen and (max-width: 900px) {
  svg {
    width: 7rem;
  }
  main {
    margin-top: calc(var(--margin)*2);
  }
  footer {
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 1em;
  }
  footer div {
    display: flex;
    flex-direction: column;
  }
  footer div>*:nth-child(even) {
    margin-bottom: 1.5em;
  }
  #cookie-banner>p {
    display: inline;
  }
}
</style>