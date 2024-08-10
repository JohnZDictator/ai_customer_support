import Link from "next/link"

const Header = () => {
  return (
    <header className='flex flex-row w-screen md:w-[70%] mx-auto justify-center'>
        <div className='p-4'>
            <Link href="/">
                <h1 className="text-2xl font-semibold text-accent">Headstarter AI Customer Support</h1>
            </Link>
        </div>
    </header>
  )
}

export default Header