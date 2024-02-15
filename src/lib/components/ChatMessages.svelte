<script>
    import { cascade } from 'svelte-typewriter'

    export let role = '';
    export let message = '';
  
    const imgSrc = role === 'assistant' ? '/alfred-headshot.png' : 'https://avatars.githubusercontent.com/u/23291425?v=4';
    const name = role === 'assistant' ? 'XYLEX-1' : 'Sarthak';
  </script>
  
  <style>
    /* Add your styles here if needed */
  </style>
  
  <li class="flex py-4">
    <img class="h-10 w-10 rounded-full" src={imgSrc} alt="" />
    <div class="ml-3">
      <p class="text-sm font-medium text-gray-900">{name}</p>
      {#if role === 'assistant'}
      <p class="text-sm text-gray-500" use:cascade={{ interval: 30 }}>{message}</p>
      {:else}
      <p class="text-sm text-gray-500">{message}</p>
      {/if}
    </div>
  </li>
  