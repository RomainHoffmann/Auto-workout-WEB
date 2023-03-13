<script lang="ts">
  import { goto } from "$app/navigation"
  import ActionColorButton from "../shared/ActionColorButton.svelte"
  export let program: ProgramItem
  export let removeProgram: (id: number) => void
  const id = program.id!
</script>

<li>
  <article class="container">
    <h3 class="program__title">{program.name}</h3>
    <div>
      <ActionColorButton
        title="X"
        onClick={() => {
          removeProgram(id)
        }}
      />
      <ActionColorButton
        title="EDIT"
        onClick={() => {
          goto(`/me/programs/${program.id}`)
        }}
      />
    </div>
  </article>
</li>

<style>
  .container {
    background-color: var(--secondary-color);
    padding: 1rem;
    margin: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .program__title {
    font-size: 2rem;
    font-weight: 600;
    color: var(--text-color);
  }
</style>
