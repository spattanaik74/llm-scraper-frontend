<script>
    import { onMount } from 'svelte';
    import ChatMessage from './ChatMessages.svelte';
  
    let messages = [];
    let queryText = '';
  
    onMount(async () => {
      await handleChatCompletion();
    });
  
    const handleChatCompletion = async () => {
    const userMessage = {
      role: 'user',
      content: queryText
    };

    if (queryText) {
      messages = messages.concat([userMessage]);
    }


    const response = await fetch('http://127.0.0.1:8000/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: queryText
      })
    }).then((res) => res.json());

    // Assuming the response structure is as given
    messages = messages.concat({
      role: 'assistant',
      content: response.response.result
    }
    );

    queryText = '';

    return response;
  };
  </script>
  
  <style>
    /* Add your styles here if needed */
  </style>
  <div style="display: flex; flex-direction: column; justify-content: space-between; height: 500px; width:800px">
  <ul class="divide-y divide-gray-200" style="overflow-y: auto; max-height: 400px;">
    {#if messages.length > 0}
      {#each messages as message (message.content)}
        <ChatMessage role={message.role} message={message.content} />
      {/each}
    {/if}
  </ul>
  
  <form class="mt-4">
    <div class="relative mt-1 flex items-center">
      <input
        bind:value={queryText}
        type="text"
        name="search"
        id="search"
        class="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <button
        on:click={handleChatCompletion}
        type="button" 
        class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5"
      >
        <kbd
          class="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400"
          >Enter</kbd
        >
      </button>
    </div>
  </form>
</div>
  