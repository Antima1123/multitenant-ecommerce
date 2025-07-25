"use client"
import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MenuIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { NavbarSidebar } from "./navbar-sidebar";



const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700"],
})

type NavItemsProps = {
    href: string;
    children: React.ReactNode;
    isActive?:boolean
}

const NavItemsArray = [
    {href:"/", children:"Home", },
    {href:"/about", children:"About", },
    {href:"/features", children:"Features", },
    {href:"/pricing", children:"Pricing", },
    {href:"/contact", children:"Contact", },
];

const NavItems =(
    {    href,
        children, 
        isActive
    }: NavItemsProps )=>{
    return(
        <Button
            asChild
            variant="outline"
            className={cn("rounded-full hover:bg-transparent bg-transparent border-transparent hover:border-primary px-3.5 text-lg ", isActive && "bg-black text-white hover:bg-black hover:text-white")}
        >
            <Link href={href}>
            {children}
            </Link>
        </Button>
    )
} 

export default function Navbar(){
    const pathname = usePathname();
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
return(
    <nav className="bg-white h-20 flex justify-between border-b ">
        <Link href="/" className="pl-4 flex items-center">
            <span className={cn("text-5xl font-semibold ", poppins.className)}>
                funroad
            </span>
        </Link>

        <NavbarSidebar
            navitems={NavItemsArray}
            open={isSideBarOpen}
            onchange={setIsSideBarOpen}
        />

        <div className="items-center gap-4 hidden lg:flex">
            {NavItemsArray.map((item, index) =>(
                <NavItems
                    key={item.href}
                    href={item.href}
                    isActive={pathname === item.href}
                >
                    {item.children}
                </NavItems>
            ))}
        </div>

        <div className="lg:flex hidden">
            <Button
                asChild 
                variant="secondary"
                className=" rounded-none border-l border-r-0 border-t-0 border-b-0 bg-white hover:bg-pink-500 text-lg h-full px-12 transition-colors"
            >
                <Link href="/signin">LogIn</Link>
            </Button>

            <Button 
                asChild
                className="rounded-none border-l border-r-0 border-t-0 border-b-0 bg-black text-white hover:text-black hover:bg-pink-500 text-lg h-full px-12 transition-colors"
            >
                <Link href="/signup">Start Selling</Link>
            </Button>
        </div>
         <div className="lg:hidden flex items-center justify-center ">
                <Button 
                    variant="ghost"
                    className="size-12 bg-white border-transparent"
                    onClick={()=> setIsSideBarOpen(true)}
                >
                    <MenuIcon/>
                </Button>
            </div>
    </nav>
)
}