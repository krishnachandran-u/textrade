'use server'
import prismadb from "@/lib/prismadb";
import { sendEmail } from "@/lib/sendEmail";

export const sendVerificationEmail = async (email) => {
  const activationKey = `${crypto.randomUUID()}${crypto.randomUUID()}`.replace(/-/g, "");
  try{
    await prismadb.user.update({
      where:{
        email:email
      },
      data:{
        activationKey:activationKey,
        activationSentAt: new Date()
      }
    })
    await sendEmail(email,`http://${process.env.NEXT_PUBLIC_HOSTNAME}/login?email=${email}&token=${activationKey}`)
  }
  catch(error){
    console.log(error)
    return {
      error:error
    }
  }
}