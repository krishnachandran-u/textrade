'use server'
import prismadb from "@/lib/prismadb";
import { sendEmail } from "@/lib/sendEmail";

export const sendVerificationEmail = async (username,email) => {
  const activationKey = `${crypto.randomUUID()}${crypto.randomUUID()}`.replace(/-/g, "");
  try{
    await prismadb.users.update({
      where:{
        username:username
      },
      data:{
        activationKey:activationKey,
        activationSentAt: new Date()
      }
    })
    await sendEmail(email,username,`http://${process.env.NEXT_PUBLIC_HOSTNAME}/login?email=${email}&token=${activationKey}`)
  }
  catch(error){
    return {
      error:error
    }
  }
}