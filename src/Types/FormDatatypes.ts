// Form data structure
export interface Traveler {
    firstName: string;
    lastName: string;
    passportNumber: string;
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