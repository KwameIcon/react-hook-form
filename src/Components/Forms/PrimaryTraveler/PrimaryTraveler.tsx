"use client"
import { useEffect, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";

import { Controller, FieldValues, useFormContext } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { getAge } from "@/utils/getAge";
import { COUNTRIES } from "@/DATA/COUNTRIES";
import { ConfigProvider, DatePicker, Input, Select } from 'antd';
import { theme } from "../../../../theme";
import dayjs, { Dayjs } from "dayjs";
import { FormDataTypes } from "@/Types/FormDatatypes";




export default function PrimaryTraveler() {

    // states
    const [phoneNumber, setPhoneNumber] = useState("");
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [age, setAge] = useState<number | null>();
    const [formData, setFormData] = useState<FieldValues>();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    // useFormContext
    const { register, setValue, watch, formState, trigger, control } = useFormContext<FormDataTypes>();
    const { errors } = formState;





    // form fields data
    const fieldGroups = {
        firstRole: [
            { id: "firstName", label: "First Name", placeholder: "First name (Given Names)*", type: "text" } as const,
            { id: "lastName", label: "Last Name", placeholder: "Last name (Surname)*", type: "text" } as const,
        ],
        secondRole: [
            { id: 'city', label: 'City', placeholder: 'City of residence*', type: 'text' } as const,
            { id: 'country', label: 'Country', placeholder: 'Country of residence*', type: 'search', data: COUNTRIES } as const,
        ],
        thirdRole: [
            { id: 'email', label: 'Email', placeholder: "Email*", type: 'email' } as const,
            { id: 'alternateEmail', label: 'Alternate Email', placeholder: "Alternate Email", type: 'email' } as const,
        ],
        fourthRole: [
            { id: "passport", label: "Passport Number*", placeholder: "Passport number", type: "text", } as const,
            { id: "nationality", label: "Nationality*", placeholder: "Nationality", type: "search", data: COUNTRIES } as const,
        ],
        fifthRole: [
            { id: "month", label: "Month", placeholder: "Month*", type: "text", } as const,
            { id: "week", label: "Day", placeholder: "Day*", type: "number", } as const,
            { id: "year", label: "Year", placeholder: "Year*", type: "number", } as const,
        ],
    };





    // handle date selections
    const handleMonthSelect = (date: dayjs.Dayjs | null) => {
        if (date) {
            setSelectedMonth(date.get('month'));
        } else {
            setSelectedMonth(null);
        }
    };

    const handleDaySelect = (date: dayjs.Dayjs | null) => {
        if (date) {
            setSelectedDay(date.get('date'));
        } else {
            setSelectedDay(null);
        }
    };

    const handleYearSelect = (date: dayjs.Dayjs | null) => {
        if (date) {
            setSelectedYear(date.get('year'));
        } else {
            setSelectedYear(null);
        }
    };




    // disabledDate
    const disabledDate = (currentDate: Dayjs) => {
        const currentMonth = currentDate.month();
        const currentYear = currentDate.year();
        const today = dayjs();
        const todayMonth = today.month();
        const todayYear = today.year();

        if (currentYear > todayYear) {
            return true;
        }

        if (currentYear === todayYear && currentMonth > todayMonth) {
            return true;
        }

        return false;
    };



    // get traveler age
    useEffect(() => {
        if (selectedMonth !== null && selectedDay !== null && selectedYear !== null) {
            const calculatedAge = getAge(selectedMonth + 1, selectedDay, selectedYear);
            setAge(calculatedAge ?? null);
        } else {
            setAge(null);
        }
    }, [selectedMonth, selectedDay, selectedYear]);




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
        <ConfigProvider theme={theme}>
            <div className="w-full grid grid-cols-1 gap-2 md:gap-5">
                {/* flex 1 */}
                {/* firstname and lastname */}
                <div className="w-full grid grid-cols-1 md:flex md:items-center md:justify-between gap-2 md:gap-5">
                    {fieldGroups?.firstRole?.map((fieldItem) => (
                        <div className="w-full grid grid-cols-1 relative" key={fieldItem.id}>
                            <label htmlFor={fieldItem.id}>
                                {(formData && formData[fieldItem.id] !== "") && (
                                    <span className="font-bold text-sm">{fieldItem.label}: </span>
                                )}
                                <Controller
                                    name={fieldItem.id}
                                    control={control}
                                    rules={{
                                        required: { value: true, message: `${fieldItem.label} is missing!` }
                                    }}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            id={fieldItem.id}
                                            type={fieldItem.type}
                                            placeholder={fieldItem.placeholder}
                                            className={`w-full h-9 bg-secondaryBackground/30 hover:bg-secondaryBackground/30 ${errors[fieldItem.id] ? "border-red-500 placeholder:text-red-500 placeholder:text-opacity-30" : ""}`}
                                        />
                                    )}
                                />
                            </label>

                            {/* Error message */}
                            <p className="text-red-500 text-xs">{errors[fieldItem.id]?.message || ""}</p>

                            {/* Danger symbol */}
                            {errors[fieldItem.id] && (
                                <FaExclamationCircle className="text-red-500 absolute top-[20%] right-3 text-xs" />
                            )}
                        </div>
                    ))}
                </div>


                {/* flex 2 */}
                {/* city and country */}
                <div className="w-full grid grid-cols-1 md:flex md:items-center md:justify-between gap-5">
                    {
                        fieldGroups.secondRole.map((fieldItem) => {
                            const fieldError = errors[fieldItem.id]?.message;
                            return (
                                <div className="w-full grid grid-cols-1 overflow-visible relative" key={fieldItem.id}>
                                    <label htmlFor={`${fieldItem.id}`} className="w-full">{(formData && formData[fieldItem.id] !== "") && <span className="font-bold text-sm">{fieldItem.label}: </span>}
                                        {
                                            fieldItem.type !== 'search' ?
                                                <Controller
                                                    name={fieldItem.id}
                                                    control={control}
                                                    rules={{
                                                        required: { value: true, message: `${fieldItem.label} is missing!` }
                                                    }}
                                                    render={({ field }) => (
                                                        <Input
                                                            {...field}
                                                            id={fieldItem.id}
                                                            type={fieldItem.type}
                                                            placeholder={fieldItem.placeholder}
                                                            className={`w-full h-9 bg-secondaryBackground/30 hover:bg-secondaryBackground/30 ${errors[fieldItem.id] ? "border-red-500 placeholder:text-red-500 placeholder:text-opacity-30" : ""}`}
                                                        />
                                                    )}
                                                /> :
                                                <Controller
                                                    name="country"
                                                    control={control}
                                                    rules={{ required: "country is required!" }}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}
                                                            showSearch
                                                            placeholder="Select a country"
                                                            status={errors[fieldItem.id] ? 'error' : ''}
                                                            filterOption={(input, option) =>
                                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                            }
                                                            options={fieldItem.data?.map((country) => ({
                                                                value: country.name,
                                                                label: country.name
                                                            }))}
                                                            className={`w-full h-9 ${fieldError ? "border-red-500 outline-red-500 [&_.ant-select-selection-placeholder]:text-red-500 [&_.ant-select-selection-placeholder]:text-opacity-30" : ''}`}
                                                            value={field.value || undefined}
                                                            onChange={(value) => field.onChange(value)}
                                                            onBlur={field.onBlur}
                                                        />
                                                    )}
                                                />

                                        }
                                    </label>

                                    {/* error message */}
                                    <p className="text-red-500 text-xs">{fieldError || ""}</p>

                                    {/* danger symbol */}
                                    {fieldError && <FaExclamationCircle className="text-red-500 absolute top-[20%] right-3 text-xs" />}
                                </div>
                            )
                        })
                    }
                </div>


                {/* flex 3 */}
                {/* phone, email and alternate email */}
                <div className="w-full grid grid-cols-1 place-items-start md:grid-cols-3 box-border mt-3 gap-7">

                    <div className="w-full md:col-span-1 rounded box-border border-red-500 md:my-0 grid grid-cols-1 relative">
                        <label htmlFor="phone">{(formData && formData["phone"] !== "") && <span className="font-bold text-sm">Telephone: </span>}
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
                                inputStyle={{ background: 'transparent', width: screenWidth < 768 ? '100%' : '10.3rem', border: 'none' }}
                                buttonStyle={{ position: 'absolute', top: 0, left: 0, width: '2.5rem', border: 'none', borderRight: '1px solid #ccc' }}
                            />
                        </label>


                        {/* error message */}
                        <p className="text-red-500 text-xs">{typeof errors.phone?.message === "string" ? errors.phone.message : ""}</p>

                        {/* danger symbol */}
                        {errors.phone?.message && <FaExclamationCircle className={`text-red-500 absolute ${formData && formData["phoneNumber"] !== "" ? 'top-[40%]' : 'top-[20%]'} right-2 text-xs`} />}
                    </div>


                    {/* Email and Alternate Email */}
                    <div className="w-full md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-2">
                        {fieldGroups.thirdRole.map((fieldItem) => (
                            <div className="w-full md:my-0 relative" key={fieldItem.id}>
                                <label htmlFor={fieldItem.id}>
                                    {formData && formData[fieldItem.id] !== "" && (
                                        <span className="font-bold text-sm">{fieldItem.label}: </span>
                                    )}

                                    <Controller
                                        name={fieldItem.id}
                                        control={control}
                                        rules={{
                                            pattern: {
                                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                message: "Invalid email address!",
                                            },
                                            required: fieldItem.id !== "alternateEmail" && {
                                                value: true,
                                                message: "Email is required!",
                                            },
                                        }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                type="email"
                                                placeholder={fieldItem.placeholder}
                                                className={`w-full bg-secondaryBackground/30 hover:bg-secondaryBackground/30 ${errors[fieldItem.id] ? "border-red-500 outline-red-500 placeholder:text-red-500 placeholder:text-opacity-30" : ''}`}
                                            />
                                        )}
                                    />
                                </label>

                                {/* Error Message */}
                                <p className="text-red-500 text-xs">
                                    {errors[fieldItem.id]?.message || ""}
                                </p>

                                {/* Danger Symbol */}
                                {errors[fieldItem.id]?.message && (
                                    <FaExclamationCircle className="text-red-500 absolute top-[20%] right-2 text-xs" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>


                {/* flex 4 */}
                {/* Passport and Nationality */}
                <div className="w-full grid grid-cols-2 my-5 md:mt-0 place-items-center gap-5">
                    {fieldGroups.fourthRole.map((fieldItem) => (
                        <div className="w-full relative" key={fieldItem.id}>
                            <div className="relative w-full">
                                <label htmlFor={fieldItem.id}>
                                    {formData && formData[fieldItem.id] !== "" && (
                                        <span className="font-bold text-sm">{fieldItem.label}: </span>
                                    )}

                                    <Controller
                                        name={fieldItem.id}
                                        control={control}
                                        rules={
                                            fieldItem.id === "passport"
                                                ? {
                                                    required: {
                                                        value: true,
                                                        message: "Passport is missing!",
                                                    },
                                                    minLength: {
                                                        value: 9,
                                                        message: "Invalid passport number",
                                                    },
                                                    maxLength: {
                                                        value: 9,
                                                        message: "Invalid passport number",
                                                    },
                                                }
                                                : {
                                                    required: {
                                                        value: true,
                                                        message: "Nationality is missing!",
                                                    },
                                                }
                                        }
                                        render={({ field }) =>
                                            fieldItem.id === "nationality" ? (
                                                <Select
                                                    {...field}
                                                    showSearch
                                                    placeholder="Select Nationality"
                                                    status={errors[fieldItem.id] ? 'error' : ''}
                                                    filterOption={(input, option) =>
                                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                    }
                                                    options={fieldItem.data?.map((country) => ({
                                                        value: country.name,
                                                        label: country.name
                                                    }))}
                                                    className={`w-full h-9 ${errors[fieldItem.id] ? "border-red-500 outline-red-500 [&_.ant-select-selection-placeholder]:text-red-500 [&_.ant-select-selection-placeholder]:text-opacity-30" : ''}`}
                                                    value={field.value || undefined}
                                                    onChange={(value) => field.onChange(value)}
                                                    onBlur={field.onBlur}
                                                />
                                            ) : (
                                                <Input
                                                    {...field}
                                                    placeholder={fieldItem.label}
                                                    // status={errors[fieldItem.id] ? "error" : ""}
                                                    className={`w-full bg-secondaryBackground/30 hover:bg-secondaryBackground/30 ${errors[fieldItem.id] ? "border-red-500 outline-red-500 placeholder:text-red-500 placeholder:text-opacity-30" : ''}`}
                                                />
                                            )
                                        }
                                    />
                                </label>

                                {/* Error Message */}
                                <p className="text-red-500 text-xs">
                                    {errors[fieldItem.id]?.message || ""}
                                </p>

                                {/* Danger Symbol */}
                                {errors[fieldItem.id]?.message && (
                                    <FaExclamationCircle className="text-red-500 absolute top-[20%] right-2 text-xs" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>


                {/* flex 5 */}
                <div className="grid grid-cols-1 lg:flex lg:items-center gap-3 lg:gap-10">
                    <p className="w-fit shrink-0">Date of birth</p>

                    {/* Month, Day, and Year Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {fieldGroups?.fifthRole?.map((fieldItem) => (
                            <div className="w-full relative" key={fieldItem.id}>
                                <div className="relative w-full">
                                    <label htmlFor={fieldItem.id}>
                                        {formData && formData[fieldItem.id] && (
                                            <span className="font-bold text-sm">{fieldItem.label}: </span>
                                        )}

                                        <Controller
                                            name={fieldItem.id}
                                            control={control}
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: `${fieldItem.label} is missing!`,
                                                },
                                            }}
                                            render={({ field }) => (
                                                fieldItem.id === 'month' ? (
                                                    <DatePicker
                                                        {...field}
                                                        picker="month"
                                                        placeholder="Month*"
                                                        format={'MM'}
                                                        value={field.value ? dayjs(field.value) : undefined}
                                                        onChange={(date: dayjs.Dayjs | null) => { handleMonthSelect(date); field.onChange(date) }}
                                                        disabledDate={disabledDate}
                                                        className="w-full h-9 bg-secondaryBackground/30 hover:bg-secondaryBackground/30"
                                                    />
                                                ) : fieldItem.id === 'week' ? (
                                                    <DatePicker
                                                        {...field}
                                                        picker="date"
                                                        placeholder="Day*"
                                                        format={'DD'}
                                                        value={field.value ? dayjs(field.value) : undefined}
                                                        onChange={(date) => { handleDaySelect(date); field.onChange(date) }}
                                                        disabledDate={disabledDate}
                                                        className="w-full h-9 bg-secondaryBackground/30 hover:bg-secondaryBackground/30"
                                                    />
                                                ) : (
                                                    <DatePicker
                                                        {...field}
                                                        picker="year"
                                                        placeholder="Year*"
                                                        format={'YYYY'}
                                                        value={field.value ? dayjs(field.value) : undefined}
                                                        onChange={(date) => { handleYearSelect(date); field.onChange(date) }}
                                                        disabledDate={disabledDate}
                                                        className="w-full h-9 bg-secondaryBackground/30 hover:bg-secondaryBackground/30"
                                                    />
                                                )
                                            )}
                                        />
                                    </label>

                                    {/* Error Message */}
                                    <p className="text-red-500 text-xs">
                                        {errors[fieldItem.id]?.message || ""}
                                    </p>

                                    {/* Danger Symbol */}
                                    {errors[fieldItem.id]?.message && (
                                        <FaExclamationCircle className="text-red-500 absolute top-[20%] right-2 text-xs" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {age && <div className="min-w-fit text-primary/50">{age} years old</div>}

                </div>
            </div>
        </ConfigProvider>
    )
}