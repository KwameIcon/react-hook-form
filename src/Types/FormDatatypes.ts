// Form data structure
export interface Traveler {
    firstName: string;
    lastName: string;
    passport: string;
    nationality: string;
    month: string;
    day: number | null;
    year: number | null;
}

export interface FormDataTypes {
    firstName: string;
    lastName: string;
    city: string;
    country: string;
    phone: string;
    email: string;
    alternateEmail: string;
    passport: string;
    nationality: string;
    month: string;
    day: number | null;
    year: number | null;
    otherTravelers: Traveler[];
}



type FieldError = {
    message?: string;
    type?: string;
};

export type FormErrors = Record<FieldId, FieldError | undefined>;



// fieldid types
type FieldId = "firstName" | "lastName" | "city" | "country" | "email" | "alternateEmail" | "month" | "day" | "year" | "phone" | "passport" | "nationality";



// Type for each item in the 'fields' array
export type FieldsData = {
    id: FieldId
    label: string;
    placeholder: string;
    type: string;
    data?: { id: string | number; value: string | number }[]; 
};


// Type for each item in the 'data' array
export type FieldDataItem = {
    id: number;
    value: string;
} | {
    id: number;
    value: number;
};