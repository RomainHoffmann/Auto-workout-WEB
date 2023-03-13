<script lang="ts">
  import MoveSearchBar from "../moves/MoveSearchBar.svelte"
  import Exercise from "./Exercise.svelte"
  export let program: ProgramItem
  export let moves: MoveItem[]
  export let addExerciseToProgram: (exercise: ExerciseItem) => void
  export let save: () => void

  const removeExerciseFromProgram = (ex_index: number) => {
    program.exercises = program.exercises.filter((_, i) => i !== ex_index)
  }
</script>

<h1>Exercises</h1>
<MoveSearchBar {moves} {addExerciseToProgram} />
{#each program.exercises as exercise, ex_index}
  <Exercise {exercise} {removeExerciseFromProgram} {ex_index} />
{/each}
<button class="program__save" on:click={save}>SAVE</button>

<style>
  .program__save {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-color);
    background-color: var(--action-color);
    border: none;
    padding: 1rem;
    width: 50%;
    text-align: center;
    cursor: pointer;
  }

  .program__save:hover {
    background-color: #c47739;
  }
</style>
