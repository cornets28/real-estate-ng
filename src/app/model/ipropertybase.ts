export interface IPropertyBase{
    Id: number;
    SellRent: number;
    Name: string;
    PType: string;
    FType?: string;
    Price: number | null;
    BHK?: number | null;
    BuiltArea?: number | null;
    City?: string;
    RIM?: number;
    Image?: string;
}