import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CustomCategory } from "../type";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean)=> void;
    data: CustomCategory[];
}

export const CategoriesSidebar = (
    {open,
    onOpenChange,
    data
    }: Props) => {

    const router = useRouter()
    const [parentCategories, setParentCatgories] = useState<CustomCategory[] | null>(null)
    const [selectedCategory, setSelectedCatgories] = useState<CustomCategory[] | null>(null)

    // IF we have parent category , show those otherwise show root category
    const  currentCategories = parentCategories ?? data ?? [];
    
    const handleOpenChange = (open: boolean ) => {
        setSelectedCatgories(null);
        setParentCatgories(null);
        onOpenChange(open);
    }


    const handleCategoryClick = (category: CustomCategory) =>{
        if(category.subcategories && category.subcategories.length > 0){
            setParentCatgories(category.subcategories as CustomCategory []);
            setSelectedCatgories([category]);
        }else{
            //This is a leaf category (no subcategory)
            if(parentCategories && selectedCategory) {
                //This is a subcategory - navigate to /category/subcategory
                router.push(`/${selectedCategory[0].slug}/${category.slug}`);
            } else {
                //This is a main Category - navigate to /category
                if(category.slug === 'all'){
                    router.push('/')
                }else{
                    router.push(`${category.slug}`);
                }
            }
            handleOpenChange(false);
        }
    }

    const handleBackClick = () => {
        if(parentCategories){
            setParentCatgories(null);
            setSelectedCatgories(null);
        }
    }

    const backgroundColor = selectedCategory?.[0]?.color || "white";

    return(
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetContent
                side="left"
                className="p-0 transition-none"
                style={{backgroundColor}}
            >
                <SheetHeader className="p-4 border-b" >
                    <SheetTitle>
                        Categories
                    </SheetTitle>
                </SheetHeader>
                <ScrollArea>
                    {parentCategories && (
                        <button
                            onClick={handleBackClick}
                            className="w-full text-left p-4 cursor-pointer hover:bg-black hover:text-white flex items-center text-base font-medium"
                        >
                            <ChevronLeftIcon className="size-4 mr-2"/>
                            back
                        </button>
                    )}

                    {currentCategories.map((category)=>(
                        <button
                            key={category.slug}
                            onClick={()=> handleCategoryClick(category)}
                            className="w-full text-left p-4 cursor-pointer hover:bg-black hover:text-white flex items-center text-base font-medium"
                        >
                            {category.name}
                            {category.subcategories && category.subcategories.length > 0 && (
                                <ChevronRightIcon className="size-4"/>
                            )}
                        </button>
                    ))}
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}