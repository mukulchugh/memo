export interface Tenant {
  name: string;
}

export interface RentDetails {
  totalRent: number;
  tenants: Tenant[];
  propertyAddress: string;
  landlordName: string;
  startDate: string;
  numberOfMonths: number;
  landlordPan: string;
  signature: string;
}