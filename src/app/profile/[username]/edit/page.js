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
    PopoverContent,
    Popover,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { DialogBox } from "@/components/VerifyEmailDialog"
import { Toaster } from "@/components/ui/toaster"
import { Textarea } from "@/components/ui/textarea"
import { SingleImageDropzone } from "@/components/ProfileDropZone"

const FormSchema = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email.",
    }),
    college: z.string({
        required_error: "Please select your college.",
    }),
    note: z.string({
    }),
});

const colleges = [
    { label: "College of Engineering Trivandrum", value: "College of Engineering Trivandrum" },
    { label: "TKM college of Engineering Kollam", value: "tkmce" },
    { label: "MA college", value: "mace" },
    { label: "Gov Engineering college Trissur", value: "gect" },
]

const branches = [
    { label: "Computer Science", value: "CSE" },
    { label: "Electronics", value: "ECE" },
    { label: "Electrical", value: "EEE" },
    { label: "Mechanical", value: "ME" },
    { label: "Civil", value: "CE" },
]

export default function EditProfile(){
    const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues:{
        name:'',
        email:'',
        college:'',
        note: '',
    }
})

    return ( 
        <div className="flex flex-col items-center h-full justify-center gap-6 p-3 pb-16 sm:pb-12">
            <div className="flex flex-col items-center p-4 px-8 space-y-2 rounded-lg border border-black">
                <h1 className="text-3xl">Edit Profile</h1> 
                <div className="h-[150px] w-[150px]">
                    <SingleImageDropzone/>
                </div>
                <Form {...form}>
                    <form className="space-y-4 flex flex-col sm:items-center">  

                        {/* Email and Phonenumber */}
                        <div className="flex flex-col gap-4">
                            <div className="sm:flex gap-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="min-w-[330px]">
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
                                    name="phoneNo"
                                    render={({ field }) => (
                                        <FormItem className="min-w-[330px]">
                                            <FormLabel>Phone</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your phone number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* College branch and Passout year */}
                            <div className="flex sm:flex-row sm:gap-6 gap-4 flex-col">
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
                                                <PopoverContent className="p-0 w-[330px]">
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
                                <div className="w-full flex gap-2">
                                    <FormField
                                        control={form.control}
                                        name="branch"
                                        render={({ field }) => (
                                        <FormItem className="flex flex-col w-1/2">
                                            <FormLabel>Branch</FormLabel>
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
                                                        ? branches.find(
                                                            (branch) => branch.value === branch.value
                                                            )?.label
                                                            : "Your branch"}
                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="p-0 w-[320px]">
                                                        <Command>
                                                        <CommandInput placeholder="Search Branch..." />
                                                        <CommandEmpty>No college found.</CommandEmpty>
                                                            <CommandGroup>
                                                            {branches.map((branch) => (
                                                                <CommandItem
                                                                    value={branch.label}
                                                                    key={branch.value}
                                                                        onSelect={() => {
                                                                        form.setValue("college", branch.value)
                                                                    }}
                                            >
                                                                    <Check
                                                                        className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        branch.value === field.value
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                        )}
                                                                    />
                                                                    {branch.label}
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
                                        name="passoutyear"
                                        render={({ field }) => (
                                        <FormItem className="flex flex-col w-1/2">
                                            <FormLabel className="">Passout Year</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select year"/>
                                                </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="2023">2023</SelectItem>
                                                    <SelectItem value="2024">2024</SelectItem>
                                                    <SelectItem value="2025">2025</SelectItem>
                                                    <SelectItem value="2026">2026</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                </div>
                            </div>

                            {/* Note and Location */}
                            <div className="flex sm:flex-row sm:gap-6 flex-col">
                                <FormField
                                    control={form.control}
                                    name="note"
                                    render={({ field }) => (
                                        <FormItem className='w-full sm:w-1/2'>
                                            <FormLabel>Note</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Enter your note" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem className='sm:w-1/2 w-full'>
                                            <FormLabel>Location</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Enter your location" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Password and Confirm Password */}
                        <div className="flex flex-col gap-4">
                            <div className="sm:flex gap-6">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className="min-w-[330px]">
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
                                        <FormItem className="min-w-[330px]">
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input type='password' placeholder="********" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <Button type="submit" className="px-14">Submit</Button>
                    </form> 
                        
                </Form>

            </div>
        </div>
    )
}