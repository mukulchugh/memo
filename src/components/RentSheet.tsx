import React from "react";
import { RentDetails } from "../types/receipt";
import { RentForm } from "./RentForm";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface RentSheetProps {
  onSubmit: (data: RentDetails) => void;
}

export const RentSheet: React.FC<RentSheetProps> = ({ onSubmit }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Plus className="mr-2" />
          New Receipt
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Create New Receipt</SheetTitle>
          <SheetDescription>
            Fill in the details to generate a new rent receipt
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <RentForm onSubmit={onSubmit} />
        </div>
      </SheetContent>
    </Sheet>
  );
};
