import { Github, Twitter, Facebook, Instagram, Mail, Rss } from "lucide-react";
import { FaChessPawn, FaDiscord, FaLink, FaTelegram } from "react-icons/fa6";
import { Button, buttonVariants } from "@/components/ui/button";
import BLOG from '@/blog.config'

export default function Footer() {
  return (
    <footer className="max-w-2xl mx-auto w-full space-y-4">
      <div className="flex justify-between">
        <p className="text-sm my-auto">{BLOG.author}</p>

        <div className="flex my-auto">
          {BLOG.useRss && (
            <Button variant="ghost" size="sm">
              <Rss className="w-4 h-4" />
            </Button>
          )}
          {BLOG.useMail && (
            <a
              href={`mailto:${BLOG.email}`}
              className={buttonVariants({ variant: "ghost", size: "sm" })}
              aria-label="Email">
              <Mail className="w-4 h-4" />
            </a>
          )}
          <a
            href="https://discord.com/users/jiale0709"
            target="_blank"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
            aria-label="Discord"
          >
            <FaDiscord className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/jiale0709"
            target="_blank"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
      <br />
    </footer>

  );
}