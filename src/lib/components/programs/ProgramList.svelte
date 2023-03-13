<script lang="ts">
  import ActionColorButton from "../shared/ActionColorButton.svelte"
  import ProgramCard from "$lib/components/programs/ProgramCard.svelte"
  import { goto } from "$app/navigation"
  import { user } from "../../../hooks/auth"
  import { onDestroy } from "svelte"
  export let items: ProgramItem[] = []

  let jwt: string = ""

  const unsubscribe = user.subscribe((value) => {
    if (value !== null) {
      jwt = value
    }
  })

  onDestroy(() => {
    unsubscribe()
  })

  const removeProgram = async (id: number) => {
    await fetch(`http://localhost:3000/programs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    })
    items = items.filter((item) => item.id !== id)
  }
</script>

<div class="container">
  <ul class="list__container">
    {#each items as program}
      <ProgramCard {program} {removeProgram} />
    {/each}
  </ul>

  <ActionColorButton
    onClick={() => {
      goto("/me/programs/new")
    }}
    title="NEW PROGRAM"
  />
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .list__container {
    padding: 0;
    margin: 0;
    list-style-type: none;
    width: 50%;
  }
</style>
