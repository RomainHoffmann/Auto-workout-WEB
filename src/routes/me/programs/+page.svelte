<script>
    import ProgramList from "$lib/components/programs/ProgramList.svelte";
    export let data
</script>

<h1>Programs</h1>
<ProgramList items={data.list} />

