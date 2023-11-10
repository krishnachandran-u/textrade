'use client'
import { Button } from "@/components/ui/button"
import { SingleImageDropzone } from "@/components/ImageDropZone"
import { useEdgeStore } from "@/providers/EdgeStoreProvider"
import { useState } from "react"
import {BiUpload} from 'react-icons/bi'
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
  title: z.string().min(8, {
    message: "Title must be at least 8 characters.",
  }),
  discription: z.string().min(15, {
    message: "Discription must be at least 15 characters.",
  }),
  price: z.number().gte(10, {
    message: "price must be at least 5₹.",
  }),
})

export default function CreateProductPage() {
  const { edgestore } = useEdgeStore();

  const [file, setFile] = useState();
  const [progress, setProgress] = useState(0);
  const [urls, setUrls] = useState();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues:{
      title:'',
      discription:'',
      price:'',
    },
  })

  async function onSubmit(data) {
  } 

  return(
    <div className="flex w-full sm:mt-20 flex-col sm:flex-row justify-center">
      <div className="sm:p-4 max-w-[250px] sm:max-w-[400px] min-w-[410px] h-[255px] sm:h-[410px] mx-auto sm:mx-0 mt-4 flex justify-center">
        <div className="h-full w-full">
          <SingleImageDropzone
            value={file}
            dropzoneOptions={{
              maxSize:1024*1024*1,
            }}
            onChange={(file) => {
              setFile(file);
            }}
          />
          <div className="h-[7px] w-full border rounded overflow-hidden mt-2">
            <div
              className="h-full bg-slate-400 transition-all duration-150"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
      </div>
    </div>
    <div className="flex flex-col sm:ml-4 p-5 sm:p-6 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Product Title" {...field} className="text-xl py-6 sm:text-4xl sm:py-8 font-semibold mt-1 sm:mt-0"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discription"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="Type product discription here." {...field} className="h-32 text-md"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Price" {...field} {...form.register("price",{ setValueAs: (v) => v === "" ? undefined : parseInt(v, 10)})} className="text-xl py-6 font-semibold sm:mt-0 w-20"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4 sm:mt-5 mt-3">
            <Button
              className="flex text-md"
              type="submit"
              onClick={async () => {
                if (file) {
                  const res = await edgestore.productImages.upload({
                    file,
                    onProgressChange: (progress) => {
                      setProgress(progress);
                    },
                  });
                  setUrls({
                    url: res.url,
                    thumbnailUrl: res.thumbnailUrl,
                  });
                }
              }}
            >
              <BiUpload className='mr-2 h-4 w-4'/> Upload
            </Button>
          </div>
        </form>
      </Form>
      </div>
    </div>
  )
}


