'use client'
import {BsCartCheck} from 'react-icons/bs'
import {TbShoppingCartDollar} from 'react-icons/tb'
import Searchbar from './Searchbar'
import Profile from './Profile'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import Link from "next/link"
import { AiOutlineLogin } from "react-icons/ai"
import { useSession } from 'next-auth/react'
import { useCartStore } from '@/lib/stores'

const Navbar = () => {
  const pathname = usePathname()
  const showHeader = (pathname === '/login' || pathname === '/signup') ? false : true;
  const session = useSession();
  const itemsCount = useCartStore(state => state.itemsCount)
  if(!showHeader) return null;

  return (
    <>
      <nav className="w-full border border-b-2 flex justify-center sm:gap-5 gap-2 p-2 items-center text-lg ">
        <Link href = "/">
          <p className='hidden sm:flex'>textrade.store</p>
        </Link>
        <Searchbar/>
          <Link href = "/sell">
            <Button className="hidden sm:flex">
              <TbShoppingCartDollar className='mr-2 h-4 w-4'/> Sell
            </Button>
          </Link>
          <Link href = "/cart">
            <Button className="hidden sm:flex">
              <BsCartCheck className='mr-2 h-4 w-4'/> Cart {itemsCount > 0 && <span className='ml-1'>({itemsCount})</span>}
            </Button>
          </Link>
        <div>
          {
            session.status === 'authenticated' ? <Profile className="sm:flex hidden" user={session.data?.user}/> : 
            <div className = "">
              <Link href = "/login">
              <Button className = "">
                <AiOutlineLogin className = "mr-2 h-4 w-4"/> Login
              </Button>
              </Link>
            </div>
          }
        </div>
      </nav>
      <nav className="sm:hidden fixed bottom-0 w-full border border-b-2 flex justify-evenly gap-5 p-2 items-center text-lg bg-white z-[100]">
          <Link href = "/sell">
            <Button>
              <TbShoppingCartDollar className='mr-2 h-4 w-4'/> Sell
            </Button>
          </Link>
          <Link href = "/">
            <p>textrade.store</p>
          </Link>
          <Link href = "/cart">
            <Button>
              <BsCartCheck className='mr-2 h-4 w-4'/> Cart {itemsCount > 0 && <span className='ml-1'>({itemsCount})</span>}
            </Button>
          </Link>  
      </nav>

    </>
  )
}

export default Navbar