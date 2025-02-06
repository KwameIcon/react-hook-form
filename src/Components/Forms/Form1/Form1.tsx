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
import { handleClickOutside } from "@/utils/closeDropDowns";




export default function Form1() {
    const [queryCountries, setQueryCountries] = useState("");
    const [isNationalityOpen, setIsNationalityOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [currentMonthId, setCurrentMonthId] = useState<number>();
    const [isMonthOpen, setIsMonthOpen] = useState(false);
    const [currentDay, setCurrentDay] = useState<number | undefined>();
    const [isDayOpen, setIsDayOpen] = useState(false);
    const [currentYear, setCurrentYear] = useState<number | undefined>();
    const [isYearOpen, setIsYearOpen] = useState(false);
    const [age, setAge] = useState<number | undefined>();
    const [formData, setFormData] = useState<FieldValues>()

    // refs
    const monthRef = useRef<HTMLDivElement>(null);
    const dayRef = useRef<HTMLDivElement>(null);
    const yearRef = useRef<HTMLDivElement>(null);
    const nationalityRef = useRef<HTMLDivElement>(null);



    // useFormContext
    const { register, setValue, watch, formState, trigger } = useFormContext();
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

        return () => {
            document.removeEventListener("click", closeDropDown);
        };
    }, [isNationalityOpen, isMonthOpen, isDayOpen, isYearOpen, nationalityRef, monthRef, dayRef, yearRef, setIsNationalityOpen, setIsMonthOpen, setIsDayOpen, setIsYearOpen]);



    // watch form fields
    useEffect(() => {
        const subscribe = watch((values) => {
            setFormData(values);
            console.log(values['firstName']);
        })
        return () => subscribe.unsubscribe();
    }, [watch])




    return (
        <div className="w-full grid grid-cols-1 gap-10 md:gap-5">


            {/* flex 1 */}
            <div className="w-full grid grid-cols-1 md:flex md:items-center md:justify-between gap-5">
                <div className="w-full grid grid-cols-1 gap-1 relative">
                    <label htmlFor="firstName"> {(formData && formData["firstName"] !== "") && <span className="font-bold">First Name: </span>}
                        <TextInputField
                            type="text"
                            {...register("firstName", {
                                required: {
                                    value: true,
                                    message: "First name is missing!"
                                }
                            })}
                            placeholder="First name (Given Names)*" className={`${errors.firstName?.message ? "border-red-500 outline-red-500 placeholder:text-red-500 placeholder:text-opacity-30" : ''}`}
                        />
                    </label>


                    {/* error message */}
                    <p className="text-red-500 text-xs">{typeof errors.firstName?.message === "string" ? errors.firstName.message : ""}</p>

                    {/* danger symbol */}
                    {errors.firstName?.message && <FaExclamationCircle className="text-red-500 absolute top-[20%] right-3 text-xs" />}
                </div>


                <div className="w-full grid grid-cols-1 gap-1 relative">
                    <label htmlFor="lastName">{(formData && formData["lastName"] !== "") && <span className="font-bold">Last Name: </span>}
                        <TextInputField
                            type="text"
                            {...register("lastName", {
                                required: {
                                    value: true,
                                    message: "Last name is missing!"
                                }
                            })}
                            placeholder="Last name (Surname)*" className={`${errors.lastName?.message ? "border-red-500 outline-red-500 placeholder:text-red-500 placeholder:text-opacity-30" : ''}`} />
                    </label>


                    {/* error message */}
                    <p className="text-red-500 text-xs">{typeof errors.firstName?.message === "string" ? errors.firstName.message : ""}</p>

                    {/* danger symbol */}
                    {errors.firstName?.message && <FaExclamationCircle className="text-red-500 absolute top-[20%] right-3 text-xs" />}
                </div>
            </div>


            {/* flex 2 */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="w-full grid grid-cols-1 gap-2 overflow-visible relative">
                    <div className="w-full flex items-center justify-between gap-2">
                        <label htmlFor="city" className="w-full">{(formData && formData["city"] !== "") && <span className="font-bold">City: </span>}
                            <TextInputField
                                type="text"
                                {...register("city", {
                                    required: {
                                        value: true,
                                        message: "city is missing!"
                                    }
                                })}
                                placeholder="City of residence*"
                                className={`w-full ${errors.city?.message ? "border-red-500 outline-red-500 placeholder:text-red-500 placeholder:text-opacity-30" : ''}`} />
                        </label>
                        <div className={`w-fit relative hidden md:flex items-center ${errors.city?.message ? "text-red-500" : ''} justify-center cursor-pointer after:absolute after:z-20 after:left-5 after:content-['The_city_of_residence_is_where_you_are_living'] after:text-black/50 after:bg-white after:shadow after:w-80 after:p-3 after:h-auto after:hidden after:transition after:delay-500 after:duration-300 after:ease-in-out hover:after:block`}>
                            <Info />
                        </div>
                    </div>


                    {/* error message */}
                    <p className="text-red-500 text-xs">{typeof errors.city?.message === "string" ? errors.city.message : ""}</p>

                    {/* danger symbol */}
                    {errors.city?.message && <FaExclamationCircle className="text-red-500 absolute top-[20%] right-10 text-xs" />}
                </div>


                <div className="w-full grid grid-cols-1 gap-2 overflow-visible relative">
                    <div className="w-full flex items-center justify-between gap-2">
                        <label htmlFor="country" className="w-full">{(formData && formData["country"] !== "") && <span className="font-bold">country: </span>}
                            <TextInputField
                                type="text"
                                {...register("country", {
                                    required: {
                                        value: true,
                                        message: "country is missing!"
                                    }
                                })}
                                placeholder="Country of residence*"
                                className={`w-full ${errors.country?.message ? "border-red-500 outline-red-500 placeholder:text-red-500 placeholder:text-opacity-30" : ''}`} />
                        </label>

                        <div className={`w-fit relative hidden md:flex items-center justify-center cursor-pointer after:absolute after:z-20 after:left-5 after:content-['The_country_of_residence_is_where_you_are_living'] after:text-black/50 after:bg-white after:shadow after:w-80 after:p-3 after:h-auto after:hidden after:transition after:delay-500 after:duration-300 after:ease-in-out hover:after:block`}>
                            <Info />
                        </div>
                    </div>


                    {/* error message */}
                    <p className="text-red-500 text-xs">{typeof errors.country?.message === "string" ? errors.country.message : ""}</p>

                    {/* danger symbol */}
                    {errors.country?.message && <FaExclamationCircle className="text-red-500 absolute top-[20%] right-10 text-xs" />}
                </div>
            </div>


            {/* flex 3 */}
            <div className="w-full grid grid-cols-1 place-items-start md:grid md:grid-cols-3 box-border gap-9 md:gap-5">

                <div className="w-[99%] rounded box-border md:my-0 grid grid-cols-1 overflow-hidden relative">
                    <label htmlFor="phoneNumber">{(formData && formData["phoneNumber"] !== "") && <span className="font-bold">Telephone: </span>}
                        <PhoneInput
                            country={"gh"}
                            value={phoneNumber}
                            {...register("phoneNumber", {
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
                                setValue("phoneNumber", phone, { shouldValidate: true });
                                trigger("phoneNumber");
                            }}
                            inputProps={{
                                name: "phoneNumber",
                                className: `w-[90%] md:max-w-36 bg-secondaryBackground/30 border border-blue-300 rounded outline-primary w-10/12 ml-[2rem] px-2 h-9 ${errors.phoneNumber ? "border-red-500 outline-red-500 placeholder:text-red-500 placeholder:text-opacity-30" : ""
                                    }`,
                            }}
                        />
                    </label>


                    {/* error message */}
                    <p className="text-red-500 text-xs">{typeof errors.phoneNumber?.message === "string" ? errors.phoneNumber.message : ""}</p>

                    {/* danger symbol */}
                    {errors.phoneNumber?.message && <FaExclamationCircle className={`text-red-500 absolute ${formData && formData["phoneNumber"] !== "" ? 'top-[50%]' : 'top-[20%]'} right-2 text-xs`} />}
                </div>

                <div className="w-full md:my-0 relative ">
                    <label htmlFor="email">{(formData && formData["email"] !== "") && <span className="font-bold">Email: </span>}
                        <TextInputField
                            type="email"
                            {...register("email", {
                                pattern: {
                                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Invalid email address!"
                                },
                                required: {
                                    value: true,
                                    message: "Email is required!"
                                }
                            })} placeholder="Email*"
                            className={`${errors.email?.message ? "border-red-500 outline-red-500 placeholder:text-red-500 placeholder:text-opacity-30" : ''}`} />
                    </label>


                    {/* error message */}
                    <p className="text-red-500 text-xs">{typeof errors.email?.message === "string" ? errors.email.message : ""}</p>

                    {/* danger symbol */}
                    {errors.email?.message && <FaExclamationCircle className="text-red-500 absolute top-[20%] right-2 text-xs" />}
                </div>


                <div className="w-full relative ">
                    <label htmlFor="alternateEmail">{(formData && formData["alternateEmail"] !== "") && <span className="font-bold">Alternate Email: </span>}
                        <TextInputField
                            type="email"
                            {...register("alternateEmail", {
                                pattern: {
                                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Invalid email address!"
                                }
                            })} placeholder="Alternate email"
                            className={`${errors.alternateEmail?.message ? "border-red-500 outline-red-500 placeholder:text-red-500 placeholder:text-opacity-30" : ''}`}
                        />
                    </label>


                    {/* error message */}
                    <p className="text-red-500 text-xs">{typeof errors.alternateEmail?.message === "string" ? errors.alternateEmail.message : ""}</p>

                    {/* danger symbol */}
                    {errors.alternateEmail?.message && <FaExclamationCircle className="text-red-500 absolute top-[20%] right-2 text-xs" />}
                </div>
            </div>


            {/* flex 4 */}
            <div className="w-full grid grid-cols-2 place-items-center gap-5">
                <div className="w-full my-5 md:my-0 relative">
                    <label htmlFor="passportNumber">{(formData && formData["passportNumber"] !== "") && <span className="font-bold">Passport Number: </span>}
                        <TextInputField
                            type="text"
                            placeholder="Passport number*"
                            {...register("passportNumber", {
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
                            className={`${errors.passportNumber?.message ? "border-red-500 outline-red-500 placeholder:text-red-500 placeholder:text-opacity-30" : ''}`}
                        />
                    </label>


                    {/* error message */}
                    <p className="text-red-500 text-xs">{typeof errors.passportNumber?.message === "string" ? errors.passportNumber.message : ""}</p>

                    {/* danger symbol */}
                    {errors.passportNumber?.message && <FaExclamationCircle className="text-red-500 absolute top-[20%] right-2 text-xs" />}
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
                            onClick={() => setIsNationalityOpen(!isNationalityOpen)} />
                        </label>

                        {/* error message */}
                        <p className="text-red-500 text-xs">{typeof errors.nationality?.message === "string" ? errors.nationality.message : ""}</p>

                        {/* danger symbol */}
                        {errors.nationality?.message && <FaExclamationCircle className="text-red-500 absolute top-[20%] right-2 text-xs" />}
                    </div>

                    {isNationalityOpen &&
                        <div className="absolute max-h-80 overflow-y-scroll no-scrollbar left-0 top-[100%] bg-secondaryBackground rounded border border-black/50 p-2 z-50 grid grid-cols-1 gap-2 animate-fadeIn" ref={nationalityRef}>
                            <p className="font-bold capitalize">Country List</p>
                            <div className="w-full  h-[2px] bg-black" />
                            {handleSearchCountries()?.map((country: countryData) => (
                                <div key={country.code} className="flex items-center gap-5 cursor-pointer transition-colors duration-200 ease-in-out hover:bg-gray-100 p-2 rounded"
                                    onClick={() => {
                                        setValue('nationality', country.name, { shouldValidate: true });
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


            {/* flex 5 */}
            <div className="grid grid-cols-1 lg:flex lg:items-center gap-3 lg:gap-10">
                <p className="w-fit shrink-0">Date of birth</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">


                    {/* month */}
                    <div className="relative">
                    <label htmlFor="month">{(formData && formData["month"] !== "") && <span className="font-bold">Month: </span>}
                        <TextInputField
                            type="text"
                            {...register('month', {
                                required: {
                                    value: true,
                                    message: "Month is missing!"
                                }
                            })}
                            placeholder="Month"
                            className={`my-2 ${errors.month?.message ? "border-red-500 outline-red-500 placeholder:text-red-500 placeholder:text-opacity-30" : ''}`}
                            onClick={() => setIsMonthOpen(!isMonthOpen)} />
                        </label>

                        {/* error message */}
                        <p className="text-red-500 text-xs">{typeof errors.month?.message === "string" ? errors.month.message : ""}</p>

                        {/* danger symbol */}
                        {errors.month?.message && <FaExclamationCircle className="text-red-500 absolute top-[30%] right-2 text-xs" />}

                        {isMonthOpen &&
                            <div className="absolute w-full h-72 overflow-y-scroll no-scrollbar left-0 top-[100%] bg-white shadow rounded border border-black/50 p-2 z-50 grid grid-cols-1 gap-2 animate-fadeIn" ref={monthRef}>
                                {MONTHFULL.map((month) => (
                                    <div key={month.id} className="flex items-center gap-5 cursor-pointer transition-colors duration-200 ease-in-out hover:bg-gray-100 p-2 rounded"
                                        onClick={() => {
                                            setValue('month', month.name, { shouldValidate: true });
                                            setCurrentMonthId(month.id);
                                            setIsMonthOpen(false);
                                        }


                                        }>
                                        <div>{month.name}</div>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>


                    {/* day */}
                    <div className="relative">
                    <label htmlFor="day">{(formData && formData["day"] !== "") && <span className="font-bold">Day: </span>}
                        <TextInputField
                            type="number"
                            {...register('day', {
                                required: {
                                    value: true,
                                    message: "Day is missing!"
                                }
                            })}
                            placeholder="Day"
                            className={`my-2 ${errors.day?.message ? "border-red-500 outline-red-500 placeholder:text-red-500 placeholder:text-opacity-30" : ''}`}
                            onClick={() => setIsDayOpen(!isDayOpen)} />
                        </label>

                        {/* error message */}
                        <p className="text-red-500 text-xs">{typeof errors.day?.message === "string" ? errors.day.message : ""}</p>

                        {/* danger symbol */}
                        {errors.day?.message && <FaExclamationCircle className="text-red-500 absolute top-[30%] right-2 text-xs" />}

                        {isDayOpen &&
                            <div className="absolute w-full h-72 overflow-y-scroll no-scrollbar left-0 top-[100%] bg-white shadow rounded border border-black/50 p-2 z-50 grid grid-cols-1 gap-2 animate-fadeIn" ref={dayRef}>
                                {DAYSINMONTH.map((day, index) => (
                                    <div key={index} className="flex items-center gap-5 cursor-pointer transition-colors duration-200 ease-in-out hover:bg-gray-100 p-2 rounded"
                                        onClick={() => {
                                            setCurrentDay(day);
                                            setValue('day', day, { shouldValidate: true })
                                            setIsDayOpen(false);
                                        }

                                        }>
                                        <div>{day}</div>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>


                    {/* year */}
                    <div className="relative">
                    <label htmlFor="year">{(formData && formData["year"] !== "") && <span className="font-bold">Year: </span>}
                        <TextInputField
                            type="number"
                            {...register('year', {
                                required: {
                                    value: true,
                                    message: "Year is missing!"
                                }
                            })}
                            placeholder="Year"
                            className={`my-2 ${errors.year?.message ? "border-red-500 outline-red-500 placeholder:text-red-500 placeholder:text-opacity-30" : ''}`}
                            onClick={() => setIsYearOpen(!isYearOpen)} />
                            </label>

                        {/* error message */}
                        <p className="text-red-500 text-xs">{typeof errors.year?.message === "string" ? errors.year.message : ""}</p>

                        {/* danger symbol */}
                        {errors.year?.message && <FaExclamationCircle className="text-red-500 absolute top-[30%] right-2 text-xs" />}

                        {isYearOpen &&
                            <div className="absolute w-full h-72 overflow-y-scroll no-scrollbar left-0 top-[100%] bg-white shadow rounded border border-black/50 p-2 z-50 grid grid-cols-1 gap-2 animate-fadeIn" ref={yearRef}>
                                {YEARS.map((year, index) => (
                                    <div key={index} className="flex items-center gap-5 cursor-pointer transition-colors duration-200 ease-in-out hover:bg-gray-100 p-2 rounded"
                                        onClick={() => {
                                            setCurrentYear(year);
                                            setValue('year', year, { shouldValidate: true });
                                            setIsYearOpen(false);
                                        }
                                        }>
                                        <div>{year}</div>
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