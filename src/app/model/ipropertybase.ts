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
    RTM?: number;
    Image?: string;
}