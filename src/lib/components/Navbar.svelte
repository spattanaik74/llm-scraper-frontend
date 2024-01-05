<script>
    import { ThemeSwitcher } from '$lib/scripts/themeswitcher';
    import { onMount } from 'svelte';
    import { authenticated } from "../../stores/auth";
  
      onMount(() => {
          ThemeSwitcher.init();
      });
      
    let login = true;
    
    function goToAdmin() {
    window.location.href = '/';
  }

    export let value = '';

    export let username = 'None';

    let auth = false;

    authenticated.subscribe(a => auth = a);
    export let user = { name: 'Sarthak', profilePicture: 'https://avatars.githubusercontent.com/u/23291425?v=4' };
  
  </script>

  <style>
    aside {
    height: 120%;
  }

  /* Set the width of the sidebar to 20% */
  @media (min-width: 768px) {
    aside {
      width: 20%;
    }
  }
  </style>
  
  <aside class="bg-gray-800 text-white p-4 flex flex-col items-center h-full w-20">
    {#if user.profilePicture}
      <img src={user.profilePicture} alt="Profile Picture" class="rounded-full w-16 h-16 mb-2">
    {/if}
    {#if user.name}
      <p class="text-lg font-bold mb-4">{user.name}</p>
    {/if}
    <nav class="flex flex-col space-y-2">
      <a href="/admin" class="text-blue-500 hover:underline" on:click={goToAdmin}>Admin</a>
      <button class="text-red-500 hover:underline">Logout</button>
    </nav>
  </aside>