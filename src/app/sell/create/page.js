'use client'
import { Avatar,AvatarImage,AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { SingleImageDropzone } from "@/components/ImageDropZone"
import { useEdgeStore } from "@/providers/EdgeStoreProvider"
import { useState } from "react"
import {BiUpload} from 'react-icons/bi'

export default function CreateProductPage() {
  const { edgestore } = useEdgeStore();

  const [file, setFile] = useState();
  const [progress, setProgress] = useState(0);
  const [urls, setUrls] = useState();

  return(
    <div className="flex w-full sm:mt-20 flex-col sm:flex-row justify-center">
      <div className="sm:p-4 max-w-[250px] sm:max-w-[400px] min-w-[410px] h-[250px] sm:h-[410px] mx-auto sm:mx-0 mt-4 flex justify-center">
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
              className="h-full bg-white transition-all duration-150"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
      </div>
    </div>

      <div className="flex flex-col sm:ml-14 p-5 sm:p-6 ">
        <h1 className="sm:text-[40px] text-[20px] font-bold">Algorithms by CLRS</h1>
        <div className="flex gap-1 items-center mt-1">
          <Avatar className="cursor-pointer hover:drop-shadow-2xl w-8 h-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="text-slate-800 text-lg font-semibold">Seller name</span>
        </div>
        <p className="text-lg text-slate-700 max-w-[550px] min-w-[410px] mt-1 sm:mt-3 ">Sed ut oluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui</p>
        <div className='p-2 border-2 rounded-md w-fit text-lg sm:mt-4 mt-2 font-semibold'>500₹</div>
        <div className="flex gap-4 sm:mt-5 mt-3">
          <Button
            className="flex text-md"
            onClick={async () => {
              if (file) {
                const res = await edgestore.publicFiles.upload({
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
      </div>
    </div>
  )
}


