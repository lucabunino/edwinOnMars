<script>
import { register } from 'swiper/element/bundle'; register();
let deals = [
  {
    title: "Atmosfera",
    description: "Il pacchetto Atmosfera offre un’esperienza su misura per definire lo stile ideale del tuo spazio.",
    features: [
      "consulenza base",
      "moodboard ispirazionale",
      "colloquio conoscitivo"
    ]
  },
  {
    title: "Suolo",
    description: "Il pacchetto Suolo ti accompagna nella scelta di materiali e finiture, offrendoti un supporto mirato.",
    features: [
      "consulenza intermedia",
      "colloquio conoscitivo",
      "moodboard ispirazionale",
      "shopping list",
    ]
  },
  {
    title: "Nucleo",
    description: "Il pacchetto Nucleo offre un supporto avanzato per trasformare il tuo spazio, su misura per un risultato impeccabile.",
    features: [
      "consulenza avanzata",
      "colloquio conoscitivo",
      "sopralluogo",
      "advanced case study",
      "moodboard e shopping list",
      "simulazione del risultato",
    ]
  },
  {
    title: "Pianeta",
    description: "Il pacchetto Pianeta offre una consulenza tailor-made, completamente personalizzata in base alle esigenze del committente. Un servizio esclusivo e su misura, pensato per guidarti in ogni dettaglio del progetto.",
  }
]
</script>

<swiper-container
speed={500}
slides-per-view={1.5}
space-between={5}
slidesOffsetBefore={14}
slidesOffsetAfter={14}
breakpoints={{
  "600": {
    "slidesPerView": 2.5,
    "spaceBetween": 5,
    "slidesOffsetBefore": 14,
    "slidesOffsetAfter": 14,
  },
  "900": {
    "slidesPerView": 4,
    "spaceBetween": 8,
    "slidesOffsetBefore": 0,
    "slidesOffsetAfter": 0,
  },
}}
>
  {#each deals as deal}
    <swiper-slide>
      <a class="deal" href="mailto:studio@edwinonmars.com">
        <div>
          <h3>{deal.title}</h3>
          <p>{deal.description}</p>
          {#if deal.features}
            <ul>
              {#each deal.features as feature}
                <li>{feature}</li>
              {/each}
            </ul>
          {/if}
        </div>
        <div>
          <p>Prezzo su richiesta</p>
          <p>Contact ↗</p>
        </div>
      </a>
    </swiper-slide>
  {/each}
</swiper-container>

<style>
swiper-container {
  padding: var(--margin) 0;
}
.deal {
  display: block;
  border: solid 1px var(--black);
  aspect-ratio: var(--aspectRatio);
  padding: .888em .444em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.deal:hover {
  background-color: var(--black);
  color: var(--white);
}
h3 {
  text-transform: uppercase;
}
p {
  margin: 1em 0;
}
p:last-of-type {
  margin-bottom: 0;
}
ul {
  list-style: none;
  padding: 0;
}
li::before {
  content: "* ";
}
@media screen and (max-width: 900px) {
  swiper-container {
    margin: 0 calc(var(--margin)*-1);
  }
  .deal:hover {
    background-color: var(--white);
    color: var(--black);
  }
}
</style>