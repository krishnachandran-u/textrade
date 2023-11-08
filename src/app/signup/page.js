"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from "next/link"
import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { sendVerificationEmail } from "@/lib/sendVerificationEmail"
import { Check, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { DialogBox } from "@/components/verifyEmailDialog"
import { Toaster } from "@/components/ui/toaster"

const colleges = [
  { label: "College of Engineering Trivandrum", value: "College of Engineering Trivandrum" },
  { label: "TKM college of Engineering Kollam", value: "tkmce" },
  { label: "MA college", value: "mace" },
  { label: "Gov Engineering college Trissur", value: "gect" },
]

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  username: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }).max(12, {
    message: "Username must be at most 12 characters.",
  }).regex(/^\S*$/,{
    message: "Username must not contain spaces.",
  }),
  college: z.string({
    required_error: "Please select your college.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ["confirmPassword"],
    });
  }
});

export default function InputForm() {

  const [openVerifyEmailDialog,setOpenVerifyEmailDialog] = useState(false)
  const [email,setEmail] = useState('')

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues:{
      name:'',
      email:'',
      username:'',
      password:'',
      confirmPassword:''
    }
  })

  async function onSubmit(data) {
    await axios.post('api/auth/signup',JSON.stringify(data)).then(async (res) => {
      if(res.status == 201){
        toast({title: "Account Created", description: "Your account has been created successfully"})
        setOpenVerifyEmailDialog(true)
        await sendVerificationEmail(data.username,data.email)
        setEmail(data.email)
      }
      else if(res.status == 207){
        toast({title: "Account Found, Not activated", description: "Account found, but not activated.You have to activate your account"})
        await sendVerificationEmail(data.username,data.email)
        setOpenVerifyEmailDialog(true)
        setEmail(data.email)
      }
      else if(res.status == 208){
        form.setError('email', { type: 'custom', message: 'Email already registered'}, { shouldFocus: true });
      }
    }).catch((err) => {
      toast({title: "Error", description: "Something went wrong"})
    })
  } 

  return (
    <>
      <DialogBox email={email} open={openVerifyEmailDialog} onOpenChange={setOpenVerifyEmailDialog}/>
      <div className="flex flex-col items-center h-full justify-center gap-6 p-3">
        <h1 className="text-5xl">textrade.store</h1>
        <div className="w-[min(100%,450px)] flex flex-col items-center border border-3 border-black p-2 space-y-2 rounded-lg">
          <h1 className="text-black text-2xl">SignUp</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-3/4 space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="mail@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="college"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full">
                    <FormLabel>College</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "justify-between w-full",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? colleges.find(
                                  (college) => college.value === field.value
                                )?.label
                              : "Select your college"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="p-0 w-[320px]">
                        <Command>
                          <CommandInput placeholder="Search College..." />
                          <CommandEmpty>No college found.</CommandEmpty>
                          <CommandGroup>
                            {colleges.map((college) => (
                              <CommandItem
                                value={college.label}
                                key={college.value}
                                onSelect={() => {
                                  form.setValue("college", college.value)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    college.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {college.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
          <Link href={'/login'} className="text-sm pb-1">Already have an account?<span className="underline">log in</span></Link>
        </div>
      </div>
      <Toaster/>
    </>
  )
}