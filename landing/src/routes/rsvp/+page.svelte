<script>
import { enhance, applyAction } from '$app/forms';
import { onMount } from "svelte";

let isSubmitted = $state(false);
let isSubmitting = $state(false);
let formResponse = $state();
let innerWidth = $state()
let innerHeight = $state()
let showAlert = $state()

import { getCanvas } from '$lib/stores/canvas.svelte.js';
const canvaser = getCanvas();

const handleEnhance = ({ formElement, formData, action, cancel }) => {
  if (canvaser.canvas) {
    console.log(canvaser.canvas);
    formData.append('file', canvaser.canvas, 'placeholder.png');
  }
  return async ({ result }) => {
    if (result.data.success) {
      isSubmitted = true;
      formElement.reset()
    } else if (!result.data.success) {
      formResponse = result.data
    }
    console.log(formResponse);
    isSubmitting = false
    await applyAction(result);
  };
};

const resetFormStates = () => {
  formResponse = false
};

onMount(() => {
  console.log(canvaser.canvas);
});
$effect(() => {
  if (isSubmitted) {
    resetFormStates()
  };
  if (formResponse?.emptyFields) {
    showAlert = true
    console.log("Alert");
    setTimeout(() => {
      showAlert = false
      console.log("no Alert");
      
    }, 5000);
  }
});
</script>

<svelte:window bind:innerWidth bind:innerHeight></svelte:window>
<section>
  <p class="text-s">La registrazione all'evento ci aiuta a gestire l'affluenza a casa di Edwin e a garantire ad ogni visitatore un'esperienza ottimale. Grazie!</p>
  <form
    id="form"
    action="?/create"
    method="POST"
    enctype="multipart/form-data"
    use:enhance={handleEnhance}
  >
  <div class="anagraphics">
    <label for="name">Name*</label>
      <input 
        type="text" 
        id="name" 
        name="name" 
        class:empty={formResponse?.emptyFields?.includes('name')} 
        onclick={() => {if (formResponse?.emptyFields.includes('name')) {
        formResponse.emptyFields = formResponse.emptyFields.filter(field => field !== 'name') 
        }}}>
      <label for="surname">Surname*</label>
      <input 
        type="text" 
        id="surname" 
        name="surname" 
        class:empty={formResponse?.emptyFields?.includes('surname')} 
        onclick={() => {if (formResponse?.emptyFields.includes('surname')) {
          formResponse.emptyFields = formResponse.emptyFields.filter(field => field !== 'surname') 
        }}}>
      <label for="email">Email*</label>
      <input 
        type="text" 
        id="email" 
        name="email"
        class:empty={formResponse?.emptyFields?.includes('email')} 
        onclick={() => {if (formResponse?.emptyFields.includes('email')) {
          formResponse.emptyFields = formResponse.emptyFields.filter(field => field !== 'email') 
        }}}>
  </div>
      <div class="days">
        <p class="question">In quali momenti del weekend vorresti venire?</p>
        <div class="day text-m">
          <label for="fri" class="day-name">Fri 29.11</label>
          <div>
            <input type="checkbox" id="fri-morning" name="fri-morning" class="big"/>
            <label for="fri-morning">Mattina</label>
          </div>
          <div>
            <input type="checkbox" id="fri-afternoon" name="fri-afternoon" class="big"/>
            <label for="fri-afternoon">Pomeriggio</label>
          </div>
        </div>
        <div class="day text-m">
          <label for="sat" class="day-name">Sat 30.11</label>
          <div>
            <input type="checkbox" id="sat-morning" name="sat-morning" class="big"/>
            <label for="sat-morning">Mattina</label>
          </div>
          <div>
            <input type="checkbox" id="sat-afternoon" name="sat-afternoon" class="big"/>
            <label for="sat-afternoon">Pomeriggio</label>
          </div>
        </div>
        <div class="day text-m">
          <label for="sun" class="day-name">Sun 01.12</label>
          <div>
            <input type="checkbox" id="sun-morning" name="sun-morning" class="big"/>
            <label for="sun-morning">Mattina</label>
          </div>
          <div>
            <input type="checkbox" id="sun-afternoon" name="sun-afternoon" class="big"/>
            <label for="sun-afternoon">Pomeriggio</label>
          </div>
        </div>
      </div>
      <div class="submit-container">
        <div aria-hidden="true" style="position: absolute; left: -5000px;">
          /* real people should not fill this in and expect good things - do not remove this or risk form bot signups */
          <input type="text" name="b_1fa5ecea1ac66768564ee33f1_f51e52dfb6" tabindex="-1" value="">
        </div>
        <button type="submit" class="text-m submit" onclick={() => isSubmitting = true}>
          Invia
        </button>
        {#if formResponse?.success === true}
          <p class="alert btn inverted text-xs form-response">Inviato</p>
        {:else if formResponse?.success === false && formResponse?.empty && showAlert}
          <p class="alert btn inverted text-xs form-response">Mancano alcuni campi obbligatori: {formResponse.emptyFieldsItalian.join(', ')}</p>
        {:else if formResponse?.success === false && !formResponse.empty}
          <p class="alert btn inverted text-xs form-response">Errore al momento dell’invio. Riprova.</p>
        {:else if isSubmitting}
          <p class="alert btn inverted text-xs form-response">Invio in corso</p>
        {/if}
      </div>
      <div class="text-xs checkbox-container">
        <input type="checkbox" id="terms" name="terms" class:empty={formResponse?.emptyFields?.includes('terms')}/>
        <label for="terms">Accetto i termini e condizioni specificate in <a href="/terms">questa pagina</a>.*</label>
      </div>
      <div class="text-xs checkbox-container">
        <input type="checkbox" id="treatment" name="treatment" class:empty={formResponse?.emptyFields?.includes('treatment')}/>
        <label for="treatment">Autorizzo al trattamento dei dati personali. Preso atto dell’<a href="/privacy">informativa</a> ai sensi del Regolamento Europeo EU/2016/679 sulla protezione dei dati (GDPR) autorizzo il trattamento e la comunicazione all’Organizzazione dei miei dati personali, per le finalità connesse alla realizzazione dell’evento.*</label>
      </div>
      <div class="text-xs checkbox-container">
        <input type="checkbox" id="newsletter" name="newsletter"/>
        <label for="newsletter">Desidero ricevere aggiornamenti da Edwin on Mars per eventi futuri</label>
      </div>
  </form>
</section>

<style>
/* Contact */
section {
  width: calc(50% - var(--gutter)/2);
  margin-bottom: 10rem;
}
form {
  display: flex;
  flex-direction: column;
  gap: var(--gutter);
  margin-top: calc(var(--gutter)*2);
}
input[type="text"] {
  display: block;
  width: 100%;
  padding: .7rem 1rem;
  border: none;
  color: var(--color2);
  background-color: var(--color1);
  outline: solid 2px var(--color2);
  border-radius: .3rem;
  margin-top: .5rem;
  margin-bottom: 1rem;
}
input[type="checkbox"] {
  vertical-align: top;
  border: solid 2px var(--color2);
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;
  height: 1.1em;
  width: 1.1em;
  border-radius: .3rem;
  position: relative;
  color: var(--color2);
  margin-right: .4em;
}
input[type="checkbox"].big {
  top: .05em;
  height: .9em;
  width: .9em;
  border-radius: 50%;
  margin-right: .1em;
}
input[type="checkbox"].big:checked::after {
  content: '';
  position: absolute;
  top: -0.1em;
  left: -0.1em;
  width: 1.2em;
  height: 1.2em;
  background-color: var(--color2);
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 49.58 61.2'%3E%3Cpath d='M48.7 56.08c-8.02-8.02-14.51-17.39-21.1-27.05-.23-.33-.45-.66-.68-1-.2-.29-.4-.58-.59-.87.69-.69 1.4-1.37 2.12-2.01C34.5 19.81 39.96 13.01 44.24 6.6c.92-1.38.55-3.24-.83-4.16s-3.24-.55-4.16.83c-4.08 6.13-9.22 12.48-14.77 17.39-.54.48-1.08.98-1.6 1.48C17.78 14.8 12.42 7.49 6.14.93 4.99-.27 3.09-.31 1.89.83S.65 3.87 1.8 5.07c6.27 6.55 11.6 13.91 16.87 21.54-2.45 2.85-4.7 5.86-6.85 8.86-.85 1.19-1.69 2.37-2.51 3.54-2.85 4.04-5.58 7.92-8.58 11.42-1.08 1.26-.93 3.15.33 4.23s3.15.93 4.23-.33c3.2-3.74 6.16-7.93 9.03-12.01.8-1.14 1.59-2.26 2.39-3.37 1.8-2.52 3.61-4.95 5.49-7.22l.46.67C29.22 42.01 36 51.83 44.47 60.31a3 3 0 0 0 4.24 0 3 3 0 0 0 0-4.24Z'/%3E%3C/svg%3E") no-repeat;
  mask-size: contain;
  mask-position: center;
}
input[type="checkbox"]:checked::after {
  content: '';
  position: absolute;
  top: -0.05em;
  left: -0.05em;
  width: 1.1em;
  height: 1.1em;
  background-color: var(--color2);
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 26.29 31.96'%3E%3Cpath d='M25.47 27.02c-3.33-3.44-6.21-7.53-8.57-10.93.56-.71 1.09-1.42 1.58-2.11.42-.57.82-1.14 1.21-1.69l.17-.24c1.3-1.81 2.53-3.52 3.86-5.06.52-.59.77-1.35.71-2.14-.06-.78-.42-1.49-1.02-2-1.22-1.04-3.08-.9-4.14.32-1.53 1.77-2.96 3.75-4.4 5.79l-1.15 1.6c-.11.16-.22.31-.34.46C10.94 7.58 8.24 4.03 5.01.83 3.88-.28 2.02-.29.86.83.3 1.4 0 2.14 0 2.93c0 .78.31 1.51.86 2.05 3.3 3.26 6.08 7.07 8.64 10.74-.43.44-.81.81-1.18 1.14-3.45 3.01-6.16 6.6-7.82 9.07-.44.65-.6 1.44-.44 2.21.16.77.6 1.43 1.24 1.85 1.34.89 3.17.54 4.08-.8 1.48-2.2 3.86-5.36 6.82-7.94.23-.2.46-.42.7-.64 2.44 3.49 5.11 7.13 8.33 10.46.55.57 1.32.9 2.12.9.75 0 1.47-.28 2.01-.8a2.895 2.895 0 0 0 .1-4.14Z'/%3E%3C/svg%3E") no-repeat;
  mask-size: contain;
  mask-position: center;
}
input:focus-visible {
  outline-style: dashed;
}
input.empty {
  outline: solid 2px #ff0000;
}
input[type="checkbox"].empty {
  border: solid 2px #ff0000;
  outline: none;
}
.days {
  display: flex;
  flex-direction: column;
  gap: var(--gutter);
  margin: var(--gutter) 0;
}
.day {
  display: flex;
  width: 150%;
  gap: var(--gutter);
  width: 120%;
}
.day-name {
  width: 25%;
}
.submit-container {
  display: flex;
  gap: 1em;
  margin-top: 1.5em;
  margin-bottom: .5em;
  align-items: center;
}
.submit {
  width: min-content;
  border-radius: 1em;
  border: solid 2px var(--color2);
  background-color: var(--color2);
  color: var(--color1);
  padding: .1em .5em .2em;
}
.submit:hover {
  color: var(--color2);
  background-color: var(--color1);
}
a {
  text-decoration: underline;
}

@media screen and (max-width: 900px) {
  input[type="text"] {
    margin-bottom: 2rem;
  }
  section {
    padding: var(--gutter);
    width: 100%;
  }
  .day {
    width: 100%;
    flex-wrap: wrap;
    margin-bottom: .5em;
  }
  .day:last-of-type {
    margin-bottom: 0;
  }
  .day-name {
    flex-basis: 100%;
  }
  .checkbox-container {
    display: flex;
  }
  .checkbox-container input[type="checkbox"] {
    width: 1.2em;
    height: 1.2em;
    margin-right: var(--gutter);
  }
  .checkbox-container label {
    width: fit-content;
  }
  .submit {
    width: 100%;
  }
}
</style>