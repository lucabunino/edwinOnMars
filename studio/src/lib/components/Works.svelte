<script>
import { register } from 'swiper/element/bundle'; register();
let works = [
  {
    title: "Café lorem ipsum",
    subtitle: "With Giulia Brighenti",
    tags: ["consulenza", "progetto"],
    link: "https://www.google.com/",
  },
  {
    title: "20th Century Design Sale",
    subtitle: "Showroom Lorem Ipsum, Milano",
    tags: ["sale", "evento"],
    link: "https://20th-century-design-sale.edwinonmars.com/",
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
  aspect-ratio: var(--aspectRatio);
}
p {
  margin: 1em 0;
}
.tags {
  list-style: none;
  padding: 0;
  margin: .7em 0 1.2em;
  display: flex;
  gap: .3em;
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