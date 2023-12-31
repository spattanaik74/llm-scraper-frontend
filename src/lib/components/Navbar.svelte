<script>
    import { ThemeSwitcher } from '$lib/scripts/themeswitcher';
    import { onMount } from 'svelte';
  
      onMount(() => {
          ThemeSwitcher.init();
      });
  
    export let value = '';
  
  </script>
  
  <nav class="container">
      <ul>
        <li><a href={value} class="secondary">{value}</a></li>
        <li>
          <details role="list" dir="rtl">
            <summary aria-haspopup="listbox" class="secondary">Theme</summary>
            <ul role="listbox">
              <li><a href="./" data-theme-switcher="auto">Auto</a></li>
              <li><a href="./" data-theme-switcher="light">Light</a></li>
              <li><a href="./" data-theme-switcher="dark">Dark</a></li>
            </ul>
          </details>
        </li>
      </ul>
      <ul>
        <li><strong>Scraper Automation</strong></li>
      </ul>
      <ul>
        <li><a href="/login" role="button" class="outline">Login</a></li>
        <li><a href="/signup" role="button" class="secondary outline">Sign up</a></li>
      </ul>
  </nav>