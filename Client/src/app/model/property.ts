import { IPropertyBase } from './ipropertybase';

export class Property implements IPropertyBase {
    // @ts-ignore
  id: number;
  sellRent!: number;
  name!: string;
  propertyType!: string;
  bhk!: number;
  furnishingType!: string;
  price!: string;
  builtArea!: string;
  carpetArea?: number;
  address!: string;
  address2?: string;
  city!: string;
  floorNo?: string;
  totalFloors?: string;
  readyToMove!: boolean;
  age?: string;
  mainEntrance?: string;
  security?: number;
  gated?: boolean;
  maintenance?: number;
  estPossessionOn!: string;
  image?: string;
  description?: string;
  // PostedOn!: string;
  // PostedBy!: number;
}
