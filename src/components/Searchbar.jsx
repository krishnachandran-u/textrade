"use client"

import { useForm } from "react-hook-form"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export default function Searchbar() {
  const form = useForm({
    defaultValues: {
      search: "",
    },
  })
  const router = useRouter();
  function onSubmit(data) {
    const searchQuery = encodeURI(data.search);
    router.push(`?search=${searchQuery}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full sm:w-1/2 space-y-6">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="What are you looking for?" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
