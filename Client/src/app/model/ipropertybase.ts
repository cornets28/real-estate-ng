export interface IPropertyBase{
    id: number | null;
    sellRent: number;
    name: string;
    propertyType: string;
    furnishingType?: string;
    price: string | null;
    bhk?: number | null;
    builtArea?: string | null;
    city?: string;
    readyToMove?: boolean | null;
    image?: string;
    estPossessionOn?: string;
}
