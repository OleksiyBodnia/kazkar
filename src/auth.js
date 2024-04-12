import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from '@auth/sveltekit/providers/github'
import Google from "@auth/sveltekit/providers/google"
 
export const { handle } = SvelteKitAuth({
  providers: [Google, GitHub],
}) 
