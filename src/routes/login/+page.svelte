<script>
    import { goto } from "$app/navigation";

    let name = '';
    let email = '';
    let password = '';

    const submit = async () => {
        await fetch('http://127.0.0.1:8000/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email,
                password
            }, )
        });

        await goto('/')
}
</script>
<body>
    <main class="container">
        <article class="grid">
            <div>
                <hgroup>
                    <h1>Sign in</h1>
                    <h2>Please enter your detail</h2>
                </hgroup>
                <form on:submit|preventDefault={submit}>
                    <input bind:value={email} type="email" name="Email" placeholder="Email" aria-label="Login" autocomplete="nickname"
                        required>
                    <input bind:value={password} type="password" name="password" placeholder="Password" aria-label="Password"
                        autocomplete="current-password" required>
                    <fieldset>
                        <label for="remember">
                            <input type="checkbox" role="switch" id="remember" name="remember">
                            Remember me
                        </label>
                    </fieldset>
                    <button type="submit" class="contrast">Submit</button>
                </form>
            </div>
            <div>
                <img src="https://cdn.pixabay.com/photo/2023/02/13/05/58/doodle-7786568__340.png" alt="no image">
            </div>
        </article>
    </main>
</body>