<script>
    import DashboardCard from '$lib/components/DashboardCard.svelte';
    import Sidebar from '$lib/components/Sidebar.svelte';

    let path = 'admin';
	let name = 'Admin';

    let summaryProductRoute = '/content-summary';
    let summaryProductTitle = 'Content Summary';
    let summaryProductDescription = 'You can check your product summary, functionalities and objective';

    let extactionProductRoute = '/content-extraction';
    let extractionProductTitle = 'Content Extraction';
    let extractionProductDescription = 'You can play with it and check the current data of your choice';

</script>

<style>

</style>

<div class="flex h-screen">
    <Sidebar {path} {name}></Sidebar>
    <div class="flex-1 flex flex-col items-center justify-center p-4">
        <h2 class="card-title ml-16">Select your Product</h2>
        <div class="grid grid-cols-3 gap-4">
            
             <div class="inline-block w-48 h-36 border border-gray-300 m-16 ml-36">
                <DashboardCard productName={summaryProductTitle} productDescription={summaryProductDescription} productPath={summaryProductRoute} />
            </div>
            <div class="inline-block w-48 h-36 border border-gray-300 m-16 ml-36">
                <DashboardCard productName={extractionProductTitle} productDescription={extractionProductDescription} productPath={extactionProductRoute} />
            </div>
            <!-- <div class="inline-block w-48 h-36 border border-gray-300 m-16 ml-36">
                <DashboardCard />
            </div>
            <div class="inline-block w-48 h-36 border border-gray-300 m-16 ml-36">
                <DashboardCard />
            </div>
            <div class="inline-block w-48 h-36 border border-gray-300 m-16 ml-36">
                <DashboardCard />
            </div>
            <div class="inline-block w-48 h-36 border border-gray-300 m-16 ml-36">
                <DashboardCard />
            </div> -->
        </div>

    </div>
</div>