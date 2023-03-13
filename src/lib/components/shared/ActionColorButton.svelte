<script lang="ts">
  export let onClick: () => void
  export let title: string
</script>

<button
  on:click={() => {
    onClick()
  }}>{title}</button
>

<style>
  button {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-color);
    background-color: var(--action-color);
    border: none;
    padding: 1rem;
    text-align: center;
    cursor: pointer;
  }
</style>
