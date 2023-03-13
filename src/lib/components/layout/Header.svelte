<script>
  import { goto } from "$app/navigation"
  import { logout } from "../../../hooks/auth"
</script>

<header>
  <nav>
    <a href="/">Home</a>
    <a href="/me">My Profile</a>
    <a
      href="/"
      on:click={() => {
        logout()
        goto("/")
      }}>Log out</a
    >
  </nav>
</header>

<style>
  header {
    background-color: var(--secondary-color);
    color: var(--text-color);
    padding: 1rem;
  }

  nav {
    display: flex;
    justify-content: center;
    gap: 4rem;
  }

  nav a {
    color: var(--text-color);
    text-decoration: none;
    padding: 0.5rem;
  }

  nav a:hover {
    background-color: var(--action-color);
  }
</style>
