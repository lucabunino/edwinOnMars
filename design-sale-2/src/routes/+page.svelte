<script>
  let innerWidth = $state(0);
  let innerHeight = $state(0);
  import HomeDesktop from "$lib/components/HomeDesktop.svelte";
  import MobileDesktop from "$lib/components/MobileDesktop.svelte";
</script>

<svelte:window
  bind:innerHeight
  bind:innerWidth
/>

{#if innerWidth > 700}
  <HomeDesktop />
{:else}
  <MobileDesktop />
{/if}