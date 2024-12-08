import React from "react";
import { SignaturePad } from "./SignaturePad";
import { Upload } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

interface SignatureInputProps {
  onSignatureSave: (signature: string) => void;
  currentSignature?: string;
}

export const SignatureInput: React.FC<SignatureInputProps> = ({
  onSignatureSave,
  currentSignature,
}) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onSignatureSave(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="flex gap-4 items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Draw Signature</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Draw Signature</DialogTitle>
            </DialogHeader>
            <SignaturePad
              onSave={(signature) => {
                onSignatureSave(signature);
              }}
            />
          </DialogContent>
        </Dialog>

        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="signature-upload"
          />
          <label
            htmlFor="signature-upload"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Image
          </label>
        </div>
      </div>

      {currentSignature && (
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Current Signature:</p>
          <img
            src={currentSignature}
            alt="Current signature"
            className="max-w-[200px] border rounded p-2"
          />
        </div>
      )}
    </div>
  );
};
