<script>
    import ChatPage from "$lib/components/ChatPage.svelte";
import Sidebar from "$lib/components/Sidebar.svelte";

    let name = 'Home';
	let path = '/';

</script>
<div class="flex items-center justify-center h-screen">
    <Sidebar name={name} path={path}/>
    <div class="ml-4">
        <div class="w-100 h-100 bg-white p-8 rounded-lg shadow-md">
            <ChatPage />
        </div>
    </div>
</div>
