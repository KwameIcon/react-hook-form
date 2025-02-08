"use client"
import { TextInputField } from "@/Components/Commons";
import Info from "../../../../public/Info";
import { useEffect, useRef, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";

import { FaLocationDot } from "react-icons/fa6";
import { DAYSINMONTH, MONTHFULL, YEARS } from "@/DATA/DATEOFBIRTH";
import { FieldValues, useFormContext } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { getAge } from "@/utils/getAge";
import { countryData } from "../Form2/Form2";
import { COUNTRIES } from "@/DATA/COUNTRIES";
import { FieldDataItem, FieldsData } from "@/Types/FormDatatypes";



export type PrimaryTravelerData = {
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
    day: number;
    year: number;
};




export default function Form1() {

    // states
    const [phoneNumber, setPhoneNumber] = useState("");
    const [queryCountries, setQueryCountries] = useState("");
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [age, setAge] = useState<number | null>();
    const [formData, setFormData] = useState<FieldValues>();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    // general ref for dropdowns
    const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});



    // fields array
    const fields = [
        { id: 'firstName', label: 'First Name', placeholder: 'First name (Given Names)*', type: 'text' } as const,
        { id: 'lastName', label: 'Last Name', placeholder: 'Last name (Surname)*', type: 'text' } as const,
        { id: 'city', label: 'City', placeholder: 'City of residence*', type: 'text' } as const,
        { id: 'country', label: 'Country', placeholder: 'Country of residence*', type: 'text' } as const,
        { id: 'email', label: 'Email', placeholder: "Email*", type: 'email' } as const,
        { id: 'alternateEmail', label: 'Alternate Email', placeholder: "Alternate Email", type: 'email' } as const,
        { id: 'month', label: 'Month', placeholder: 'Month', type: 'text', data: MONTHFULL } as const,
        { id: 'day', label: 'Day', placeholder: 'Day', type: 'number', data: DAYSINMONTH } as const,
        { id: 'year', label: 'Year', placeholder: 'Year', type: 'number', data: YEARS } as const,
    ];



    // useFormContext
    const { register, setValue, watch, formState, trigger } = useFormContext<PrimaryTravelerData>();
    const { errors } = formState;



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




    // Dropdown item click handler:
    const handleDateSelect = (field: FieldsData, item: FieldDataItem) => {
        if (field.id === 'month') {
            setSelectedMonth(item.id);
        } else if (field.id === 'day') {
            setSelectedDay(item.id);
        } else if (field.id === 'year') {
            setSelectedYear(item.id);
        }
        setValue(field.id, item.value, { shouldValidate: true });
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





    // Listen for screen resize events
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);




    return (
        <div className="w-full grid grid-cols-1 gap-2 md:gap-5">


            {/* flex 1 */}
            {/* firstname and lastname */}
            <div className="w-full grid grid-cols-1 md:flex md:items-center md:justify-between gap-2 md:gap-5">
                {fields.slice(0, 2).map((field) => (
                    <div className="w-full grid grid-cols-1 gap-5 relative" key={field.id}>
                        <label htmlFor={field.id}>
                            {(formData && formData[field.id] !== "") && <span className="font-bold">{field.label}: </span>}
                            <TextInputField
                                type={field.type}
                                {...register(field.id, {
                                    required: { value: true, message: `${field.label} is missing!` }
                                })}
                                placeholder={field.placeholder}
                                className={`${errors[field.id]?.message ? "border-red-500 outline-red-500 placeholder:text-red-500 placeholder:text-opacity-30" : ''}`}
                            />
                        </label>

                        {/* error message */}
                        <p className="text-red-500 text-xs">{errors[field.id]?.message || ""}</p>

                        {/* danger symbol */}
                        {errors[field.id]?.message && <FaExclamationCircle className="text-red-500 absolute top-[20%] right-3 text-xs" />}
                    </div>
                ))}
            </div>


            {/* flex 2 */}
            {/* city and country */}
            <div className="w-full grid grid-cols-1 md:flex md:items-center md:justify-between gap-5">
                {fields.slice(2, 4).map(field => (
                    <div className="w-full grid grid-cols-1 gap-2 overflow-visible relative" key={field.id}>
                        <div className="w-full flex items-center justify-between gap-2">
                            <label htmlFor={`${field.id}`} className="w-full">{(formData && formData[field.id] !== "") && <span className="font-bold">{field.label}: </span>}
                                <TextInputField
                                    type={`${field.type}`}
                                    {...register(field.id, {
                                        required: {
                                            value: true,
                                            message: `${field.label} is missing!`
                                        }
                                    })}
                                    placeholder={`${field.label} of residence*`}
                                    className={`w-full ${errors[field.id]?.message ? "border-red-500 outline-red-500 placeholder:text-red-500 placeholder:text-opacity-30" : ''}`} />
                            </label>
                            <div className={`w-fit relative hidden md:flex items-center ${errors[field.id]?.message ? "text-red-500" : ''} justify-center cursor-pointer after:absolute after:z-20 after:left-5 ${field.label === 'City' ? "after:content-['The_city_of_residence_is_where_you_are_living']" : "after:content-['The_country_of_residence_is_where_you_are_living']"} after:text-black/50 after:bg-white after:shadow after:w-80 after:p-3 after:h-auto after:hidden after:transition after:delay-500 after:duration-300 after:ease-in-out hover:after:block`}>
                                <Info />
                            </div>
                        </div>

                        {/* error message */}
                        <p className="text-red-500 text-xs">{typeof errors[field.id]?.message === "string" ? errors[field.id]?.message : ""}</p>

                        {/* danger symbol */}
                        {errors[field.id]?.message && <FaExclamationCircle className="text-red-500 absolute top-[20%] right-10 text-xs" />}
                    </div>
                ))
                }
            </div>


            {/* flex 3 phone, email and alternate email */}
            <div className="w-full grid grid-cols-1 place-items-start md:grid-cols-3 box-border mt-3 gap-7">

                <div className="w-full md:col-span-1 rounded box-border border-red-500 md:my-0 grid grid-cols-1 relative">
                    <label htmlFor="phone">{(formData && formData["phone"] !== "") && <span className="font-bold">Telephone: </span>}
                        <PhoneInput
                            country="gh"
                            value={phoneNumber}
                            {...register("phone", {
                                required: {
                                    value: true,
                                    message: "Phone number is missing!"
                                },
                                minLength: {
                                    value: 12,
                                    message: "Invalid phone number!"
                                },
                                maxLength: {
                                    value: 12,
                                    message: "Phone number length exceeded!"
                                }
                            })}
                            onChange={(phone) => {
                                setPhoneNumber(phone);
                                setValue("phone", phone, { shouldValidate: true });
                                trigger("phone");
                            }}
                            containerClass={`flex items-center relative box-border w-full justify-between bg-secondaryBackground/30 border border-blue-300 rounded outline-primary h-9 ${errors.phone ? "border-red-500 outline-red-500 placeholder:text-red-500 placeholder:text-opacity-30" : ""}`}
                            inputProps={{
                                name: "phoneNumber",
                            }}
                            // inputClass="bg-white w-[5rem]"
                            inputStyle={{ background: 'transparent', width: screenWidth < 768 ? '100%' : '10.3rem', border: 'none' }}
                            // buttonClass="absolute top-0 left-0 w-10"
                            buttonStyle={{ position: 'absolute', top: 0, left: 0, width: '2.5rem', border: 'none', borderRight: '1px solid #ccc' }}
                        />
                    </label>


                    {/* error message */}
                    <p className="text-red-500 text-xs">{typeof errors.phone?.message === "string" ? errors.phone.message : ""}</p>

                    {/* danger symbol */}
                    {errors.phone?.message && <FaExclamationCircle className={`text-red-500 absolute ${formData && formData["phoneNumber"] !== "" ? 'top-[50%]' : 'top-[20%]'} right-2 text-xs`} />}
                </div>

                {/* email and alternate email */}
                <div className="w-full md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-2">
                    {
                        fields.slice(4, 6).map(field => (
                            <div className="w-full md:my-0 relative " key={field.id}>
                                <label htmlFor={`${field.id}`}>{(formData && formData[field.id] !== "") && <span className="font-bold">{field.label}: </span>}
                                    <TextInputField
                                        type="email"
                                        {...register(field.id, {
                                            pattern: {
                                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                message: "Invalid email address!"
                                            },
                                            required: {
                                                value: field.id !== "alternateEmail",
                                                message: "Email is required!"
                                            }
                                        })} placeholder={field.placeholder}
                                        className={`${errors[field.id]?.message ? "border-red-500 outline-red-500 placeholder:text-red-500 placeholder:text-opacity-30" : ''}`} />
                                </label>


                                {/* error message */}
                                <p className="text-red-500 text-xs">{typeof errors[field.id]?.message === "string" ? errors[field.id]?.message : ""}</p>

                                {/* danger symbol */}
                                {errors[field.id]?.message && <FaExclamationCircle className="text-red-500 absolute top-[20%] right-2 text-xs" />}
                            </div>
                        ))
                    }
                </div>
            </div>


            {/* flex 4 */}
            <div className="w-full grid grid-cols-2 place-items-center gap-5">
                <div className="w-full my-5 md:my-0 relative">
                    <label htmlFor="passport">{(formData && formData["passport"] !== "") && <span className="font-bold">Passport Number: </span>}
                        <TextInputField
                            type="text" placeholder="Passport number*"
                            {...register("passport", {
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
                            className={`${errors.passport?.message ? "border-red-500 outline-red-500 placeholder:text-red-500 placeholder:text-opacity-30" : ''}`}
                        />
                    </label>


                    {/* error message */}
                    <p className="text-red-500 text-xs">{typeof errors.passport?.message === "string" ? errors.passport.message : ""}</p>

                    {/* danger symbol */}
                    {errors.passport?.message && <FaExclamationCircle className="text-red-500 absolute top-[20%] right-2 text-xs" />}
                </div>

                <div className="w-full grid grid-cols-1 relative">
                    <div className="relative w-full">
                        <label htmlFor="nationality">{(formData && formData["nationality"] !== "") && <span className="font-bold">Nationality: </span>}
                            <TextInputField
                                type="search"
                                {...register('nationality', {
                                    required: {
                                        value: true,
                                        message: "Nationality is missing!"
                                    }
                                })}
                                onChange={(e) => { setQueryCountries(e.target.value); setValue("nationality", e.target.value, { shouldValidate: true }) }}
                                placeholder="Nationality"
                                className={`${errors.nationality?.message ? "border-red-500 outline-red-500 placeholder:text-red-500 placeholder:text-opacity-30" : ''}`}
                                onClick={() => setOpenDropdown(openDropdown === 'nationality' ? null : 'nationality')} />
                        </label>

                        {/* error message */}
                        <p className="text-red-500 text-xs">{typeof errors.nationality?.message === "string" ? errors.nationality.message : ""}</p>

                        {/* danger symbol */}
                        {errors.nationality?.message && <FaExclamationCircle className="text-red-500 absolute top-[20%] right-2 text-xs" />}
                    </div>

                    {openDropdown === 'nationality' &&
                        <div className="absolute max-h-80 overflow-y-scroll no-scrollbar left-0 top-[100%] bg-secondaryBackground rounded border border-black/50 p-2 z-50 grid grid-cols-1 gap-2 animate-fadeIn" ref={el => { dropdownRefs.current['nationality'] = el }}>
                            <p className="font-bold capitalize">Country List</p>
                            <div className="w-full  h-[2px] bg-black" />
                            {handleSearchCountries()?.map((country: countryData) => (
                                <div key={country.code} className="flex items-center gap-5 cursor-pointer transition-colors duration-200 ease-in-out hover:bg-gray-100 p-2 rounded"
                                    onClick={() => {
                                        setValue('nationality', country.name, { shouldValidate: true });
                                        setQueryCountries("");
                                        setOpenDropdown(null);
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


            {/* flex 5 */}
            <div className="grid grid-cols-1 lg:flex lg:items-center gap-3 lg:gap-10">
                <p className="w-fit shrink-0">Date of birth</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* month, day and year selection */}
                    {fields.slice(6).map((field) => (
                        <div className="w-full relative" key={field.id}>
                            <div className="relative w-full">
                                <label htmlFor={field.id}>
                                    {(formData && formData[field.id]) && <span className="font-bold">{field.label}: </span>}
                                    <TextInputField
                                        type={field.type}
                                        {...register(field.id, { required: { value: true, message: `${field.label} is missing!` } })}
                                        onClick={() => setOpenDropdown(openDropdown === field.label ? null : field.label)}
                                        placeholder={field.placeholder}
                                        className={`${errors[field.id]?.message ? "border-red-500 outline-red-500 placeholder:text-red-500 placeholder:text-opacity-30" : ''}`}
                                    />
                                </label>


                                {/* error message */}
                                <p className="text-red-500 text-xs">{String(errors[field.id]?.message ?? "")}</p>

                                {/* danger symbol */}
                                {errors[field.id]?.message && <FaExclamationCircle className="text-red-500 absolute top-[20%] right-2 text-xs" />}
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
                    ))}
                </div>

                {age && <div className="min-w-fit text-primary/50">{age} years old</div>}

            </div>
        </div>
    )
}