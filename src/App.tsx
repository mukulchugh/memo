import { useEffect, useState } from "react";
import { RentForm } from "./components/RentForm";
import { RentDetails } from "./types/receipt";

import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-react";
import RentPreview from "./components/RentPreview";
import { RentReceipt } from "./components/RentReceipt";
import { cn } from "./lib/utils";

function App() {
  const [rentDetails, setRentDetails] = useState<RentDetails | null>(null);
  const [previewData, setPreviewData] = useState<RentDetails | null>(null);

  const handleFormSubmit = (data: RentDetails) => {
    if (!previewData) {
      setPreviewData(data);
    } else {
      setRentDetails(data);
    }
  };

  // logic to generate rent details/ preview details from query params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const totalRent = urlParams.get("totalRent");
    const tenants = urlParams.get("tenants");
    const propertyAddress = urlParams.get("propertyAddress");
    const landlordName = urlParams.get("landlordName");
    const startDate = urlParams.get("startDate");
    const numberOfMonths = urlParams.get("numberOfMonths");
    const landlordPan = urlParams.get("landlordPan");

    if (totalRent) {
      const data: RentDetails = {
        totalRent: Number(totalRent),
        tenants: JSON.parse(tenants || "[]"),
        propertyAddress: propertyAddress || "",
        landlordName: landlordName || "",
        startDate: startDate || "",
        numberOfMonths: Number(numberOfMonths),
        landlordPan: landlordPan || "",
        signature: "",
      };

      setPreviewData(data);
    }
  }, []);

  return (
    <div className="mx-auto bg-slate-100">
      <div className="flex justify-between items-center mb-6 flex-col">
        <div className=" bg-white top-0 sticky flex items-center border-b border-l border-r rounded-sm  backdrop-blur-lg  border-black/10 py-3 mb-3 mx-auto w-5/6 px-4">
          <img src="../logo.svg" alt="Rent Receipt Generator" className="h-8" />
          <nav className="flex gap-4 ml-auto items-center">
            <a
              href="https://github.com/mukulchugh/memo"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="link">
                <GithubIcon className="h-6 w-6" />
              </Button>
            </a>
            <a
              href="https://twitter.com/intent/tweet?text=Check%20out%20this%20Rent%20Receipt%20Generator!&url=https://rentmemo.netlify.app"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="link">
                <TwitterIcon className="h-6 w-6" />
              </Button>
            </a>{" "}
            <a
              href="https://www.linkedin.com/sharing/share-offsite/?url={https://rentmemo.netlify.app/}"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="link">
                <LinkedinIcon className="h-6 w-6" />
              </Button>
            </a>
          </nav>
        </div>
      </div>
      <div className="w-5/6 mx-auto pb-12">
        <div className="md:grid md:grid-cols-2 gap-2">
          <div className="col-span-1">
            <RentForm
              hasPreview={!!previewData}
              onSubmit={previewData ? handleFormSubmit : handleFormSubmit}
              setPreviewData={setPreviewData}
            />
          </div>
          <div
            className={cn(
              "col-span-1 px-8 rounded-sm",
              previewData && !rentDetails && "justify-center items-center flex",
              rentDetails && "pt-12",
              !previewData && "justify-center items-center flex"
            )}
            style={{
              background: "url(../preview-bg.jpg)",
              backgroundSize: "cover",
            }}
          >
            <div className="bg-white rounded-lg shadow-md">
              {previewData && !rentDetails && (
                <RentPreview data={previewData} />
              )}

              {!previewData && (
                <div className="text-center p-4">
                  <h2 className="text-lg font-bold">Preview</h2>
                  <p className="text-sm text-gray-500">
                    Fill the form to generate a rent receipt
                  </p>
                </div>
              )}

              {rentDetails && (
                <div className="text-center w-full">
                  <h2 className="text-lg font-bold">Rent Receipt</h2>
                  <p className="text-sm text-gray-500">
                    Your rent receipt is ready to download
                  </p>
                  <RentReceipt data={rentDetails} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-0 bg-white  flex items-center border-t border-l border-r rounded-sm backdrop-blur-lg border-black/10 py-3  mx-auto w-5/6 px-4">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} MEMO. All rights reserved. Made with ❤️
          by{" "}
          <a href="https://mukulchugh.com" target="_blank" rel="noreferrer">
            Mukul Chugh
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
