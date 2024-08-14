//a catch all segment to catch all auth related pages i.e signin, signout etc
import NextAuth from "next-auth"

const handler = NextAuth({
    providers: []
})

export { handler as GET, handler as POST }