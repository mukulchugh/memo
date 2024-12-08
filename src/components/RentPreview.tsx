import React from "react";
import { RentDetails } from "../types/receipt";
import { formatDate } from "date-fns";

interface RentPreviewProps {
  data: RentDetails;
}

const RentPreview: React.FC<RentPreviewProps> = ({ data }) => {
  const startDate = new Date(data.startDate);
  const endDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth() + data.numberOfMonths,
    0
  );

  const receipt = {
    month: startDate.toLocaleString("default", { month: "long" }),
    year: startDate.getFullYear(),
    startDate: startDate.toLocaleDateString(),
    endDate: endDate.toLocaleDateString(),
    receiptNo: 1,
  };

  return (
    <div className="p-4">
      <div className="border border-gray-300 p-4 mb-4 rounded shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg ">
              RENT RECEIPT{" "}
              <b>
                {receipt.month} {receipt.year}
              </b>
            </h2>
            <p className="text-sm text-gray-500">Generated via Memo App</p>
          </div>
          <div>
            <p className="text-sm">Receipt No: {receipt.receiptNo}</p>
            <p className="text-sm">
              Date: {formatDate(receipt.startDate, "MMM d, yyyy")}
            </p>
          </div>
        </div>
        <div className="mb-4 ">
          <p>
            Received sum of INR Rs. <b>{data.totalRent}</b> {""}
            from {data.tenants[0].name} towards the rent of property located at{" "}
            <b>{data.propertyAddress}</b> for the period from{" "}
            <b>{formatDate(receipt.startDate, "MMM d, yyyy")}</b> to{" "}
            <b>{formatDate(receipt.endDate, "MMM d, yyyy")}</b>
          </p>
        </div>
        <div className="mt-4">
          <p>{data.landlordName} (Landlord)</p>
          <p>Pan: {data.landlordPan}</p>
        </div>
        {data.signature && (
          <div className="mt-4 flex justify-end">
            <img src={data.signature} alt="Signature" className="h-12 w-auto" />
          </div>
        )}
      </div>
    </div>
  );
};

export default RentPreview;
