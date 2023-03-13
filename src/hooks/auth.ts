import { writable } from "svelte/store"

export const user = writable<null | string>(null)

export const login = (jwt: string) => {
  user.set(jwt)
}

export const logout = () => {
  user.set(null)
}

//get the value
