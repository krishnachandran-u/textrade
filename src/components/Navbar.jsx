import {BsCartCheck} from 'react-icons/bs'
import {TbShoppingCartDollar} from 'react-icons/tb'
import Searchbar from './Searchbar'
import Profile from './Profile'
import { Button } from './ui/button'

const Navbar = () => {

  return (
    <>
      <nav className="w-full border border-b-2 flex justify-center sm:gap-5 gap-2 p-2 items-center text-lg ">
        <p className='hidden sm:flex'>textrade.store</p>
        <Searchbar/>
        <Button className="hidden sm:flex">
          <TbShoppingCartDollar className='mr-2 h-4 w-4'/> Sell
        </Button>
        <Button className="hidden sm:flex">
          <BsCartCheck className='mr-2 h-4 w-4'/> Cart 
        </Button>
        <div>
          <Profile className="sm:flex hidden"/>
        </div>
      </nav>
      <nav className="sm:hidden fixed bottom-0 w-full border border-b-2 flex justify-evenly gap-5 p-2 items-center text-lg">
        <Button>
          <TbShoppingCartDollar className='mr-2 h-4 w-4'/> Sell
        </Button>
        <p>textrade.store</p>
        <Button>
          <BsCartCheck className='mr-2 h-4 w-4'/> Cart 
        </Button>
      </nav>

    </>
  )
}

export default Navbar