<script>
import Deals from '$lib/components/Deals.svelte';
import Works from '$lib/components/Works.svelte';
</script>

<section id="hero" class="swiss-28">
  <div>
    <p>EOM STUDIO si occupa di organizzare eventi e arredare spazi, esclusivamente attraverso l’utilizzo di prodotti sostenibili, ovvero recuperati dal passato o realizzati oggigiorno con tecniche etiche ed ecologiche. Il nostro approccio parte dal pensare lo spazio per essere vissuto e non solo abitato, che sia una casa, un ufficio, un locale, un negozio, una galleria, o un evento. Offriamo soluzioni pensate su misura per diverse esigenze, garantendo armonia tra funzionalità ed estetica in ogni dettaglio.</p>
    <p class="desktop-only">Portfolio and CV <a href="mailto:studio@edwinonmars.com" class="underline">on request ↗</a></p>
  </div>
  <div>
    <a href="mailto:studio@edwinonmars.com">studio@edwinonmars.com</a>
    <a href="tel:+393394729946 ">+39 3394729946 </a>
    <a href="https://www.instagram.com/edwinonmars/" target="_blank" rel="noopener noreferrer">@edwinonmars</a>
  </div>
  <p class="mobile-cta mobile-only">Portfolio and CV <a href="mailto:studio@edwinonmars.com" class="underline">on request ↗</a></p>
</section>
<section id="deals">
  <h2 class="swiss-28">Pacchetti</h2>
    <Deals />
</section>
<!-- <section id="works">
  <h2 class="swiss-28">Works</h2>
    <Works />
</section> -->

<style>
section {
  margin-bottom: calc(var(--margin)*4);
}
#hero {
  display: grid;
  grid-template-columns: repeat(16, 1fr);
}
#hero div:nth-child(1) {
  grid-column: 1 / span 10;
}
#hero div:nth-child(2) {
  grid-column: 12 / span 5;
  display: flex;
  flex-direction: column;
}
#hero p + p {
  margin-top: 1em;
}
@media screen and (max-width: 900px) {
  section {
    margin-bottom: calc(var(--margin)*8);
  }
  #hero>.mobile-cta,
  #hero div:nth-child(1),
  #hero div:nth-child(2) {
    grid-column: 1 / span 16;
  }
  #hero div:nth-child(2) {
    margin: 1.2em 0;
  }
}
</style>