<script lang="ts">
  import { goto } from "$app/navigation"
  import MoveSearchBar from "$lib/components/moves/MoveSearchBar.svelte"
  import ExerciseSection from "$lib/components/exercises/ExercisesSection.svelte"
  import { onDestroy } from "svelte"
  import { user } from "../../../../hooks/auth"
  export let data

  let jwt: string = ""

  const unsubscribe = user.subscribe((value) => {
    if (value !== null) {
      jwt = value
    }
  })

  onDestroy(() => {
    unsubscribe()
  })

  const save = async () => {
    const url = data.program.id
      ? `http://localhost:3000/programs/${data.program.id}`
      : "http://localhost:3000/programs"
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify(data.program),
    })
    goto("/me/programs")
  }

  const addExerciseToProgram = (exercise: ExerciseItem) => {
    data.program.exercises = [...data.program.exercises, exercise]
  }
</script>

<div class="container">
  <input class="program__name" bind:value={data.program.name} />
  <!-- <label for="prgram__active">
    Active
    <input
      id="program__active"
      class="program__active"
      type="checkbox"
      bind:checked={data.program.active}
    />
  </label> -->
  <ExerciseSection
    program={data.program}
    {addExerciseToProgram}
    moves={data.moves}
    {save}
  />
</div>

<style>
  .container {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    background-color: var(--secondary-color);
  }

  .program__name {
    font-size: 2rem;
    color: var(--text-color);
    background-color: var(--secondary-color);
    border: none;
    width: 50%;
    border-bottom: var(--action-color) 2px solid;
  }
</style>
