"use client"
import { TextInputField } from "@/Components/Commons";
import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { DAYSINMONTH, MONTHFULL, YEARS } from "@/DATA/DATEOFBIRTH";
import { FieldValues, useFormContext } from "react-hook-form";
import { FaExclamationCircle } from "react-icons/fa";
import { getAge } from "@/utils/getAge";
import { COUNTRIES } from "@/DATA/COUNTRIES";
import { handleClickOutside } from "@/utils/closeDropDowns";



// Form2 types
type Form2Props = {
    firstName: string;
    lastName: string;
    passport: string;
    nationality: string;
    month: string;
    day: string;
    year: string;
}

export type countryData = {
    name: string;
    code: string;
}



export default function Form2({ firstName, lastName, passport, nationality, month, day, year }: Form2Props) {


    // states
    const [queryCountries, setQueryCountries] = useState("");
    const [isNationalityOpen, setIsNationalityOpen] = useState(false);
    const [currentMonthId, setCurrentMonthId] = useState<number>();
    const [isMonthOpen, setIsMonthOpen] = useState(false);
    const [currentDay, setCurrentDay] = useState<number | undefined>();
    const [isDayOpen, setIsDayOpen] = useState(false);
    const [currentYear, setCurrentYear] = useState<number | undefined>();
    const [isYearOpen, setIsYearOpen] = useState(false);
    const [age, setAge] = useState<number | undefined>();
    const [formData, setFormData] = useState<FieldValues>()


    // refs for dropdowns
    const nationalityRef = React.useRef<HTMLDivElement | null>(null);
    const monthRef = React.useRef<HTMLDivElement | null>(null);
    const dayRef = React.useRef<HTMLDivElement | null>(null);
    const yearRef = React.useRef<HTMLDivElement | null>(null)


    // useForm
    const { register, setValue, watch, formState: { errors } } = useFormContext();



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
    }



    // get traveler age
    useEffect(() => {
        if (currentMonthId !== undefined && currentDay !== undefined && currentYear !== undefined) {
            const travelerAge = getAge(currentMonthId, currentDay, currentYear);
            setAge(travelerAge ? travelerAge : undefined);
        }
    }, [currentMonthId, currentDay, currentYear]);


    // close dropdowns on click outside
    useEffect(() => {
        const closeDropDown = (e: MouseEvent) => handleClickOutside({ e, isNationalityOpen, isMonthOpen, isDayOpen, isYearOpen, nationalityRef, monthRef, dayRef, yearRef, setIsNationalityOpen, setIsMonthOpen, setIsDayOpen, setIsYearOpen });

        document.addEventListener("click", closeDropDown);

        return (() => {
            window.removeEventListener("click", closeDropDown);
        })
    }, [isNationalityOpen, isMonthOpen, isDayOpen, isYearOpen, nationalityRef, monthRef, dayRef, yearRef, setIsNationalityOpen, setIsMonthOpen, setIsDayOpen, setIsYearOpen]);




    // watch form fields
    useEffect(() => {
        const subscribe = watch((values) => {
            setFormData(values);
            console.log(values['firstName']);
        })
        return () => {
            subscribe.unsubscribe();
        }
    }, [watch])



    return (
        <div className="w-full grid grid-cols-1 gap-5">


            {/* flex 1 */}
            <div className="w-full grid grid-cols-1 md:flex md:items-center md:justify-between gap-5">
                {/* first name */}
                <div className="w-full grid grid-cols-1 gap-1 relative">
                    <label htmlFor={firstName}> {(formData && formData[firstName] !== "") && <span className="font-bold">First Name: </span>}
                        <TextInputField
                            type="text"
                            {...register(firstName, {
                                required: {
                                    value: true,
                                    message: "First name is missing!"
                                }
                            })}
                            placeholder="First name (Given Names)*" className={`${errors[firstName]?.message ? "border-red-500 outline-red-500 placeholder:text-red-500 placeholder:text-opacity-30" : ''}`}
                        />
                    </label>


                    {/* error message */}
                    <p className="text-red-500 text-xs">{typeof errors[firstName]?.message === "string" ? errors[firstName].message : ""}</p>

                    {/* danger symbol */}
                    {errors[firstName]?.message && <FaExclamationCircle className="text-red-500 absolute top-[20%] right-3 text-xs" />}
                </div>


                {/* last name */}
                <div className="w-full grid grid-cols-1 gap-1 relative">
                    <label htmlFor={lastName}> {(formData && formData[lastName] !== "") && <span className="font-bold">Last Name: </span>}
                        <TextInputField
                            type="text"
                            {...register(lastName, {
                                required: {
                                    value: true,
                                    message: "Last name is missing!"
                                }
                            })}
                            placeholder="Last name (Surname)*" className={`${errors[lastName]?.message ? "border-red-500 outline-red-500 placeholder:text-red-500 placeholder:text-opacity-30" : ''}`} />
                    </label>

                    {/* error message */}
                    <p className="text-red-500 text-xs">{typeof errors[lastName]?.message === "string" ? errors[lastName].message : ""}</p>

                    {/* danger symbol */}
                    {errors[lastName]?.message && <FaExclamationCircle className="text-red-500 absolute top-[20%] right-3 text-xs" />}
                </div>
            </div>




            {/* flex 2 */}
            <div className="w-full grid grid-cols-2 place-items-center gap-5">
                {/* passort number */}
                <div className="w-full my-5 md:my-0 relative">
                    <label htmlFor={passport}> {(formData && formData[passport] !== "") && <span className="font-bold">Passport Number: </span>}
                        <TextInputField
                            type="text"
                            placeholder="Passport number*"
                            {...register(passport, {
                                required: {
                                    value: true,
                                    message: "Passport is missing!"
                                },
                                minLength: {
                                    value: 9,
                                    message: "Invalid passport number"
                                },
                                maxLength: {
                                    value: 9,
                                    message: "Invalid passport number"
                                }
                            })}
                            className={`${errors[passport]?.message ? "border-red-500 outline-red-500 placeholder:text-red-500 placeholder:text-opacity-30" : ''}`}
                        />
                    </label>


                    {/* error message */}
                    <p className="text-red-500 text-xs">{typeof errors[passport]?.message === "string" ? errors[passport].message : ""}</p>

                    {/* danger symbol */}
                    {errors[passport]?.message && <FaExclamationCircle className="text-red-500 absolute top-[20%] right-2 text-xs" />}
                </div>


                {/* nationality */}
                <div className="w-full flex items-center justify-start relative">
                    <div className="relative w-full">
                        <label htmlFor={nationality}> {(formData && formData[nationality] !== "") && <span className="font-bold">Nationality: </span>}
                            <TextInputField
                                type="search"
                                {...register(nationality, {
                                    required: {
                                        value: true,
                                        message: "Nationality is missing!"
                                    }
                                })}
                                placeholder="Nationality"
                                onChange={(e) => { setQueryCountries(e.target.value); setValue(nationality, e.target.value, { shouldValidate: true }) }}
                                className={`${errors[nationality]?.message ? "border-red-500 outline-red-500 placeholder:text-red-500 placeholder:text-opacity-30" : ''}`}
                                onClick={() => setIsNationalityOpen(!isNationalityOpen)} />
                        </label>

                        {/* error message */}
                        <p className="text-red-500 text-xs">{typeof errors[nationality]?.message === "string" ? errors[nationality].message : ""}</p>

                        {/* danger symbol */}
                        {errors[nationality]?.message && <FaExclamationCircle className="text-red-500 absolute top-[20%] right-2 text-xs" />}
                    </div>

                    {isNationalityOpen &&
                        <div className="absolute max-h-80 overflow-y-scroll no-scrollbar left-0 top-[100%] bg-secondaryBackground rounded border p-2 z-50 grid grid-cols-1 gap-2 animate-fadeIn" ref={nationalityRef}>
                            <p className="font-bold capitalize">Country List</p>
                            <div className="w-full  h-[2px] bg-black" />
                            {handleSearchCountries()?.map((country: countryData) => (
                                <div key={country.code} className="flex items-center gap-5 cursor-pointer transition-colors duration-200 ease-in-out hover:bg-gray-100 p-2 rounded"
                                    onClick={() => {
                                        setValue(nationality, country.name, { shouldValidate: true });
                                        setIsNationalityOpen(false);
                                    }
                                    }>
                                    <FaLocationDot />
                                    <div>{country.name}</div>
                                </div>
                            ))}
                        </div>
                    }
                </div>
            </div>




            {/* flex 3 */}
            <div className="grid grid-cols-1 lg:flex lg:items-center gap-3 lg:gap-10">
                <p className="w-fit shrink-0">Date of birth</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">


                    {/* month */}
                    <div className="relative">
                        <label htmlFor={month}> {(formData && formData[month] !== "") && <span className="font-bold">Month: </span>}
                            <TextInputField
                                type="text"
                                {...register(month, {
                                    required: {
                                        value: true,
                                        message: "Month is missing!"
                                    }
                                })}
                                placeholder="Month"
                                className={`my-2 ${errors[month]?.message ? "border-red-500 outline-red-500 placeholder:text-red-500 placeholder:text-opacity-30" : ''}`}
                                onClick={() => setIsMonthOpen(!isMonthOpen)} />
                        </label>

                        {/* error message */}
                        <p className="text-red-500 text-xs">{typeof errors[month]?.message === "string" ? errors[month].message : ""}</p>

                        {/* danger symbol */}
                        {errors[month]?.message && <FaExclamationCircle className="text-red-500 absolute top-[20%] right-2 text-xs" />}

                        {isMonthOpen &&
                            <div className="absolute w-full h-72 overflow-y-scroll no-scrollbar left-0 top-[100%] bg-white shadow rounded border p-2 z-50 grid grid-cols-1 gap-2 animate-fadeIn" ref={monthRef}>
                                {MONTHFULL.map((m) => (
                                    <div key={m.id} className="flex items-center gap-5 cursor-pointer transition-colors duration-200 ease-in-out hover:bg-gray-100 p-2 rounded" onClick={() => {
                                        setCurrentMonthId(m.id);
                                        setValue(month, m.name, { shouldValidate: true });
                                        setIsMonthOpen(false);
                                    }

                                    }>
                                        <div>{m.name}</div>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>


                    {/* day */}
                    <div className="relative">
                        <label htmlFor={day}> {(formData && formData[day] !== "") && <span className="font-bold">Day: </span>}
                            <TextInputField
                                type="number"
                                {...register(day, {
                                    required: {
                                        value: true,
                                        message: "Day is missing!"
                                    }
                                })}
                                placeholder="Day"
                                className={`my-2 ${errors[day]?.message ? "border-red-500 outline-red-500 placeholder:text-red-500 placeholder:text-opacity-30" : ''}`}
                                onClick={() => setIsDayOpen(!isDayOpen)} />
                        </label>

                        {/* error message */}
                        <p className="text-red-500 text-xs">{typeof errors[day]?.message === "string" ? errors[day].message : ""}</p>

                        {/* danger symbol */}
                        {errors[day]?.message && <FaExclamationCircle className="text-red-500 absolute top-[20%] right-2 text-xs" />}

                        {isDayOpen &&
                            <div className="absolute w-full h-72 overflow-y-scroll no-scrollbar left-0 top-[100%] bg-white shadow rounded border p-2 z-50 grid grid-cols-1 gap-2 animate-fadeIn" ref={dayRef}>
                                {DAYSINMONTH.map((d, index) => (
                                    <div key={index} className="flex items-center gap-5 cursor-pointer transition-colors duration-200 ease-in-out hover:bg-gray-100 p-2 rounded"
                                        onClick={() => {
                                            setCurrentDay(d);
                                            setValue(day, d, { shouldValidate: true });
                                            setIsDayOpen(false);
                                        }

                                        }>
                                        <div>{d}</div>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>


                    {/* year */}
                    <div className="relative">
                        <label htmlFor={year}> {(formData && formData[year] !== "") && <span className="font-bold">Year: </span>}
                            <TextInputField
                                type="number"
                                {...register(year, {
                                    required: {
                                        value: true,
                                        message: "Year is missing!"
                                    }
                                })}
                                placeholder="Year"
                                className={`my-2 ${errors[year]?.message ? "border-red-500 outline-red-500 placeholder:text-red-500 placeholder:text-opacity-30" : ''}`}
                                onClick={() => setIsYearOpen(!isYearOpen)} />
                        </label>

                        {/* error message */}
                        <p className="text-red-500 text-xs">{typeof errors[year]?.message === "string" ? errors[year].message : ""}</p>

                        {/* danger symbol */}
                        {errors[year]?.message && <FaExclamationCircle className="text-red-500 absolute top-[20%] right-2 text-xs" />}

                        {isYearOpen &&
                            <div className="absolute w-full h-72 overflow-y-scroll no-scrollbar left-0 top-[100%] bg-white shadow rounded border p-2 z-50 grid grid-cols-1 gap-2 animate-fadeIn" ref={yearRef}>
                                {YEARS.map((y, index) => (
                                    <div key={index} className="flex items-center gap-5 cursor-pointer transition-colors duration-200 ease-in-out hover:bg-gray-100 p-2 rounded"
                                        onClick={() => {
                                            setCurrentYear(y);
                                            setValue(year, y, { shouldValidate: true });
                                            setIsYearOpen(false);
                                        }
                                        }>
                                        <div>{y}</div>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                </div>
                {age && <div className="min-w-fit text-primary/50">{age} years old</div>}
            </div>
        </div>
    )
}