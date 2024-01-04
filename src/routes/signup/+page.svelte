
<script>
    	import { goto } from "$app/navigation";

        let username = '';
        let email = '';
        let password = '';

        const submit = async () => {
            await fetch('http://127.0.0.1:8000/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            });

            await goto('/login')
}
</script>
<style>
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Arial, sans-serif;
    }

    .container {
        max-width: 600px;
        margin: 0 auto; 
        padding: 50px; 
    }

    hgroup {
        text-align: center; /* Center the text within hgroup */
    }

    form {
        display: grid;
        gap: 10px;
    }

    input,
    button {
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
    }

    button.contrast {
        background-color: #3498db;
        color: #fff;
    }
</style>

<body>
    <main class="container">
        <article class="grid">
            <div>
                <hgroup>
                    <h1>Sign up</h1>
                    <h2>Please enter your detail</h2>
                </hgroup>
                <form  on:submit|preventDefault={submit}>
                    <input bind:value={username} type="text" name="First Name" placeholder="Username" aria-label="Login" autocomplete="nickname"
                        required>
                    <input bind:value={email} name="Email" placeholder="Email" aria-label="Login" autocomplete="nickname"
                        required>
                    <input  bind:value={password} name="password" placeholder="Password" aria-label="Password"
                        autocomplete="current-password" required>
    
                    <button type="submit" class="contrast">Submit</button>
                </form>
            </div>
        </article>
    </main>
</body>