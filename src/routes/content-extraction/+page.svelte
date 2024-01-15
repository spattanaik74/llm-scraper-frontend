<script>
	import Maintable from '$lib/components/Maintable.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Search from '$lib/components/Search.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	// import { authenticated } from '.../stores/auth';
	import { goto } from '$app/navigation';
	import Jobcard from '$lib/components/jobcard.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';

	const dispatch = createEventDispatcher();

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
	let isChecked = true;
	
	let valueResponseData = '';
	let responseDataValue = {"message": []};

	function toggleCheckbox() {
    isChecked = true;
	console.log(isChecked)
  }

	function jsonToTable(responseDataValue) {
    const headers = Object.keys(responseDataValue.message[0]);

    return {
    headers,
    rows: responseDataValue.message.map(item => Object.values(item))
};
}
	onMount(async () => {
		await onSubmit();
		await getRecords();
		await getTotalRecords();
	});

	function toggleButtons() {
		showRefresh = !showRefresh;
	}

	let responseData = '';
	let responseDataArray = '';

	let searchValue = '';
	let optionValue = '';

	const onSubmitSearch = async() => {
        try {
            var url = `http://127.0.0.1:8000/v1/scrape/${optionValue}?link=${searchValue}`;
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
      console.log(responseDataValue)

    } catch (error) {
      console.error("Error fetching data:", error.message);
        }
    }


	const onSubmit = async () => {
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
	};

	let showModal = false;

	let recordsData = 0;
	let recordData = 0;

	let path = 'admin';
	let name = 'Admin';

	const getRecords = async () => {
		try {
			const response = await fetch('http://127.0.0.1:8000/records');
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			recordData = await response.json();
			recordsData = recordData['message'];
		} catch (error) {
			console.error('Error fetching products:', error);
		}
	};

	let totalRecords = '';
	let totalRecordsCount = '';

	const getTotalRecords = async () => {
		try {
			const response = await fetch('http://127.0.0.1:8000/total');
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			totalRecords = await response.json();
			totalRecordsCount = totalRecords['message'];
		} catch (error) {
			console.error('Error fetching products:', error);
		}
	};

	let modalContent = {
		title: '',
		experience: '',
		description: '',
		link: ''
	};

	let isOpenModal = false;
	let responseItemData = '';

	function formatDescription(inputString) {
		const skillsArray = inputString.split('","').map((skill) => skill.replace(/["{}]/g, '').trim());
		const formattedDescription = skillsArray.join(',\n');
		return formattedDescription;
	}

	function openModal(title, experience, link, job) {
		let job_format = formatDescription(job);
		console.log(job_format);
		console.log('WOrking');
		modalContent.title = title;
		modalContent.experience = experience;
		modalContent.link = link;
		modalContent.description = formatDescription(job_format);
		showModal = true;
		console.log(showModal);
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

<div class="flex h-screen">
	<Sidebar {path} {name}></Sidebar>
	<div class="flex-1 flex flex-col items-center justify-center p-4">
		<!-- Table container -->
		<form on:submit|preventDefault={onSubmitSearch}>
		<div class="flex mb-4 items-center">
			<input bind:value={searchValue}
				type="text"
				placeholder="Type here"
				class="input input-bordered input-accent w-full max-w-lg m-2 shadow-xl"
			/>
			<!-- Adjusted max-w, added mb-2 for margin-bottom -->
			<select bind:value={optionValue} class="select select-secondary w-full max-w-xs m-2 shadow-xl">
				<!-- Adjusted max-w, added mb-2 for margin-bottom -->
				<option disabled selected>Choose</option>
				<option>job</option>
				<option>product</option>
			</select>
			<button class="btn btn-outline btn-accent m-2 shadow-xl">Search</button>
		</div>
		</form>
		<input type="checkbox" class="toggle" bind:checked={isChecked} on:click={toggleCheckbox} />
		<div class="flex w-full max-w-screen-xl max-h-screen-lg">
			<div
				class="w-full max-w-screen-xl max-h-screen-sm m-10 ml-36 shadow-2xl"
				style="max-height: 700px; overflow-y: auto;"
			>
				{#if isChecked}
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
								<td>
									<a href={item.link_id} target="_blank">
									  <div style="display: flex; align-items: center;">
										<div>{item.url_name}</div>
										<div style="margin-left: 5px;"> <!-- Add some spacing between text and SVG -->
										  <svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											height="16"
											width="16"
										  >
											<path
											  xmlns="http://www.w3.org/2000/svg"
											  d="M12.2929 5.29289C12.6834 4.90237 13.3166 4.90237 13.7071 5.29289L19.7071 11.2929C19.8946 11.4804 20 11.7348 20 12C20 12.2652 19.8946 12.5196 19.7071 12.7071L13.7071 18.7071C13.3166 19.0976 12.6834 19.0976 12.2929 18.7071C11.9024 18.3166 11.9024 17.6834 12.2929 17.2929L16.5858 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L16.5858 11L12.2929 6.70711C11.9024 6.31658 11.9024 5.68342 12.2929 5.29289Z"
											  fill="#0D0D0D"
											></path>
										  </svg>
										</div>
									  </div>
									</a>
								  </td>
								<td>
									<!-- svelte-ignore a11y-no-static-element-interactions -->
									<!-- svelte-ignore a11y-click-events-have-key-events -->
									<div
										on:click={() => openModal(item.title, item.experience, item.link_id, item.job)}
									>
										<!-- svelte-ignore a11y-click-events-have-key-events -->
										<!-- svelte-ignore a11y-no-static-element-interactions -->
										<svg
											class="zoom-svg"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											height="20"
											width="20"
										>
											<path
												xmlns="http://www.w3.org/2000/svg"
												d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
												fill="#0D0D0D"
											></path>
											<path
												xmlns="http://www.w3.org/2000/svg"
												d="M21.8944 11.5528C19.7362 7.23635 15.9031 5 12 5C8.09687 5 4.26379 7.23635 2.10557 11.5528C1.96481 11.8343 1.96481 12.1657 2.10557 12.4472C4.26379 16.7637 8.09687 19 12 19C15.9031 19 19.7362 16.7637 21.8944 12.4472C22.0352 12.1657 22.0352 11.8343 21.8944 11.5528ZM12 17C9.03121 17 5.99806 15.3792 4.12966 12C5.99806 8.62078 9.03121 7 12 7C14.9688 7 18.0019 8.62078 19.8703 12C18.0019 15.3792 14.9688 17 12 17Z"
												fill="#0D0D0D"
											></path>
										</svg>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
				{/if}
				{#if responseDataValue.message.length > 0}
				{#if !isChecked}
				<table class="table table-lg w-full min-w-max table-pin-rows">
				  <thead>
					<tr>
					  {#each jsonToTable(responseDataValue).headers as header}
						<th>{header}</th>
					  {/each}
					</tr>
				  </thead>
				  <tbody>
					{#each jsonToTable(responseDataValue).rows as row}
					  <tr>
						{#each row as cell}
						  <td>{cell}</td>
						{/each}
					  </tr>
					{/each}
				  </tbody>
				</table>
			  {/if}
			  {/if}
			</div>
			<div class="absolute inset-y-32 right-32">
				<div class="stats stats-vertical shadow-2xl">
					<div class="stat">
						<div class="stat-title">Records</div>
						<div class="stat-value">{totalRecordsCount}</div>
						<div class="stat-desc">Jan 1st - Feb 1st</div>
					</div>

					<div class="stat">
						<div class="stat-title">Websites</div>
						<div class="stat-value text-secondary">{recordsData}</div>
						<div class="stat-desc text-secondary">↗︎ 400 (22%)</div>
					</div>

					<div class="stat">
						<div class="stat-title">Product type</div>
						<div class="stat-value">1,200</div>
						<div class="stat-desc">↘︎ 90 (14%)</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

{#if showModal}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="modal-custom" on:click={handleOverlayClick}>
		<div class="modal-content">
			<h2 class="font-bold text-lg" style="margin-bottom: 2%">{modalContent.title}</h2>
			<div class="font-bold text-lg mt-2">
				<h3>Exp: {modalContent.experience}</h3>
			</div>
			<div class="description mt-4">
				<p>{modalContent.description}</p>
			</div>
			<p class="mt-8" ><a href={modalContent.link} target="_blank" style="color: #307bf2;">Learn more</a></p>
			<button class="btn btn-outline mt-4" on:click={closeModal}>Close</button>
		</div>
	</div>
{/if}

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

	.modal-custom {
		display: flex;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
		background: rgba(11, 11, 11, 0.219);
		z-index: 999;
	}

	.modal-content {
		background: #ece3ca;
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
	}
</style>
