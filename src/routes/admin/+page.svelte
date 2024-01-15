<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import { onMount } from 'svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';

	let responseData = '';
	let data = '';

	let link = '';
	let search = '';

  let name = 'Home';
  let path = '/';

	let uid_array = [];

	onMount(async () => {
		await fetchData();
		await getRecords();
		await getTotalRecords();
		console.log(uid_array);
	});

	const onSubmit = async () => {
		console.log(link);
		console.log(search);
		try {
			const response = await fetch('http://127.0.0.1:8000/add/website', {
				method: 'POST', // Assuming you want to add a value using POST request
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ link, search })
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			await fetchData();
			await getRecords();
			await getTotalRecords();

			// Clear the input fields after successful submission
			link = '';
			search = '';
		} catch (error) {
			console.error('Error adding value:', error);
		}
	};

	const fetchData = async () => {
		try {
			const response = await fetch('http://127.0.0.1:8000/website');
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			responseData = await response.json();
			data = responseData['message'];

			// Loop through data and extract uids
			data.forEach((item) => {
				if (item && item.uid) {
					uid_array.push(item.uid);
				}
			});
		} catch (error) {
			console.error('Error fetching products:', error);
		}
	};

	const onDelete = async (uid) => {
		try {
			const response = await fetch(`http://127.0.0.1:8000/delete/website/`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ uid })
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			// Fetch updated data after deletion
			await fetchData();
			await getRecords();
			await getTotalRecords();
		} catch (error) {
			console.error('Error deleting value:', error);
		}
	};

	let recordsData = 0;
	let recordData = '';

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
	let totalRecordsCount = 0;

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
</style>


<!-- <div"> -->
<div class="flex h-screen">
	<Sidebar path={path} name={name}></Sidebar>

	<div class="flex-1 flex flex-col items-center justify-center p-4">
		<!-- Table container -->
		<form on:submit|preventDefault={onSubmit}>
			<div class="flex mb-4 items-center">
				<input
					bind:value={link}
					type="text"
					placeholder="Type here"
					class="input input-bordered input-accent w-full max-w-lg m-2 shadow-xl"
				/>
				<!-- Adjusted max-w, added mb-2 for margin-bottom -->
				<select bind:value={search} class="select select-secondary w-full max-w-xs m-2 shadow-xl">
					<!-- Adjusted max-w, added mb-2 for margin-bottom -->
					<option disabled selected>Choose</option>
					<option>job</option>
					<option>product</option>
				</select>
				<button class="btn btn-outline btn-accent m-2 shadow-xl">Add</button>
			</div>
		</form>
		<div class="flex w-full max-w-screen-xl max-h-screen-lg">
			<div
				class="w-full max-w-screen-xl max-h-screen-sm m-10 ml-36 shadow-2xl"
				style="max-height: 700px; overflow-y: auto;"
			>
				<table class="table table-lg w-full min-w-max table-pin-rows">
					<thead>
						<tr>
							<th>No.</th>
							<th>Website</th>
							<th>Type</th>
							<th>Edit</th>
						</tr>
					</thead>
					<tbody>
						{#each data as item, index (index)}
							<tr>
								<td>{index + 1}</td>
								<td><a href={item.link} target="_blank">{item.link}</a></td>
								<td>{item.search}</td>
								<td><a on:click={() => onDelete(item.uid)}>
                  <svg class="zoom-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="20" width="20">
                  <path xmlns="http://www.w3.org/2000/svg" d="M7 4C7 2.89543 7.89543 2 9 2H15C16.1046 2 17 2.89543 17 4V6H18.9897C18.9959 5.99994 19.0021 5.99994 19.0083 6H21C21.5523 6 22 6.44772 22 7C22 7.55228 21.5523 8 21 8H19.9311L19.0638 20.1425C18.989 21.1891 18.1182 22 17.0689 22H6.93112C5.88184 22 5.01096 21.1891 4.9362 20.1425L4.06888 8H3C2.44772 8 2 7.55228 2 7C2 6.44772 2.44772 6 3 6H4.99174C4.99795 5.99994 5.00414 5.99994 5.01032 6H7V4ZM9 6H15V4H9V6ZM6.07398 8L6.93112 20H17.0689L17.926 8H6.07398ZM10 10C10.5523 10 11 10.4477 11 11V17C11 17.5523 10.5523 18 10 18C9.44772 18 9 17.5523 9 17V11C9 10.4477 9.44772 10 10 10ZM14 10C14.5523 10 15 10.4477 15 11V17C15 17.5523 14.5523 18 14 18C13.4477 18 13 17.5523 13 17V11C13 10.4477 13.4477 10 14 10Z" fill=" #EE4B2B "></path>
                  </svg>
                </a>
              </td>
							</tr>
						{/each}
					</tbody>
				</table>
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

