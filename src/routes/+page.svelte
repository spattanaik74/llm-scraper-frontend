<script>
	import Maintable from "$lib/components/Maintable.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
	import Search from "$lib/components/Search.svelte";
    import {onMount} from 'svelte';
	import { authenticated } from "../stores/auth";
	import { goto } from "$app/navigation";
	import Jobcard from "$lib/components/jobcard.svelte";

    // let username = '';
    // let message = '';

    // onMount( async () => {
	// 	try {
	// 		const response = await fetch('http://127.0.0.1:8000/user',
	// 		{
	// 			method: 'GET',
	// 			headers: {'Content-Type': 'application/json'},
	// 			credentials: 'include',
	// 		})

	// 		const content = await response.json();

	// 		if (content.detail && content.detail === 'Unauthenticated') {
    //             // Redirect to the error page
    //             goto('/login');
    //         } else {
    //             username = content.name;
    //             authenticated.set(true); 
	// 		}
	// 	}
	// 	catch(e) 
	// 	{
	// 		message = 'You are not logged in';
	// 		authenticated.set(false);
	// 		goto ('/login')
	// 	}
	// });

    let showRefresh = true;

    function toggleButtons() {
        showRefresh = !showRefresh;
    }

    let responseData = '';
    let responseDataArray = '';

    const onSubmit = async() => {
        try {
      const response = await fetch('http://127.0.0.1:8000/product');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      responseData = await response.json();
      responseDataArray = responseData['message'];

    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }


</script>

<style>
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

        .jobcard-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 1200px; /* Adjust as needed */
    margin-left: 50px;
}

.jobcard-container {
    width: calc(33.33% - 10px); /* 10px is the space between job cards, adjust as needed */
    margin-bottom: 20px;/* Adjust as needed */
    box-sizing: border-box;
    display: flex;
}

@media (max-width: 768px) {
    .jobcard-container {
        width: calc(50% - 10px); /* Adjust as needed for smaller screens */
    }

    .left-symbol,
.right-symbol {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 24px; /* Adjust as needed */
    color: #333; /* Adjust the color as needed */
    cursor: pointer;
}

.left-symbol {
    left: 0;
}

.right-symbol {
    right: 0;
}
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

</style>
<div class="custom-container">
    <Navbar />
    
    {#if !showRefresh}
    <div style="margin-top: 0.5%;">
        <Search />
        <button class="secondary outline" on:click={toggleButtons} style="font-size: 12px; padding: 20px; width: 20%; display: inline-block; margin-left: 10px">Toggle</button>
    </div>
    {/if}
  
    <div class='grid'>
    {#if showRefresh}
      <button class="outline" style="font-size: 12px; padding: 20px; width: 20%;  display: inline-block; margin-left: 80%;" on:click={onSubmit}>Refresh</button>
      <button class="secondary outline" on:click={toggleButtons} style="font-size: 12px; padding: 20px; width: 20%; display: inline-block; margin-left: 10px">Toggle</button>
    {/if}
  
    
    </div>
  
    <div style="max-height: 600px; overflow-y: auto;">
        <table>
           <thead>
             <tr>
               <th>No.</th>
               <th>Title</th>
               <th>Experience</th>
               <th>link</th>
               <th>Details</th>
             </tr>
           </thead>
           <tbody>
             {#each responseDataArray as item,  index (index)}
               <tr>
                 <td>{index + 1}</td>
                 <td>{item.title}</td>
                 <td>{item.experience}</td>
                 <td><a href="{item.link_id}" target="_blank">link</a></td>
                 <td> <i class="far fa-eye"></i></td>
               </tr>
             {/each}
           </tbody>
         </table>
       </div>
  
  </div>