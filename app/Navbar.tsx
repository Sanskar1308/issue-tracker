"use client";

import { Avatar, Box, Container, DropdownMenu, Flex } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Im500Px } from "react-icons/im";

function Navbar() {
  const currentPath = usePathname();
  const { status, data: session } = useSession();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className=" border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <Im500Px />
            </Link>
            <ul className="flex space-x-6">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={classNames({
                      "text-zinc-900": link.href === currentPath,
                      "text-zinc-500": link.href !== currentPath,
                      "hover:text-zinc-800 transition-colors": true,
                    })}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === "authenticated" ? (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session.user!.image!}
                    fallback="?"
                    size="2"
                    radius="full"
                    className="cursor-pointer"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>{session.user!.email}</DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Logout</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            ) : (
              <Link href="/api/auth/signin">Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
}

export default Navbar;
