import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Link from "next/link";
import React from "react";

type NavbarSidebarProps = {
    href: string;
    children: React.ReactNode;
}

type props = {
    navitems: NavbarSidebarProps[];
    open: boolean;
    onchange: (open : boolean) => void;
}

export const NavbarSidebar = ({navitems, open, onchange}: props) => {
    return(
       <Sheet open={open} onOpenChange={onchange}>
            <SheetContent side="left" className="p-0 transition-none">
                <SheetHeader className="p-4 border-b">
                    <div className="flex items-center">
                        <SheetTitle>
                            Menu
                        </SheetTitle>
                    </div>
                </SheetHeader>
                <ScrollArea className="flex flex-col cursor-pointer overflow-y-auto h-full pb-2">
                    {navitems.map((item)=> (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => onchange(false)}
                            className="flex  w-full p-4 hover:bg-black hover:text-white font-medium text-left text-base items-center"
                        >
                            {item.children}
                        </Link>
                    ))}
                    <div className="border-t">
                        <Link 
                            href="/sign-in"
                            className="flex  w-full p-4 hover:bg-black hover:text-white font-medium text-left text-base items-center"
                            onClick={() => onchange(false)}
                        >
                            Sign In
                        </Link>
                        
                        <Link 
                            href="/sign-up"
                            className="flex  w-full p-4 hover:bg-black hover:text-white font-medium text-left text-base items-center"
                            onClick={() => onchange(false)}
                        >
                            Sign Up
                        </Link>
                    </div>
                </ScrollArea>
            </SheetContent>
       </Sheet>
    )
}