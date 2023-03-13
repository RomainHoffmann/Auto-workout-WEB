<script lang="ts">
  import { onDestroy } from "svelte"
  import { user } from "../../../hooks/auth"

  export let moves: MoveItem[]
  export let addExerciseToProgram: (exercise: ExerciseItem) => void

  let input: string
  let autoCompleteItems: MoveItem[] = []
  let jwt: string = ""

  const unsubscribe = user.subscribe((value) => {
    if (value !== null) {
      jwt = value
    }
  })

  onDestroy(() => {
    unsubscribe()
  })

  const filterAutoCompleteItems = (input: string) => {
    let filteredItems: MoveItem[] = []
    input &&
      (filteredItems = moves.filter((move) =>
        move.name.toLowerCase().includes(input.toLowerCase())
      ))
    autoCompleteItems = filteredItems
  }

  const addMove = async () => {
    const move = await fetch(`http://localhost:3000/moves`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },

      body: JSON.stringify({
        name: input,
      }),
    })

    const newMove = await move.json()

    moves = [...moves, newMove]
  }

  $: filterAutoCompleteItems(input)
</script>

<input class="searchbar__input" bind:value={input} type="text" />
<div class="autocomplete__container">
  {#each autoCompleteItems as move}
    <div
      class="autocomplete__item"
      on:click={() => {
        const exercise = {
          move: move,
          sets: [],
        }
        input = ""
        addExerciseToProgram(exercise)
      }}
      on:keypress={() => {}}
    >
      {move.name}
    </div>
  {/each}
</div>
<button
  class="autocomplete__add"
  on:click={() => {
    addMove()
  }}>ADD</button
>

<style>
  .autocomplete__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;
  }

  .autocomplete__item {
    background-color: var(--secondary-color);
    color: var(--text-color);
    cursor: pointer;
    width: 100%;
    font-size: 2rem;
  }

  .autocomplete__item:hover {
    background-color: var(--action-color);
  }

  .searchbar__input {
    width: 50%;
    padding: 1rem;
    font-size: 2rem;
    border: none;
    border-bottom: 1px solid var(--action-color);
    background-color: var(--secondary-color);
    color: var(--text-color);
  }

  .autocomplete__add {
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
</style>
