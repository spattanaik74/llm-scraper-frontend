
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
                <form>
                    <input type="text" name="First Name" placeholder="First Name" aria-label="Login" autocomplete="nickname"
                        required>
                    <input type="text" name="Last Name" placeholder="Last Name" aria-label="Login" autocomplete="nickname"
                        required>
                    <input type="email" name="Email" placeholder="Email" aria-label="Login" autocomplete="nickname"
                        required>
                    <input type="password" name="password" placeholder="Password" aria-label="Password"
                        autocomplete="current-password" required>
                    
                    <input type="password" name="password" placeholder="Check Password" aria-label="Password"
                        autocomplete="current-password" required>
    
                    <button type="submit" class="contrast">Submit</button>
                </form>
            </div>
        </article>
    </main>
</body>