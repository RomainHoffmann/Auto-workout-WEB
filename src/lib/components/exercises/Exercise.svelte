<script lang="ts">
  import ActionColorButton from "../shared/ActionColorButton.svelte"

  export let exercise: ExerciseItem
  export let ex_index: number
  export let removeExerciseFromProgram: (ex_index: number) => void

  let showDetails: boolean = false
</script>

<div class="container">
  <div class="exercise__header">
    <p class="exercise__title">{exercise.move.name}</p>
    <ActionColorButton
      onClick={() => {
        showDetails = !showDetails
      }}
      title="SHOW DETAILS"
    />
  </div>
  <div class="exercise__detail">
    {#if showDetails}
      <ActionColorButton
        onClick={() => {
          removeExerciseFromProgram(ex_index)
        }}
        title="REMOVE EXERCISE"
      />
      {#each exercise.sets as set}
        <div class="set__container">
          Weight <input
            class="set__input"
            type="text"
            bind:value={set.weight}
          />
          Reps<input class="set__input" type="text" bind:value={set.reps} />
          <ActionColorButton
            onClick={() => {
              exercise.sets = exercise.sets.filter((s) => s !== set)
            }}
            title="X"
          />
        </div>
      {/each}
      <ActionColorButton
        onClick={() => {
          exercise.sets = [...exercise.sets, { weight: 0, reps: 0 }]
        }}
        title="ADD SET"
      />
    {/if}
  </div>
</div>

<style>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 1px solid black;
    width: 50%;
  }

  .exercise__title {
    font-size: 2rem;
    width: 40%;
  }

  .exercise__detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .set__container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    padding: 1rem;
  }

  .exercise__header {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
  }

  .set__input {
    width: 10%;
    padding: 1rem;
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid var(--action-color);
    background-color: var(--secondary-color);
    color: var(--text-color);
    text-align: center;
  }
</style>
