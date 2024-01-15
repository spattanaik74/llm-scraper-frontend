<script>
	export let productName = '';
	export let productDescription = '';
	export let productPath = '';

</script>


<div class="card w-96 bg-base-100 shadow-xl">
	<div class="card-body">
		<h2 class="card-title">{productName}</h2>
		<p>{productDescription}</p>
		<div class="card-actions justify-end">
			<a href="{productPath}" class="btn btn-primary">Select </a>
		</div>
	</div>
</div>
