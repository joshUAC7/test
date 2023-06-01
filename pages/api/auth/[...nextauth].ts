import axios from "axios"
import {NextApiRequest,NextApiResponse} from "next"
import {AuthOptions} from "next-auth"
import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"


type TokenResponse=
{
  access_token?:string
}
export const authOptions:AuthOptions = {

  providers:[
    GoogleProvider({
      clientId:  process.env.GOOGLE_CLIENT_ID!!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!!,
    }),
  ],
  callbacks: {
    async signIn({user,account,profile}){
      if(account?.provider == "google"){
        const {access_token,id_token} = account

        try{
          const response = await axios.post<TokenResponse>("http://192.168.1.10:3001/api/social/login/google/",{
            access_token: id_token,
          })

          const tokken = response.data
          user.accessToken = tokken.access_token
          return true
        }catch(error){
          return false
        }

      }
      return false
    },
    async jwt({token,user}){
      if(user){
        const {accessToken} = user
        token.accessToken = accessToken
      }
      return token
    },
    async session({session,user}){
      session.user.accessToken = user.accessToken
      return session
    }
  }

}

export default NextAuth(authOptions)
