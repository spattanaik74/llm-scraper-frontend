<script>
	import Maintable from "$lib/components/Maintable.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
	import Search from "$lib/components/Search.svelte";
    import {onMount} from 'svelte';
	import { authenticated } from "../stores/auth";
	import { goto } from "$app/navigation";
	import Jobcard from "$lib/components/jobcard.svelte";
  import Modal from "$lib/components/Modal.svelte";
	import Sidebar from "$lib/components/Sidebar.svelte";

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

    onMount(async () => {
    await onSubmit();
  });

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

  let showModal = false;

  let modalContent = {
    title: "",
    experience: "",
    description: "",
    link: "",
  };

  function openModal(title, experience,description,  link) {
    modalContent.title = title;
    modalContent.experience = experience;
    modalContent.link = link;
    modalContent.description = description
    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }


</script>

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

        .jobcard-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 1200px; /* Adjust as needed */
    margin-left: 50px;
} -->

<!-- .jobcard-container {
    width: calc(33.33% - 10px); /* 10px is the space between job cards, adjust as needed */
    margin-bottom: 20px;/* Adjust as needed */
    box-sizing: border-box;
    display: flex;
} -->

<!-- @media (max-width: 768px) {
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

  .modal {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }

  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 700px;
    max-width: 80%;
    text-align: center;
  }

  .experience {
    max-height: 200px;
    overflow-y: auto;
  }
  .description {
      max-height: 200px;
      overflow-y: auto;
    } -->
  <!-- } -->
<style>
    html, body, #svelte {
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
</style>

<!-- <div"> -->
  <div class="flex h-screen">
    <Sidebar></Sidebar>
    <div class="flex-1 flex flex-col items-center justify-center p-4">
      <!-- Table container -->
      <div class="flex mb-4 items-center" >
        <input type="text" placeholder="Type here" class="input input-bordered input-accent w-full max-w-lg m-2 shadow-xl"> <!-- Adjusted max-w, added mb-2 for margin-bottom -->
    <select class="select select-secondary w-full max-w-xs m-2 shadow-xl"> <!-- Adjusted max-w, added mb-2 for margin-bottom -->
        <option disabled selected>Choose</option>
        <option>job</option>
        <option>product</option>
    </select>
    <button class="btn btn-outline btn-accent m-2 shadow-xl">Search</button>
      </div>
      <div class="w-full max-w-screen-lg max-h-screen-sm m-10 ml-20 shadow-2xl"  style="max-height: 700px; overflow-y: auto;">
          <table class="table table-lg w-full min-w-max table-pin-rows">
              <thead>
                  <tr>
                      <th>No.</th>
                      <th>Title</th>
                      <th>Experience</th>
                      <th>Link</th>
                      <th>Details</th>
                  </tr>
              </thead>
              <tbody>
                  {#each responseDataArray as item, index (index)}
                  <tr class="hover">
                      <td>{index + 1}</td>
                      <td>{item.title}</td>
                      <td>{item.experience}</td>
                      <td><a href="{item.link_id}" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="20" width="20">
                        <path xmlns="http://www.w3.org/2000/svg" d="M8 8C5.75228 8 4 9.75228 4 12C4 14.2477 5.75228 16 8 16H10C10.5523 16 11 16.4477 11 17C11 17.5523 10.5523 18 10 18H8C4.64772 18 2 15.3523 2 12C2 8.64772 4.64772 6 8 6H10C10.5523 6 11 6.44772 11 7C11 7.55228 10.5523 8 10 8H8ZM13 7C13 6.44772 13.4477 6 14 6H16C19.3523 6 22 8.64772 22 12C22 15.3523 19.3523 18 16 18H14C13.4477 18 13 17.5523 13 17C13 16.4477 13.4477 16 14 16H16C18.2477 16 20 14.2477 20 12C20 9.75228 18.2477 8 16 8H14C13.4477 8 13 7.55228 13 7ZM7 12C7 11.4477 7.44772 11 8 11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H8C7.44772 13 7 12.5523 7 12Z" fill="#0D0D0D"></path>
                        </svg></a></td>
                      <td><i class="far fa-eye" on:click={() => openModal(item.title, item.experience, item.job, item.link_id)}>
                        <svg class="zoom-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="20" width="20">
                          <path xmlns="http://www.w3.org/2000/svg" d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" fill="#0D0D0D"></path>
                          <path xmlns="http://www.w3.org/2000/svg" d="M21.8944 11.5528C19.7362 7.23635 15.9031 5 12 5C8.09687 5 4.26379 7.23635 2.10557 11.5528C1.96481 11.8343 1.96481 12.1657 2.10557 12.4472C4.26379 16.7637 8.09687 19 12 19C15.9031 19 19.7362 16.7637 21.8944 12.4472C22.0352 12.1657 22.0352 11.8343 21.8944 11.5528ZM12 17C9.03121 17 5.99806 15.3792 4.12966 12C5.99806 8.62078 9.03121 7 12 7C14.9688 7 18.0019 8.62078 19.8703 12C18.0019 15.3792 14.9688 17 12 17Z" fill="#0D0D0D"></path>
                          </svg>
                        </i>
                      </td>
                  </tr>
                  {/each}
              </tbody>
          </table>
      </div>
  </div>
  </div>

    
<!--     
    {#if !showRefresh}
    <div>
        <Search />
        <button class="secondary outline" on:click={toggleButtons} style="font-size: 12px; padding: 20px; width: 20%; display: inline-block; margin-left: 10px">Toggle</button>
    </div>
    {/if}
  
    <div class='grid'>
    {#if showRefresh}
      <button  class="btn" style="font-size: 12px; padding: 20px; width: 20%;  display: inline-block; margin-left: 80%;" on:click={onSubmit}>Refresh</button>
      <button class="secondary outline" on:click={toggleButtons} style="font-size: 12px; padding: 20px; width: 20%; display: inline-block; margin-left: 10px">Toggle</button>
    {/if}
  
    
    </div> -->
  
    <!-- <div style="max-height: 600px; overflow-y: auto;">
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
                 <td><i class="far fa-eye" on:click={() => openModal(item.title, item.experience, item.job,item.link_id)}></i></td>
               </tr>
             {/each}
           </tbody>
         </table>
       </div> -->
  
       <!-- {#if showModal}
  <div class="modal" on:click={handleOverlayClick}>
    <div class="modal-content">
      <h2 style="margin-bottom: 2%">{modalContent.title}</h2>
      <div class="experience">
        <h3>Exp: {modalContent.experience}</h3>
      </div>
      <div class='description'>
        {modalContent.description}
      </div>
      <p><a href={modalContent.link} target="_blank">Learn more</a></p>
      <button on:click={closeModal}>Close</button>
    </div>
  </div>
{/if} -->
  <!-- </div> -->

  