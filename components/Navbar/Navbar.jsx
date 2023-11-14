import { usePathname } from "next/navigation";
import ThemeSwitcher from "@/components/Theme/ThemeSwitcher";
import Back from "@/components/Navbar/Back";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import BLOG from "@/blog.config";
import { Search, FolderGit2, Home, PersonStanding, Mail } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navigation() {
  const pathname = usePathname();
  const Homeroute = pathname === "/";
  const Contact = pathname === "/contact";
  const PostPage = pathname === "/posts";
  const ProjectPath = pathname === '/project';
  const exceptionalPage = !(Homeroute || Contact || PostPage || ProjectPath);

  const links = [
    {
      id: 0,
      name: 'Home',
      to: '/',
      icon: <Home className="w-5 h-5" />,
      show: true
    },
    {
      id: 1,
      name: 'About',
      to: '/about',
      icon: <PersonStanding className="w-5 h-5" />,
      show: true
    },
    {
      id: 2,
      name: 'Contact',
      to: '/contact',
      icon: <Mail className="w-5 h-5" />,
      show: BLOG.contact
    },
    {
      id: 3,
      name: 'Project',
      to: '/project',
      icon: <FolderGit2 className="w-5 h-5" />,
      show: true
    },
    {
      id: 4,
      name: 'Search',
      to: '/search',
      icon: <Search className="w-5 h-5" />,
      show: true
    }
  ]

  if (exceptionalPage) {
    return null;
  }

  return (
    <div className="py-4 top-0 z-50 w-full bg-opacity-75 backdrop-blur-lg">
      <div className="flex justify-between container">
        <div>
          {Home ? (
            <div>
              <div className="sm:flex">
                <div>
                  <p>{BLOG.title}</p>
                  <p className="text-xs">{BLOG.bio}</p>
                </div>
              </div>
            </div>
          ) : (
            <Back />
          )}
        </div>
        {/* desktop Menu */}
        <div className="hidden md:flex gap-1"> {/* Hide on small screens */}


          {links.map(
            (link) =>
              link.show && (

                <Link passHref href={link.to} key={link.id} scroll={false} className={buttonVariants({ variant: "ghost" })}>

                  {link.icon}
                  <span className='inline-block m-1'>{link.name}</span>

                </Link>

              )
          )}
          <ThemeSwitcher />
        </div>
        {/* Mobile Phone Menu */}
        <div className='md:hidden mr-2 block '>


          <DropdownMenu>
            <DropdownMenuTrigger><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-heart"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /><path d="M16 8.2C16 7 15 6 13.8 6c-.8 0-1.4.3-1.8.9-.4-.6-1-.9-1.8-.9C9 6 8 7 8 8.2c0 .6.3 1.2.7 1.6h0C10 11.1 12 13 12 13s2-1.9 3.3-3.1h0c.4-.4.7-1 .7-1.7z" /></svg></DropdownMenuTrigger>
            <DropdownMenuContent>

              {links.map(
                (link) =>
                  link.show && (
                    <DropdownMenuItem key={link.id}>
                      <Link href={link.to} >
                        <div className="flex items-center gap-1">
                          {link.icon}
                          <span className='m-1'>{link.name}</span>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  )
              )}
              <DropdownMenuSeparator />
              <ThemeSwitcher />
            </DropdownMenuContent>
          </DropdownMenu>


        </div>
      </div>
    </div>
  );
}
