import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "./ui/button";

interface SignaturePadProps {
  onSave: (signature: string) => void;
}

export const SignaturePad: React.FC<SignaturePadProps> = ({ onSave }) => {
  const signaturePad = useRef<SignatureCanvas>(null);

  const handleSave = () => {
    if (signaturePad.current) {
      const dataUrl = signaturePad.current.toDataURL();
      onSave(dataUrl);
    }
  };

  const handleClear = () => {
    if (signaturePad.current) {
      signaturePad.current.clear();
    }
  };

  return (
    <div className="space-y-4">
      <div className="border border-gray-300 rounded">
        <SignatureCanvas
          ref={signaturePad}
          canvasProps={{
            className: "signature-canvas w-full h-40",
          }}
          backgroundColor="white"
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button onClick={handleClear} variant="destructive">
          Clear
        </Button>
        <Button onClick={handleSave}>Save Signature</Button>
      </div>
    </div>
  );
};
