<script>
	import Maintable from "./Maintable.svelte";
  import * as XLSX from 'xlsx';

    let searchValue = '';
    let optionValue = '';
    let responseData = {"message": []};
    let isLoading = false;

    const onSubmit = async() => {
        console.log(searchValue);
        console.log(optionValue);
        isLoading = true;
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
      responseData = data;
      console.log(responseData)

    } catch (error) {
      console.error("Error fetching data:", error.message);
        }
      finally {
        isLoading = false;
      }
    }

function jsonToTable(responseData) {
    const headers = Object.keys(responseData.message[0]);

    return {
    headers,
    rows: responseData.message.map(item => Object.values(item))
};
}

function downloadJson() {
    const jsonContent = JSON.stringify(responseData, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function downloadExcel() {
    const jsonContent = responseData.message;
    const ws = XLSX.utils.json_to_sheet(jsonContent);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");

    const blob = XLSX.write(wb, { bookType: 'xlsx', type: 'blob' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function downloadCSV() {
    // Convert JSON data to CSV format
    const csvData = responseData.message.map(item => Object.values(item).join(',')).join('\n');

    // Create a Blob containing the CSV data
    const blob = new Blob([csvData], { type: 'text/csv' });

    // Create a download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'data.csv';

    // Append the link to the document
    document.body.appendChild(link);

    // Trigger the click event to download the file
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
  }

</script>

<style>
        table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
  
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
  
    th {
      background-color: #f2f2f2;
    }
  
    tr:hover {
      background-color: #f5f5f5;
    }

    .loader {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #3498db;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    margin: 20px auto;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

</style>

<form on:submit|preventDefault={onSubmit}>
    <div class='grid' style="margin-left: 0%;">
        <input bind:value={searchValue} type="text" id="Searchbar" name="Searchbar" placeholder="Search" required style="width:150%; border-radius: 25px">
        <div class="grid">
            <select bind:value={optionValue} style="width:55%; float:right; margin-left: 100%;  border-radius: 25px">
                <option value="" disabled selected>Select</option>
                <option>product</option>
                <option>job</option>
            </select>
            <button style="width:50%; float:right; margin-left: 50%;  border-radius: 25px" type="submit">Search</button>
        </div>
    </div>
</form>
{#if isLoading}
        <div class="loader"></div>
  {/if}
<div style="margin-top: 1%;  overflow-y: auto; max-height: 400px;">
    {#if responseData.message.length > 0}
    <table>
      <thead>
        <tr>
          {#each jsonToTable(responseData).headers as header}
            <th>{header}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each jsonToTable(responseData).rows as row}
          <tr>
            {#each row as cell}
              <td>{cell}</td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>
<div style="margin-top: 20px;">
  {#if responseData.message.length > 0}
  <button style="width:10%; float:right; margin:2%;" on:click={downloadCSV}>CSV</button>
  <button style="width:10%; float:right; margin:2%;" on:click={downloadJson}>JSON</button>
  {/if}
</div>

