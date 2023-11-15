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
          },
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            password: true,
            profile_pic: true,
            verified: true,
            cart: {
              select: {
                id: true,
              }
            }
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
    jwt({user,token,trigger,session}){
      if(trigger == 'update'){
        token.name = session.name;
        token.image = session.image;
      }
      if(user?.username){
        token.id = user.id;
        token.name = user.name;
        token.username = user.username;
        token.email = user.email;
        token.image = user.profile_pic;
        token.cartId = user.cart.id;
      }
      return token;
    },
    session({session, token}){
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.username = token.username;
      session.user.email = token.email;
      session.user.image = token.image;
      session.user.cartId = token.cartId;
      return session;
    }
  }
}


const useServerSession = () => getServerSession(authOptions)
export default useServerSession