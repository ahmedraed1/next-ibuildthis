"use client";

import Link from "next/link";
import { Pickaxe, Github, Twitter, Linkedin, Mail } from "lucide-react";

const Logo = () => {
  return (
    <Link href="/" className="group flex items-center gap-2.5 transition-all">
      <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]">
        <Pickaxe size={20} className="relative z-10" />
      </div>
      <span className="text-lg font-black tracking-tight text-foreground lowercase">
        IBuildThis
      </span>
    </Link>
  );
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "community",
      links: [
        { name: "explore projects", href: "/explore" },
        { name: "makers board", href: "/makers" },
        { name: "latest launches", href: "/latest" },
        { name: "discussions", href: "/discussions" },
      ],
    },
    {
      title: "platform",
      links: [
        { name: "submit project", href: "/submit" },
        { name: "pricing", href: "/pricing" },
        { name: "guidelines", href: "/guidelines" },
        { name: "terms of service", href: "/terms" },
      ],
    },
    {
      title: "resources",
      links: [
        { name: "help center", href: "/help" },
        { name: "blog", href: "/blog" },
        { name: "newsletter", href: "/newsletter" },
        { name: "contact us", href: "/contact" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", name: "Twitter" },
    { icon: Github, href: "#", name: "Github" },
    { icon: Linkedin, href: "#", name: "Linkedin" },
    { icon: Mail, href: "#", name: "Email" },
  ];

  return (
    <footer className="relative bg-background border-t border-border mt-20 pt-16 pb-8 overflow-hidden">
      {/* Subtle accent decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16 font-sans">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Logo />
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed lowercase italic opacity-80">
              The ultimate community for makers, developers, and creators to
              showcase their latest projects and find inspiration for their next
              big idea.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="p-2 rounded-full bg-muted/50 text-muted-foreground hover:bg-primary/5 hover:text-primary transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-foreground">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors lowercase tracking-wide"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground lowercase opacity-70 italic font-medium">
            &copy; {currentYear} ibuildthis. all rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-[10px] text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest font-bold"
            >
              privacy policy
            </Link>
            <Link
              href="/cookies"
              className="text-[10px] text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest font-bold"
            >
              cookie policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
