<script lang="ts">
  import { onDestroy } from "svelte"
  import { login, user } from "../../../hooks/auth"
  let username: string = ""
  let password: string = ""
  let error: any | undefined = undefined

  const MODE = {
    login: "login",
    register: "register",
  }

  const submit = async (e: Event, mode: string) => {
    e.preventDefault()

    const url =
      "http://localhost:3000" +
      (mode === MODE.login ? "/auth/login" : "/auth/register")

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })

    if (response.ok) {
      const { access_token } = await response.json()
      login(access_token)
    } else {
      error = await response.json()
      console.log(error)
    }
  }
</script>

<section class="container">
  <form class="form" action="POST">
    <input
      placeholder="Username"
      class="input"
      type="text"
      bind:value={username}
    />
    <input
      placeholder="Password"
      class="input"
      type="password"
      bind:value={password}
    />
    {#if error}
      <p class="error__message">Incorrect username or password</p>
    {/if}
    <div class="submit__container">
      <button
        class="submit"
        type="submit"
        on:click={(e) => {
          submit(e, MODE.login)
        }}>Login</button
      >
      <button
        class="submit"
        type="submit"
        on:click={(e) => {
          submit(e, MODE.register)
        }}>Register</button
      >
    </div>
  </form>
</section>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .input {
    margin: 1rem;
    padding: 0.5rem;
    border: 1px solid var(--secondary-color);
    border-radius: 0.5rem;
  }

  .submit {
    margin: 1rem;
    padding: 0.5rem;
    border: 1px solid var(--secondary-color);
    border-radius: 0.5rem;
    background-color: var(--secondary-color);
    color: var(--text-color);
    cursor: pointer;
  }

  .submit:hover {
    background-color: var(--action-color);
  }

  .error__message {
    color: red;
  }
</style>
