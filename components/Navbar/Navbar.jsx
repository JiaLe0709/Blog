import { usePathname } from "next/navigation";
import ThemeSwitcher from "@/components/Theme/ThemeSwitcher";
import Back from "@/components/Navbar/Back";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import BLOG from "@/blog.config";

export default function Navigation() {
  const pathname = usePathname();
  const Home = pathname === "/";
  const Contact = pathname === "/contact";
  const PostPage = pathname === "/posts";
  const ProjectPath = pathname === '/project'
  const exceptionalPage = !(Home || Contact || PostPage || ProjectPath);

  if (exceptionalPage) {
    return null;
  }

  return (
    <div className="sticky py-4 top-0 z-50 w-full bg-opacity-75 backdrop-blur-lg">
      <div className="flex justify-between container">
        <div>
          {Home ? (
            <div>
              <div className="flex sm:hidden">
                <Link
                  href="/"
                  className={buttonVariants({ variant: "ghost" })}
                  aria-label="Home Page"
                >
                  Home
                </Link>
              </div>
              <div className="hidden sm:flex">
                <div>
                  <p>{BLOG.title}</p>
                  <p className="text-xs">
                    {BLOG.bio}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <Back />
          )}
        </div>
        <div className="flex gap-2">
          <Link
            href="/project"
            className={buttonVariants({ variant: "ghost" })}
            aria-label="Project Page"
          >
            Project
          </Link>
          <Link
            href="/about"
            className={buttonVariants({ variant: "ghost" })}
            aria-label="About Page"
          >
            About
          </Link>
          {BLOG.contact && (
            <Link
              href="/contact"
              className={buttonVariants({ variant: "ghost" })}
              aria-label="Uses Page"
            >
              Contact
            </Link>
          )}
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
}