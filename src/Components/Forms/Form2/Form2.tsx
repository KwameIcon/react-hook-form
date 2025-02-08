"use client"

import { TextInputField } from "@/Components/Commons";
import React, { useEffect, useRef, useState } from "react";
import { DAYSINMONTH, MONTHFULL, YEARS } from "@/DATA/DATEOFBIRTH";
import { FieldValues, useFormContext } from "react-hook-form";
import { FaExclamationCircle } from "react-icons/fa";
import { getAge } from "@/utils/getAge";
import { COUNTRIES } from "@/DATA/COUNTRIES";

// Form2 types
type Form2Props = {
    fieldIndex: number;
    errors: Record<string, any>;
}

export type countryData = {
    name: string;
    code: string;
}

export default function Form2({ fieldIndex, errors }: Form2Props) {
    // states
    const [queryCountries, setQueryCountries] = useState("");
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [age, setAge] = useState<number | null>();
    const [formData, setFormData] = useState<FieldValues>();


    
    // general ref for dropdowns
    const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});



    // useForm
    const { register, setValue, watch } = useFormContext();



    // fields array
    const fields = [
        { id: "firstName", label: 'First Name', placeholder: 'First name (Given Names)*', type: 'text' } as const,
        { id: "lastName", label: 'Last Name', placeholder: 'Last name (Surname)*', type: 'text' } as const,
        { id: "month", label: 'Month', placeholder: 'Month', type: 'text', data: MONTHFULL } as const,
        { id: "day", label: 'Day', placeholder: 'Day', type: 'number', data: DAYSINMONTH } as const,
        { id: "year", label: 'Year', placeholder: 'Year', type: 'number', data: YEARS } as const,
    ];




    // search countries
    const handleSearchCountries = () => {
        let filteredData;
        if (queryCountries !== "") {
            filteredData = COUNTRIES.filter((item) =>
                item.name.toLowerCase().includes(queryCountries.toLowerCase()));
        } else {
            filteredData = COUNTRIES;
        }
        return filteredData;
    };




    // Dropdown item click handler:
    const handleDateSelect = (field: any, item: any) => {
        if (field.id === 'month') {
            setSelectedMonth(item.id);
        } else if (field.id === 'day') {
            setSelectedDay(parseInt(item.id, 10));
        } else if (field.id === 'year') {
            setSelectedYear(parseInt(item.id, 10));
        }
        setValue(`otherTravelers.${fieldIndex}.${field.id}`, item.value, { shouldValidate: true });
        setOpenDropdown(null);
    };




    // get traveler age
    useEffect(() => {
        if (selectedMonth && selectedDay && selectedYear) {
            const calculatedAge = getAge(selectedMonth, selectedDay, selectedYear);
            setAge(calculatedAge ?? null);
        } else {
            setAge(null);
        }
    }, [selectedMonth, selectedDay, selectedYear]);




    // close dropdowns on click outside
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (openDropdown) {
                let clickedOutside = true;
                for (const key in dropdownRefs.current) {
                    const ref = dropdownRefs.current[key];
                    if (ref && ref.contains(e.target as Node)) {
                        clickedOutside = false;
                        break;
                    }
                }
                if (clickedOutside) {
                    setOpenDropdown(null);
                }
            }
        };
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, [openDropdown]);




    // watch form fields
    useEffect(() => {
        const subscribe = watch((values) => {
            setFormData(values);
        })
        return () => subscribe.unsubscribe();
    }, [watch])





    return (
        <div className="w-full grid grid-cols-1 gap-3 md:gap-5">
            {/* flex 1 */}
            <div className="w-full grid grid-cols-1 md:flex md:items-center md:justify-between gap-5">
                {/* first & last names */}
                {
                    fields.slice(0, 2).map((field) => {
                        const fieldError = errors?.otherTravelers?.[fieldIndex]?.[field.id]?.message ?? null;
                        const fieldData = formData?.otherTravelers[fieldIndex]?.[field.id];
                        return (
                            <div className="w-full grid grid-cols-1 gap-5 relative" key={field.id}>
                                <label htmlFor={`otherTravelers.${fieldIndex}.${field.id}`}>
                                    {(fieldData !== "") && <span className="font-bold">{field.label}: </span>}
                                    <TextInputField
                                        type={field.type}
                                        {...register(`otherTravelers.${fieldIndex}.${field.id}`, {
                                            required: { value: true, message: `${field.label} is missing!` }
                                        })}
                                        placeholder={field.placeholder}
                                        className={`${fieldError ? "border-red-500 outline-red-500 placeholder:text-red-500 placeholder:text-opacity-30" : ''}`}
                                    />
                                </label>

                                {/* error message */}
                                {fieldError && <p className="text-red-500 text-xs">{fieldError}</p>}

                                {/* danger symbol */}
                                {fieldError && <FaExclamationCircle className="text-red-500 absolute top-[20%] right-3 text-xs" />}
                            </div>
                        )
                    })
                }
            </div>

            {/* flex 2 */}
            <div className="w-full grid grid-cols-2 place-items-center gap-5">
                {/* passport number */}
                <div className="w-full my-5 md:my-0 relative">
                    <label htmlFor={`otherTravelers.${fieldIndex}.passport`}>
                        {(formData?.otherTravelers[fieldIndex]?.passport && formData?.otherTravelers[fieldIndex]?.passport !== "") && <span className="font-bold">Passport Number: </span>}
                        <TextInputField
                            type="text"
                            placeholder="Passport number*"
                            {...register(`otherTravelers.${fieldIndex}.passport`, {
                                required: { value: true, message: "Passport is missing!" },
                                minLength: { value: 9, message: "Invalid passport number" },
                                maxLength: { value: 9, message: "Invalid passport number" }
                            })}
                            className={`${errors.otherTravelers?.[fieldIndex]?.passport?.message ? "border-red-500 outline-red-500 placeholder:text-red-500 placeholder:text-opacity-30" : ''}`}
                        />
                    </label>
                    {/* error message */}
                    {errors.otherTravelers?.[fieldIndex]?.passport?.message && <p className="text-red-500 text-xs">{errors.otherTravelers?.[fieldIndex]?.passport?.message}</p>}

                    {/* danger symbol */}
                    {errors.otherTravelers?.[fieldIndex]?.passport?.message && <FaExclamationCircle className="text-red-500 absolute top-[20%] right-2 text-xs" />}
                </div>

                {/* nationality */}
                <div className="w-full flex items-center justify-start relative">
                    <div className="relative w-full">
                        <label htmlFor={`otherTravelers.${fieldIndex}.nationality`}>
                            {(formData?.otherTravelers[fieldIndex]?.nationality && formData?.otherTravelers[fieldIndex]?.nationality !== "") && <span className="font-bold">Nationality: </span>}
                            <TextInputField
                                type="search"
                                {...register(`otherTravelers.${fieldIndex}.nationality`, {
                                    required: { value: true, message: "Nationality is missing!" }
                                })}
                                placeholder="Nationality"
                                onChange={(e) => { setQueryCountries(e.target.value); setValue(`otherTravelers.${fieldIndex}.nationality`, e.target.value, { shouldValidate: true }) }}
                                className={`${errors.otherTravelers?.[fieldIndex]?.nationality?.message ? "border-red-500 outline-red-500 placeholder:text-red-500 placeholder:text-opacity-30" : ''}`}
                                onClick={() => setOpenDropdown(openDropdown === 'nationality' ? null : 'nationality')} />
                        </label>

                        {/* error message */}
                        {errors.otherTravelers?.[fieldIndex]?.nationality?.message && <p className="text-red-500 text-xs">{errors.otherTravelers?.[fieldIndex]?.nationality?.message}</p>}

                        {/* danger symbol */}
                        {errors.otherTravelers?.[fieldIndex]?.nationality?.message && <FaExclamationCircle className="text-red-500 absolute top-[20%] right-2 text-xs" />}
                    </div>

                    {openDropdown === 'nationality' &&
                        <div className="absolute max-h-80 overflow-y-scroll no-scrollbar left-0 top-[100%] bg-secondaryBackground rounded border p-2 z-50 grid grid-cols-1 gap-2 animate-fadeIn" ref={el => { dropdownRefs.current['nationality'] = el }}>
                            <p className="font-bold capitalize">Search for country</p>
                            <div className="w-full h-[2px] bg-black" />
                            {handleSearchCountries().map((country: countryData, index: number) => (
                                <div key={index} onClick={() => {
                                    setValue('nationality', country.name, { shouldValidate: true });
                                    setQueryCountries("");
                                    setOpenDropdown(null);
                                }} className="flex items-center gap-5 cursor-pointer transition-colors duration-200 ease-in-out hover:bg-gray-100 p-2 rounded">{country.name}</div>
                            ))}
                        </div>
                    }
                </div>
            </div>

            {/* Month, Day, and Year selection */}
            <div className="grid grid-cols-1 lg:flex lg:items-center gap-3 lg:gap-10">
                <p className="w-fit shrink-0">Date of birth</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {fields.slice(2).map((field) => {
                        const fieldError = errors?.otherTravelers?.[fieldIndex]?.[field.id]?.message ?? null;
                        const fieldData = formData?.otherTravelers[fieldIndex]?.[field.id];
                        return (
                            <div className="w-full relative" key={field.id}>
                                <div className="relative w-full">
                                    <label htmlFor={field.id}>
                                        {(fieldData) && <span className="font-bold">{field.label}: </span>}
                                        <TextInputField
                                            type={field.type}
                                            {...register(`otherTravelers.${fieldIndex}.${field.id}`, { required: { value: true, message: `${field.label} is missing!` } })}
                                            onClick={() => setOpenDropdown(openDropdown === field.label ? null : field.label)}
                                            placeholder={field.placeholder}
                                            className={`${fieldError ? "border-red-500 outline-red-500 placeholder:text-red-500 placeholder:text-opacity-30" : ''}`}
                                        />
                                    </label>

                                    {/* error message */}
                                    {fieldError && <p className="text-red-500 text-xs">{String(fieldError ?? "")}</p>}

                                    {/* danger symbol */}
                                    {fieldError && <FaExclamationCircle className="text-red-500 absolute top-[20%] right-2 text-xs" />}
                                </div>

                                {/* dropdown */}
                                {openDropdown === field.label &&
                                    <div className="absolute w-full h-72 overflow-y-scroll no-scrollbar left-0 top-[100%] bg-white shadow rounded border p-2 z-50 grid grid-cols-1 gap-2 animate-fadeIn" ref={el => { dropdownRefs.current[`${field.label}`] = el }}>
                                        {field.data?.map((item) => (
                                            <div key={item.id} onClick={() => handleDateSelect(field, item)} className="flex items-center gap-5 cursor-pointer transition-colors duration-200 ease-in-out hover:bg-gray-100 p-2 rounded">{item.value}</div>
                                        ))}
                                    </div>
                                }
                            </div>
                        )
                    })}
                </div>

                {age && <div className="min-w-fit text-primary/50">{age} years old</div>}
            </div>
        </div>
    );
}
