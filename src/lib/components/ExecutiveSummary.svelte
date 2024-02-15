<script>
    import Typewriter from 'svelte-typewriter';
    import { cascade, scramble } from 'svelte-typewriter'

    export let data;
  
    const {
      title,
      description,
      marketOpportunity,
      keyFeatures,
      competitiveAdvantage,
      monetizationStrategy,
      marketingStrategy,
      conclusion,
    } = data.executiveSummary;
  </script>
  
  <main class="ml-4 mr-4 mb-4">
    <h1 use:scramble={{ scrambleDuration: 3000 }} class="text-2xl font-bold">{title}</h1>
    <p use:scramble={{ scrambleDuration: 3000 }}>{description}</p>
  
    <section class="mt-6">
      <h2 use:scramble={{ scrambleDuration: 3000 }} use:scramble={{ scrambleSlowdown: 3000}} class="font-bold">Market Opportunity</h2>
      <p use:scramble={{ scrambleDuration: 3000 }}>{marketOpportunity.description}</p>
    </section>
  
    <section>
      <h2 use:scramble={{ scrambleDuration: 3000 }} class="text-xl font-bold mt-6">Key Features</h2>
      <ul>
        {#each keyFeatures as feature (feature.name)}
          <li>
            <p use:scramble={{ scrambleDuration: 3000 }} class="font-bold">{feature.name}:</p> 
            <p use:scramble={{ scrambleDuration: 3000 }}>{feature.description} </p>
          </li>
        {/each}
      </ul>
    </section>
  
    <section class="mt-6">
      <h2 use:scramble={{ scrambleDuration: 3000 }} class="text-xl font-bold">Competitive Advantage</h2>
      <p use:scramble={{ scrambleDuration: 3000 }}>{competitiveAdvantage.description}</p>
    </section>
  
    <section class="mt-6">
      <h2 use:scramble={{ scrambleDuration: 3000 }} class="text-xl font-bold">Monetization Strategy</h2>
      <p use:scramble={{ scrambleDuration: 3000 }}>{monetizationStrategy.description}</p>
    </section>
  
    <section class="mt-6">
      <h2 use:scramble={{ scrambleDuration: 3000 }} class="text-xl font-bold">Marketing Strategy</h2>
      <p use:scramble={{ scrambleDuration: 3000 }}>{marketingStrategy.description}</p>
    </section>
  
    <section class="mt-6">
      <h2 use:scramble={{ scrambleDuration: 3000 }} class="text-xl font-bold">Conclusion</h2>
      <p use:scramble={{ scrambleDuration: 3000 }}>{conclusion.description}</p>
    </section>
  </main>