import { motion } from "framer-motion";
import { Github, Twitter, Facebook, Instagram } from "lucide-react";
import { FaChessPawn, FaDiscord, FaLink, FaTelegram } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import BLOG from '@/blog.config';

// Create Pr if u want more icon :)

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const socialButtonsData = BLOG.buttonData

const SocialButtons = () => {
  return (
    <motion.div variants={container} initial="hidden" animate="visible">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
        {socialButtonsData.map((buttonData) => (
          <motion.div key={buttonData.type} className="item" variants={item}>
            <Button variant="ghost" className="relative h-14 w-full border p-4">
              <a
                href={buttonData.link}
                target="_blank"
                className="w-full h-full flex my-auto"
                aria-label={buttonData.name}
              >
                {buttonData.type === "gh" ? (
                  <Github className="mr-2 w-7 h-7 my-auto" />
                ) : buttonData.type === "discord" ? (
                  <FaDiscord className="mr-2 w-7 h-7 my-auto" />
                ) : buttonData.type === "twitter" ? (
                  <Twitter className="mr-2 my-auto" />
                ) : buttonData.type === "tg" ? (
                    <FaTelegram className="mr-2 w-7 h-7 my-auto" />
                ) : buttonData.type === "fb" ? (
                    <Facebook className="mr-2 w-7 h-7 my-auto" />
                ) : buttonData.type === "chess" ? (
                    <FaChessPawn className="mr-2 w-7 h-7 my-auto" />
                ) : buttonData.type === "ig" ? (
                    <Instagram className="mr-2 w-7 h-7 my-auto" />
                ) :
                (
                  <FaLink className="mr-2 w-7 h-7 my-auto" />
                )}
                {buttonData.name}
              </a>
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SocialButtons;
