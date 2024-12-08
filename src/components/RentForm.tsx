import React from "react";
import { RentDetails } from "../types/receipt";
import { SignatureInput } from "./SignatureInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useRentForm from "../hooks/useRentForm";
import { Textarea } from "./ui/textarea";

interface RentFormProps {
  onSubmit: (data: RentDetails) => void;
  hasPreview?: boolean;
  setPreviewData: (data: RentDetails) => void;
}

export const RentForm: React.FC<RentFormProps> = ({
  onSubmit,
  hasPreview,
  setPreviewData,
}) => {
  const initialData: RentDetails = {
    totalRent: 15000,
    tenants: [{ name: "John Doe" }],
    propertyAddress: "13th Avenenue, Delaware",
    landlordName: "William Smith",
    startDate: "2025-01-01",
    numberOfMonths: 11,
    landlordPan: "CDYRW6743V",
    signature: "",
  };

  const { formData, handleInputChange, handleTenantChange, handleSubmit } =
    useRentForm(initialData);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Rent Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => handleSubmit(e, onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="totalRent">Total Rent</Label>
            <Input
              id="totalRent"
              type="number"
              value={formData.totalRent}
              onChange={(e) => {
                handleInputChange("totalRent", Number(e.target.value));
                setPreviewData(formData);
              }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="propertyAddress">Property Address</Label>

            <Textarea
              id="propertyAddress"
              value={formData.propertyAddress}
              onChange={(e) => {
                handleInputChange("propertyAddress", e.target.value);
                setPreviewData(formData);
              }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => {
                setPreviewData(formData);
                handleInputChange("startDate", e.target.value);
              }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="numberOfMonths">Number of Months</Label>
            <Input
              id="numberOfMonths"
              type="number"
              value={formData.numberOfMonths}
              onChange={(e) => {
                setPreviewData(formData);
                handleInputChange("numberOfMonths", Number(e.target.value));
              }}
            />
          </div>

          {/* Landloard details */}
          <div className="space-y-2">
            <Label>Landlord Details</Label>
            <div className="space-y-2">
              <Input
                type="text"
                value={formData.landlordName}
                onChange={(e) => {
                  handleInputChange("landlordName", e.target.value);
                  setPreviewData(formData);
                }}
                placeholder="Landlord Name"
              />
              <Input
                type="text"
                value={formData.landlordPan}
                onChange={(e) => {
                  handleInputChange("landlordPan", e.target.value);
                  setPreviewData(formData);
                }}
                placeholder="Landlord PAN"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tenant</Label>
            <div className="space-y-2">
              {formData.tenants.map((tenant, index) => (
                <Input
                  key={index}
                  type="text"
                  value={tenant.name}
                  onChange={(e) => {
                    setPreviewData(formData);
                    handleTenantChange(index, e.target.value);
                  }}
                  placeholder={`Name`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Signature</Label>
            <SignatureInput
              onSignatureSave={(signature) => {
                handleInputChange("signature", signature);
                setPreviewData(formData);
              }}
              currentSignature={formData.signature}
            />
          </div>

          <Button
            type="submit"
            variant={"default"}
            className="w-full sticky bottom-16 py-8 text-white"
          >
            Generate {hasPreview ? "Receipt" : "Preview"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
