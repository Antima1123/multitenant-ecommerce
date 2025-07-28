import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

interface Props {
    disabled?: boolean;
};

export const SearchInput = ({disabled}: Props ) =>{
    return(
        <div className="flex items-center gap-2 w-full">
            <div className="relative w-full">
                <SearchIcon className="absolute left-3 top-4 size-4 -traslate-y-1/2 text-neutral-500" />
                <Input className="pl-8" placeholder="Search products" disabled={disabled} />
            </div>

        </div>
    )
}