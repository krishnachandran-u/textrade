import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {TbLogout2} from 'react-icons/tb'
import {MdOutlineAccountCircle} from 'react-icons/md'
import { signOut } from "next-auth/react"
import Link from "next/link"

export default function Profile({user}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <Badge variant="outline">
            <div className="flex gap-1 items-center">
              <Avatar className="cursor-pointer hover:drop-shadow-2xl">
                <AvatarImage src={user.image} alt="@shadcn" />
                <AvatarFallback>
                  <MdOutlineAccountCircle className="text-3xl"/>
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:flex text-[13px]">@{user.username}</span>
            </div>
          </Badge>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{user.name} <span className="sm:hidden">(@{user.username})</span></DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
            <Link href={`/profile/${user.username}`}>
              <DropdownMenuItem>
                  <MdOutlineAccountCircle className="text-lg mx-2"/>
                  Profile
              </DropdownMenuItem>
            </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div onClick={() => signOut()} className="flex items-center">
            <TbLogout2 className="text-lg mx-2"/>
              Log out
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
