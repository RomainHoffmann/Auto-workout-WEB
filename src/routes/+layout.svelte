<script lang="ts">
  import Header from "$lib/components/layout/Header.svelte"
  import { onDestroy } from "svelte"
  import { login, user } from "../hooks/auth"
  import Login from "$lib/components/login/Login.svelte"
  import { goto } from "$app/navigation"

  let isAuthentificated: boolean = false
  const unsubscribe = user.subscribe((value) => {
    isAuthentificated = value !== null
  })

  onDestroy(() => {
    unsubscribe()
  })
</script>

{#if isAuthentificated}
  <Header />
  <slot />
{:else}
  <Login />
{/if}
