import { getServerSession } from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials"
import prismadb from "@/lib/prismadb"
import { compare } from "bcryptjs"

export const authOptions = {
    providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials, req) {
        const user = await prismadb.users.findUnique({
          where: {
            email: credentials.email
          }
        })
        if (user) {
          const isValid = await compare(credentials.password, user.password)
          if(user.verified === false){
            throw Error("Not Activated")
          }
          if(isValid){
            return user;
          }
          else{
            throw Error("Invalid Password")
          }
        } else {
          throw Error("Invalid Email")
        }

      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session:{
    strategy: "jwt",
    maxAge: 10 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
    verifyRequest: "/login",
    newUser: "/signup"
  },
  callbacks: {
    jwt(params){
      if(params.user?.username){
        params.token.id = params.user.id;
        params.token.name = params.user.name;
        params.token.username = params.user.username;
        params.token.email = params.user.email;
        params.token.image = params.user.profile_pic;
      }
      return params.token;
    },
    session({session, token}){
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.username = token.username;
      session.user.email = token.email;
      session.user.image = token.image;
      return session;
    }
  }
}


const useServerSession = () => getServerSession(authOptions)
export default useServerSession