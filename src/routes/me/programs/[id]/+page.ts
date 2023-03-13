import { error } from "@sveltejs/kit"
import { user } from "../../../../hooks/auth"

export const prerender = true

export const load = async ({
  params,
  fetch,
}): Promise<{
  program: ProgramItem
  moves: MoveItem[]
}> => {
  const { id } = params
  let program: ProgramItem
  let moves: MoveItem[]
  let jwt: string = ""

  const unsubscribe = user.subscribe((value) => {
    if (value !== null) {
      jwt = value
    }
  })

  if (id === "new") {
    program = {
      name: "",
      active: false,
      exercises: [],
    }
  } else {
    const response = await fetch(`http://localhost:3000/programs/${id}`, {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    })
    program = await response.json()
  }

  moves = await (
    await fetch("http://localhost:3000/moves", {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    })
  ).json()

  return {
    program,
    moves,
  }
}
