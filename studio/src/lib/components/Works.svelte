<script>
import { register } from 'swiper/element/bundle'; register();
let works = [
  // {
  //   title: "20<sup>th</sup> Century Design Sale – 1<sup>st</sup> Edition",
  //   subtitle: "Alef Showroom, Milano",
  //   ph: "Rita Rivezzi",
  //   tags: ["sale"],
  //   link: "https://design-sale-1.edwinonmars.com/",
  // },
  {
    title: "Kuun in Touch: Shaping the Future",
    subtitle: "Touch Studio, Milano",
    ph: "Teresa Maria Zinnà",
    tags: ["set design"],
    link: "https://kuunagency.com/blogs/news/kuun-in-touch-shaping-the-future-at-milan-fashion-week-2025",
  },
  {
    title: "Maud Café Charnet Edition",
    subtitle: "Ex-Officina, Cesena",
    ph: "David Di Segni",
    tags: ["set design"],
    link: "https://www.instagram.com/p/DHgDdBCtVGr/?__d=1%3Futm_source%3Dig_embed",
  },
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
  {#each works as work, i}
    <swiper-slide>
      {#if work.link}
        <a class="work" href={work.link} target="_blank" rel="noopener noreferrer">
          <img src="img/cover/{i+1}.webp" alt="Cover for {work.title}">
          {#if work.tags}
            <ul class="swiss-16 uppercase tags">
              {#each work.tags as tag}
                <li class="tag">{tag}</li>
              {/each}
            </ul>
          {/if}
          <h3>{@html work.title}</h3>
          {#if work.subtitle}<h3>{work.subtitle}</h3>{/if}
          {#if work.ph}<p class="swiss-12">Foto di {work.ph}</p>{/if}
        </a>
      {:else}
        <div class="work">
          <img src="img/work/{i+1}.webp" alt="">
          {#if work.tags}
            <ul class="swiss-16 uppercase tags">
              {#each work.tags as tag}
                <li class="tag">{tag}</li>
              {/each}
            </ul>
          {/if}
          {#if work.title} <h3>{work.title}</h3>{/if}
          {#if work.subtitle}<h3>{work.subtitle}</h3>{/if}
          {#if work.ph}<p>Ph. {work.ph}</p>{/if}
        </div>
      {/if}
    </swiper-slide>
  {/each}
</swiper-container>

<style>
swiper-container {
  padding: var(--margin) 0;
}
a.work:hover .tag {
  color: var(--white);
  background-color: var(--black);
}
img {
  display: block;
  width: 100%;
  aspect-ratio: var(--aspectRatio);
  -o-object-fit: cover;
     object-fit: cover;
}
p {
  margin-top: .8em;
}
.tags {
  list-style: none;
  padding: 0;
  margin: .7em 0 1.2em;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  gap: .3em;
}
:global(sup) {
  font-size: 70%;
}
@media screen and (max-width: 900px) {
  swiper-container {
    margin: 0 calc(var(--margin)*-1);
  }
  a.work:hover .tag {
    color: var(--black);
    background-color: var(--white);
  }
}
</style>