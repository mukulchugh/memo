import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
// import { Button }from "@/components/ui/button";

interface ModalProps {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  trigger,
  title,
  description,
  children,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent side="right" className="overflow-y-auto w-full sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        <div className="mt-6">
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
};
