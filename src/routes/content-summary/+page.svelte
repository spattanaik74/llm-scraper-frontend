<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import { onMount } from 'svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	let name = 'Home';
	let path = '/';

	// let project = {
	// 	name: 'Car Rental App',
	// 	description: 'A car rental app similar to Uber for renting cars',
	// 	timeline: {
	// 		planning_and_design: '2 weeks',
	// 		backend_development: '8 weeks',
	// 		frontend_development: '8 weeks',
	// 		testing_and_debugging: '4 weeks',
	// 		deployment_and_optimization: '2 weeks'
	// 	}
	// };

	// let team = {
	// 	roles: [
	// 		{ role: 'Project Manager / Product Owner', count: '1', experience: '5+ years' },
	// 		{ role: 'Backend Developer', count: '2', experience: '3+ years' },
	// 		{ role: 'Frontend Developer', count: '2', experience: '3+ years' },
	// 		{ role: 'UI/UX Designer', count: '1', experience: '3+ years' },
	// 		{ role: 'QA/Tester', count: '1', experience: '2+ years' },
	// 		{ role: 'DevOps Engineer', count: '1', experience: '3+ years' }
	// 	]
	// };

	// let techStack = {
	// 	backend: ['Django', 'Django REST Framework'],
	// 	database: ['PostgreSQL'],
	// 	frontend: ['React', 'React Router'],
	// 	other_tools: ['Redux', 'Webpack', 'Babel', 'Docker']
	// };

	// let functionalities = [
	// 	'User authentication and authorization',
	// 	'Car listing and booking',
	// 	'Real-time tracking of cars',
	// 	'Payment gateway integration',
	// 	'User reviews and ratings for cars/drivers'
	// ];

  let responseDataValue = '';

  let frontendValue = '';
  let languageValue = '';
  let searchValue = '';

  

let showTable = false;
let loading_ = false;
let project = '';
let team = '';
let techStack = '';
let functionalities = '';
let parsedData = '';


// Update the variables with the values from the parsed JSON

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

function project_text(parsedData) {
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

team = {
  roles: parsedData.team.roles
};

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
      parsedData = parseMessageToJSON(responseDataValue.message);
      console.log(parsedData)

    } catch (error) {
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
      <button class="btn btn-accent ml-6">Accent</button>
    </div>
    </form>
    
    {#if loading_}
    <div class="flex items-center justify-center h-screen">
      <span class="loading loading-dots loading-lg mt-16"></span>
    </div>
    {/if}
    
    {#if showTable}
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
