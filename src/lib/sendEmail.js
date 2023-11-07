'use server'
import React from "react"
import { Resend } from "resend"
import { getErrorMessage } from "@/lib/utils"
import verifyEmailForm from "@/components/VerificationEmail"

const resend = new Resend(process.env.RESENT_API_KEY)

export const sendEmail = async (email,activationUrl) => {
  let data
  try{
      data = resend.emails.send({
      from:"Textrade.store Verify<onboarding@textrade.irfan.live>",
      to:email,
      subject:"Textrade.store Email Verification",
      react: React.createElement(verifyEmailForm, {
        userEmail:email,
        activationUrl:activationUrl,
      }),
    })
  }
  catch(error){
    return {
      error:getErrorMessage(error)
    }
  }
  return{
    data
  }
}