<script>
    // Your Svelte script logic can go here
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
  </style>
  
  <main>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>John Doe</td>
          <td>john@example.com</td>
          <td>User</td>
        </tr>
        <tr>
          <td>Jane Doe</td>
          <td>jane@example.com</td>
          <td>Admin</td>
        </tr>
      </tbody>
    </table>
  </main>
  