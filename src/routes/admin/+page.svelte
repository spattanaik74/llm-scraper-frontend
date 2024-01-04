<script>
	import Navbar from "$lib/components/Navbar.svelte";
    import {onMount} from 'svelte';

    let responseData = '';
    let data = '';

    let link = '';
    let search = '';

    let uid_array = [];

    onMount(async () => {
    await fetchData();
    console.log(uid_array)
  });


  
  const onSubmit = async () => {
    console.log(link)
    console.log(search)
    try {
      const response = await fetch('http://127.0.0.1:8000/add/website', {
        method: 'POST', // Assuming you want to add a value using POST request
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link, search }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      await fetchData();

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
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({uid}),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Fetch updated data after deletion
      await fetchData();

    } catch (error) {
      console.error('Error deleting value:', error);
    }
  };

  
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
</style>

<div class="custom-container">
    <Navbar></Navbar>
<form on:submit|preventDefault={onSubmit}>
    <div class='grid' style="margin-left: 0%;">
        <input bind:value={link} type="text" id="Searchbar" name="Searchbar" placeholder="website link.." required style="width:150%; border-radius: 25px">
        <div class="grid">
            <select bind:value={search} style="width:55%; float:right; margin-left: 100%;  border-radius: 25px">
                <option value="" disabled selected>Select</option>
                <option>product</option>
                <option>job</option>
            </select>
            <button style="width:50%; float:right; margin-left: 50%;  border-radius: 25px" type="submit">Add</button>
        </div>
    </div>
</form>
    <div style="max-height: 600px; overflow-y: auto;">
     <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Website</th>
            <th>Product</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {#each data as item,  index (index)}
            <tr>
              <td>{index + 1}</td>
              <td><a href={item.link} target="_blank">{item.link}</a></td>
              <td>{item.search}</td>
              <td><a on:click={() => onDelete(item.uid)}>Delete</a></td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
</div>