<script>
let {
  label,
  options = [],
  fontSize = 1,
  value = $bindable('on')
} = $props();
let checked = $state(false);
function handleClick() {
  const target = event.target
  const state = target.getAttribute('aria-checked')
  checked = state === 'true' ? false : true
  value = checked === true ? 'on' : 'off'
  window.document.body.classList.toggle('dark');
}
</script>

<div class="switch" style="font-size: {fontSize}rem;">
  <button
      role="switch"
      aria-checked={checked}
      aria-label="Dark mode"
      onclick={handleClick}>
  </button>
</div>

<style>
.switch {
  display: flex;
  align-items: center;
}

.switch button {
  cursor: pointer;
  width: 3em;
  height: 1.6em;
  position: relative;
  margin: 0 0 0 0.5em;
  border: solid 1px var(--black);
  background-color: var(--white);
}
.switch button::before {
  content: '';
  position: absolute;
  width: 1.2em;
  height: 1.2em;
  background-color: var(--black);
  top: 0.15em;
  right: 1.5em;
  transition: var(--transition);
  transition-property: transform;
}
.switch button[aria-checked='true']::before{
  transform: translateX(1.3em);
  transition: var(--transition);
  transition-property: transform;
}
.switch button {
  border-radius: 1.5em;
} 
.switch button::before {
  border-radius: 100%;
}
.switch button:focus {
  outline: var(--gray) 2px solid;
  border-radius: 1.5em;
}
</style>