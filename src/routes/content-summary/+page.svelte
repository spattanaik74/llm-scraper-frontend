<script>
	// @ts-ignore
	// @ts-ignore
	import Navbar from '$lib/components/Navbar.svelte';
	// @ts-ignore
	// @ts-ignore
	import { onMount } from 'svelte';
  // @ts-ignore
  // @ts-ignore
  import pdfMake from 'pdfmake/build/pdfmake';
  // @ts-ignore
  import pdfFonts from 'pdfmake/build/vfs_fonts';
// @ts-ignore
// @ts-ignore
import pkg from 'file-saver';

	import Sidebar from '$lib/components/Sidebar.svelte';
	import ExecutiveSummary from '$lib/components/ExecutiveSummary.svelte';
	let name = 'Home';
	let path = '/';

  let responseDataValue = '';

  let frontendValue = '';
  let languageValue = '';
  let searchValue = '';

  const {saveAs} = pkg;

  // @ts-ignore
  pdfMake.vfs = pdfFonts.pdfMake.vfs;


let showTable = false;
let loading_ = false;
let project = '';
let team = '';
let techStack = '';
let functionalities = '';
let parsedData = '';
let jsonDataSummary = '';


// Update the variables with the values from the parsed JSON
function downloadAsPDF() {
    const documentDefinition = {
      content: [
        // @ts-ignore
        { text: jsonDataSummary.executiveSummary.title, style: 'header' },
        // @ts-ignore
        { text: jsonDataSummary.executiveSummary.description, style: 'body' },
        { text: "Marketing Opportunity", style: 'subheader'},
        // @ts-ignore
        { text: jsonDataSummary.executiveSummary.marketOpportunity.description, style: 'body'},
        { text: "Key Feature", style: 'subheader'},
        // @ts-ignore
        { text: jsonDataSummary.executiveSummary.keyFeatures[0].name, style: 'listheader'},
        // @ts-ignore
        { text: jsonDataSummary.executiveSummary.keyFeatures[0].description, style: 'body'},
        // @ts-ignore
        { text: jsonDataSummary.executiveSummary.keyFeatures[1].name, style: 'listheader'},
        // @ts-ignore
        { text: jsonDataSummary.executiveSummary.keyFeatures[1].description, style: 'body'},
        // @ts-ignore
        { text: jsonDataSummary.executiveSummary.keyFeatures[2].name, style: 'listheader'},
        // @ts-ignore
        { text: jsonDataSummary.executiveSummary.keyFeatures[2].description, style: 'body'},
        // @ts-ignore
        { text: jsonDataSummary.executiveSummary.keyFeatures[3].name, style: 'listheader'},
        // @ts-ignore
        { text: jsonDataSummary.executiveSummary.keyFeatures[3].description, style: 'body'},
        // @ts-ignore
        { text: jsonDataSummary.executiveSummary.keyFeatures[4].name, style: 'listheader'},
        // @ts-ignore
        { text: jsonDataSummary.executiveSummary.keyFeatures[4].description, style: 'body'},
        // @ts-ignore
        { text: 'Competitive Advantage', style: 'subheader'},
        { text: jsonDataSummary.executiveSummary.competitiveAdvantage.description, style: 'body'},
        { text: 'Monetization Strategy', style: 'subheader'},
        { text: jsonDataSummary.executiveSummary.monetizationStrategy.description, style: 'body'},
        { text: 'Marketing Strategy', style: 'subheader'},
        { text: jsonDataSummary.executiveSummary.marketingStrategy.description, style: 'body'},
        { text: 'Conclusion', style: 'subheader'},
        { text: jsonDataSummary.executiveSummary.conclusion.description, style: 'body'},

      ],
      styles: {
        header: { fontSize: 25, bold: true, margin: [0, 0, 0, 10] },
        subheader: {fontSize: 18, bold: true, margin: [0, 0, 0, 5]},
        listheader: {fontSize: 13, bold: true, margin: [0, 0, 0, 2]},
        body: { fontSize: 9, margin: [0, 0, 0, 10] },
      },
    };

    // @ts-ignore
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    // @ts-ignore
    pdfDocGenerator.getBlob((blob) => {
      // @ts-ignore
      saveAs(blob, `${jsonDataSummary.executiveSummary.title}.pdf`);
    });
  }


// @ts-ignore
function parseMessageToJSON(message) {
  try {
    const parsedMessage = JSON.parse(message);
    console.log(parsedMessage)
    project_text(parsedMessage)
    showTable = true;
    return parsedMessage;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}

// @ts-ignore
function parseSummaryToJSON(summary) {
  try {
    const parsedSummary = JSON.parse(summary);
    console.log(parsedSummary)
    return parsedSummary;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}

// @ts-ignore
function project_text(parsedData) {
  // @ts-ignore
  project = {
  name: parsedData.project.name,
  description: parsedData.project.description,
  timeline: {
    planning_and_design: parsedData.project.timeline.planning_and_design,
    backend_development: parsedData.project.timeline.backend_development,
    frontend_development: parsedData.project.timeline.frontend_development,
    testing_and_debugging: parsedData.project.timeline.testing_and_debugging,
    deployment_and_optimization: parsedData.project.timeline.deployment_and_optimization
  }
};

// @ts-ignore
team = {
  roles: parsedData.team.roles
};

// @ts-ignore
techStack = {
  backend: parsedData.tech_stack.backend,
  database: parsedData.tech_stack.database,
  frontend: parsedData.tech_stack.frontend,
  devops : parsedData.tech_stack.devops,
  other_tools: parsedData.tech_stack.other_tools
};

functionalities = parsedData.functionalites;
}

console.log(project);
console.log(techStack);
console.log(functionalities);
console.log(team)


  const onSubmitSearch = async() => {
    showTable = false;
    loading_ = true;
        try {
            var url = `http://127.0.0.1:8000/summary?search_text=${searchValue}&frontend_option=${frontendValue}&backend_option=${languageValue}}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 
                    "Accept": "application/json"
                }
            });
            if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      responseDataValue = data;
      // @ts-ignore
      parsedData = parseMessageToJSON(responseDataValue.message);
      // @ts-ignore
      jsonDataSummary = parseSummaryToJSON(responseDataValue.summary)
      console.log(parsedData)

    } catch (error) {
      // @ts-ignore
      console.error("Error fetching data:", error.message);
        }
        finally {
      loading_ = false;
    }
    }
    
  

</script>

<!-- <div"> -->
<div class="flex h-screen">
	<Sidebar {path} {name}></Sidebar>
	<div class="p-6 flex flex-col items-center justify-center custom-container">
    <form on:submit|preventDefault={onSubmitSearch}>
		<div class="mb-4 text-center" style="width:100%; display: flex; justify-content: center; align-items: center;">
      <input bind:value={searchValue} type="text" placeholder="Type here" class="input input-ghost w-full max-w-xs" />
      <select bind:value={languageValue} class="select select-ghost max-w-xs ml-6">
        <option disabled selected>Pick Backend</option>
        <option>Django</option>
        <option>Asp.Net</option>
        <option>Node</option>
        <option>Golang</option>
        <option>Ruby</option>
        <option>Java</option>
      </select>
      <select bind:value={frontendValue} class="select select-ghost max-w-xs ml-6">
        <option disabled selected>Pick Frontend</option>
        <option>Angular</option>
        <option>Svelte</option>
        <option>Vue</option>
        <option>React</option>
        <option>Pug</option>
        <option>Ruby on rails</option>
      </select>
      <button class="btn btn-accent ml-6">Generate</button>
    </div>
    </form>
    

    <div class="custom-container">
      <h2 class="text-center text-2xl md-6 font-bold">Instruction</h2>
      <p class="text-lg font-bold">Write clear and meaningful statement. example</p>
      <ul class="list-disc">
        <li>Make an app just like facebook or make a social media app like facebook</li>
        <li>Create a disaster management app</li>
        <li>make a trading app with feature like option trading and day trading</li>
      </ul>
    </div>
    {#if showTable}
    <div class="flex justify-between mt-6">
      <div class="shadow-xl">
        <ExecutiveSummary data={jsonDataSummary}/>
      </div>
      <div class="ml-42"> <!-- Adjust margin as needed -->
        <button 
          on:click={downloadAsPDF} 
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 shadow-xl"
        >
        <i class="fas fa-file-pdf text-xl"></i>
        </button>
      </div>
    </div>
    
    
    {/if}
    

    {#if loading_}
    <div class="flex items-center justify-center h-screen">
      <span class="loading loading-dots loading-lg mt-16"></span>
    </div>
    {/if}
    
    {#if showTable}
    <h1 class="text-2xl font-bold mt-6">Technology and Time Estimation</h1>
    <h1 class="text-2xl font-bold md-6">_________________________________</h1>
		<div class="shadow-xl custom-container">
			<div class="mb-6 text-center mt-10">
				<h1 class="text-4xl font-bold">{project.name}</h1>
			</div>

			<div class="mb-6 text-center">
				<h3 class="text-2xl font-bold">Description</h3>
				<p class="text-lg font-bold">{project.description}</p>
			</div>

			<div class="text-center mb-6">
				<h2 class="text-center text-2xl font-bold md-6">Functionalities</h2>
				<ul class="mt-10 pl-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 overflow-auto">
          {#each functionalities as functionality}
              <li class="text-xl">{functionality}</li>
          {/each}
      </ul>
			</div>
      <div class="text-center ml-16">
			<div class="flex flex-col md:flex-row mb-6 ml-8">
        <div class="md:mr-8 mb-4 md:mb-0 md:text-left"> 
            <h2 class="text-3xl font-bold text-center md:text-left">Roles</h2>
            {#each team.roles as { role, count, experience }}
                <div class="mb-2">
                    <p class="text-xl font-bold">{role}</p>
                    <p class="text-lg font-bold">{count} - {experience} experience</p>
                </div>
            {/each}
        </div>

        <div class="md:mr-8 mb-4 md:mb-0 md:text-right ml-36">
            <h2 class="text-3xl font-bold">Tech Stack</h2>
            {#each Object.entries(techStack) as [category, tools]}
                <div class="mb-2">
                    <h3 class="text-2xl font-bold">{category}</h3>
                    {#each tools as tool}
                        <p class="text-lg">{tool}</p>
                    {/each}
                </div>
            {/each}
        </div>
      </div>
      <div class="md:mr-8 mb-8 md:mb-0 md:text-left"> 
        <h2 class="text-3xl font-bold text-center md:text-left">Timeline</h2>
        <div class="mb-8 mt-4">
          <p class="text-lg">planning and design :- <strong>{project.timeline.planning_and_design}</strong></p>
          <p class="text-lg">backend development :- <strong>{project.timeline.backend_development}</strong></p>
          <p class="text-lg">frontend development :- <strong>{project.timeline.frontend_development}</strong></p>
          <p class="text-lg">testing and debugging :- <strong>{project.timeline.testing_and_debugging}</strong></p>
          <p class="text-lg">deployment and optimization :- <strong>{project.timeline.deployment_and_optimization}</strong></p>
      </div>
      
    </div>
    </div>
		</div>
    {/if}
	</div>
  
</div>

<!-- <style>
    .custom-container {
            width: 80%;
            max-width: 1200px;
            height: 900px;
            margin: 0 auto;
            padding: 20px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
            background-color: #ffffff;
            border-radius: 8px;
            margin-top: 20px;
        }

        table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 0px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: auto;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
    transition: transform 0.3s ease;
  }

  td:hover {
    transform: scale(1.1);
  }

  th {
    background-color: #f2f2f2;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  input {
    padding: 6px;
    margin-right: 6px;
    font-size: 20px;
  }

  button {
    padding: 6px 10px;
    cursor: pointer;
    font-size: 20px;
  }
</style> -->
<style>
	html,
	body,
	#svelte {
		height: 150%;
	}
	.flex {
		height: 100%;
	}
	.zoom-svg {
		transition: transform 0.3s ease-in-out;
	}

	.zoom-svg:hover {
		transform: scale(1.2);
	}

	.custom-container {
		max-width: 1000px; /* Adjust the value to your desired width */
		margin-left: auto;
		margin-right: auto;
		width: 100%;
	}
</style>
