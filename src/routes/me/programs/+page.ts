import { error } from "@sveltejs/kit"
import { user } from "../../../hooks/auth"

export const prerender = true

export const load = async ({ fetch }): Promise<{ list: ProgramItem[] }> => {
  let jwt: string = ""
  user.subscribe((value) => (jwt = value!))
  const response = await fetch("http://localhost:3000/programs", {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  })
  const programs: ProgramItem[] = await response.json()
  return {
    list: programs,
  }
}
