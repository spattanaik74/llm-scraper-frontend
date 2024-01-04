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

  
  </script>
  
  <nav class="container">
      <ul>
        <li><a href={value} class="secondary">{value}</a></li>
        <li>
          <details role="list" dir="rtl">
            <summary aria-haspopup="listbox" class="secondary" style=" border-radius: 25px">Color</summary>
            <ul role="listbox">
              <li><a href="./" data-theme-switcher="auto">Auto</a></li>
              <li><a href="./" data-theme-switcher="light">Light</a></li>
              <li><a href="./" data-theme-switcher="dark">Dark</a></li>
            </ul>
          </details>
        </li>
      </ul>
      <ul>
        <li><strong on:click={goToAdmin}>EX. Automation</strong></li>
      </ul>
      <ul>
        {#if login == false}
        <div>
          <li><a href="/login" role="button" class="outline">Login</a></li>
          <li><a href="/signup" role="button" class="secondary outline">Sign up</a></li>
        </div>
        {:else}
        <li role="list" dir="rtl">
          <a href="#" aria-haspopup="listbox">Sarthak</a>
          <ul role="listbox">
            <li><a>Edit</a></li>
            <li><a href="/admin">admin</a></li>
            <li><a>Log out</a></li>
          </ul>
        </li>
        {/if}
      </ul>
  </nav>