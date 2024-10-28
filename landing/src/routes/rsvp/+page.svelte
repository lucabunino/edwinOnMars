<script>
import { enhance, applyAction } from '$app/forms';

let isSubmitted = $state(false);
let isSubmitting = $state(false);
let formResponse = $state();
let innerWidth = $state()
let innerHeight = $state()

let selectedDays = {
    monday: {
      morning: false,
      afternoon: false
    },
    tuesday: {
      morning: false,
      afternoon: false
    },
    wednesday: {
      morning: false,
      afternoon: false
    }
  };

const handleEnhance = ({ formElement, formData, action, cancel }) => {
  return async ({ result }) => {
    if (result.data.success) {
      isSubmitted = true;
      formElement.reset()
    } else if (!result.data.success) {
      formResponse = result.data
      // if (result.data.empty) {
      //   emptyFields = result.data.emptyFields
      // } else {
      //   isErrorous = true;
      // }
      console.log(formResponse);
    }
    isSubmitting = false
    await applyAction(result);
  };
};

const resetFormStates = () => {
  formResponse = false
};

$effect(() => {
  // if (formResponse) resetFormStates();
});
</script>

<svelte:window bind:innerWidth bind:innerHeight></svelte:window>

<form
  id="form"
  action="?/create"
  method="POST"
  use:enhance={handleEnhance}
>
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
    <div>
      <p>In quali momenti del weekend vorresti venire?</p>
      <div class="day text-m">
        <label for="fri">Friday</label>
        <input type="checkbox" id="fri-morning" name="fri-morning"/>
        <label for="fri-morning">Morning</label>
        <input type="checkbox" id="fri-afternoon" name="fri-afternoon"/>
        <label for="fri-afternoon">Afternoon</label>
      </div>
      <div class="day text-m">
        <label for="sat">Saturday</label>
        <input type="checkbox" id="sat-morning" name="sat-morning"/>
        <label for="sat-morning">Morning</label>
        <input type="checkbox" id="sat-afternoon" name="sat-afternoon"/>
        <label for="sat-afternoon">Afternoon</label>
      </div>
      <div class="day text-m">
        <label for="sun">Sunday</label>
        <input type="checkbox" id="sun-morning" name="sun-morning"/>
        <label for="sun-morning">Morning</label>
        <input type="checkbox" id="sun-afternoon" name="sun-afternoon"/>
        <label for="sun-afternoon">Afternoon</label>
      </div>
    </div>
    <div>
      <input type="checkbox" id="data-treatment" name="data-treatment"/>
      <label for="data-treatment">Acconsento al trattamento dei miei dati personali (nome, cognome e indirizzo email) per l'invio di ulteriori comunicazioni di servizio, in conformità con la Privacy Policy</label>
    </div>
    <div>
      <input type="checkbox" id="newsletter" name="newsletter"/>
      <label for="data-treatment">Desidero ricevere aggiornamenti da Edwin on Mars per eventi futuri</label>
    </div>
    <button type="submit" onclick={() => isSubmitting = true}>
      Invia
    </button>
    {#if formResponse?.success === true}
      <p class="form-response">Inviato</p>
    {:else if formResponse?.success === false && formResponse?.empty}
      <p class="form-response">Campi mancanti: {formResponse.emptyFields.join(', ')}</p>
    {:else if formResponse?.success === false && !formResponse.empty}
      <p class="form-response">Errore al momento dell’invio. Riprova.</p>
    {:else if isSubmitting}
      <p class="form-response">Invio in corso</p>
    {/if}
</form>

<style>
/* Contact */
form {
  display: flex;
  flex-direction: column;
  gap: var(--gutter);
}
input[type="text"] {
  display: block;
  width: 100%;
  padding: .7rem 1rem;
  border: none;
  margin-bottom: 1.3rem;
}
textarea {
  resize: vertical;
  height: 10rem;
}
input:focus-visible,
textarea:focus-visible {
  outline: solid 1px #000;
}
input.empty,
textarea.empty {
  outline: solid 1px #ff0000;
}

@media screen and (max-width: 600px) {
}
</style>