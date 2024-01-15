<script>
  import { onMount, onDestroy } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let isOpenModal;
  // export let modalItem;

  console.log('in modal')

  function closeModal() {
    isOpenModal = false;
    dispatch('closeModal', { isOpenModal });
  }

</script>

<div id="background" style="--display: {isOpenModal ? 'block' : 'none'};" on:click={closeModal}></div>
<div id="modal" style="--display: {isOpenModal ? 'block' : 'none'};">
    <p>This is a modal window.</p>
</div>

<style>
  #background {
      display: var(--display);
      position: fixed;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
  }

  #modal {
      display: var(--display);
      position: fixed;
      z-index: 2;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #fff;
      filter: drop-shadow(0 0 20px #333);
  }
</style>
