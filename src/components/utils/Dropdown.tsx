import React, { useState, cloneElement, ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";



interface DropdownProps {
  children: ReactNode;
  btnShow?: ReactNode;
  style?: string;
  down?: boolean;
  setOpen?: (open: boolean) => void;
  open?: boolean;
  className?: string;
}


export default function Dropdown({
  children,
  btnShow,
  style,
  down,
  setOpen: externalSetOpen,
  open: externalOpen,
  className,
} : DropdownProps) {
  // Gérer un état local si setOpen n’est pas fourni
  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen ?? internalOpen;
  const setOpen = externalSetOpen ?? setInternalOpen;

  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return cloneElement(child);
    }
    return child;
  });

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="focus:outline-none w-full">
        <div
          className={`flex items-center justify-center rounded-md transition-all duration-300 ${style}`}
        >
          {btnShow}
          {down && <ChevronDown className="w-4 h-4" />}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={cn("flex flex-col mx-4", className)}>
        {enhancedChildren}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}




interface DropdownItemsProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  style?: string;
  className?: string;
  onClick?: () => void;
  setOpen?: (open: boolean) => void;
}


export const DropdownItems = ({
  icon,
  title,
  description,
  style,
  className,
  onClick,
  setOpen, 
} : DropdownItemsProps) => {
  return (

      <DropdownMenuItem
        className={`flex gap-3 py-2 mx-1 cursor-pointer ${className}`}
        onClick={(e) => {
          e.stopPropagation(); // Empêche la fermeture immédiate du menu
          onClick?.(); // Exécute la fonction si elle existe
          setOpen?.(false); // Ferme le dropdown s'il y a une fonction `setOpen`
        }}
      >
        {icon}
        <div className="flex flex-col">
          <div className={`${style} font-sans flex items-center font-medium text-xs`}>
            {title}
          </div>
          <span className="text-xs text-gray-400">{description}</span>
        </div>
      </DropdownMenuItem>
  );
};
