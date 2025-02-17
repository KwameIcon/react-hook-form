"use client"

import React, { useEffect, useState } from "react";
import { DAYSINMONTH, MONTHFULL, YEARS } from "@/DATA/DATEOFBIRTH";
import { Controller, FieldErrors, FieldValues, useFormContext } from "react-hook-form";
import { FaExclamationCircle } from "react-icons/fa";
import { getAge } from "@/utils/getAge";
import { COUNTRIES } from "@/DATA/COUNTRIES";
import { FormDataTypes } from "@/Types/FormDatatypes";
import { ConfigProvider, DatePicker, Input, Select, } from 'antd';
import { theme } from "../../../../theme";
import dayjs, { Dayjs } from "dayjs";




// Form2 types
type Form2Props = {
    fieldIndex: number;
    errors: FieldErrors<FormDataTypes>;
}

export type countryData = {
    name: string;
    code: string;
}


export default function OtherTraveler({ fieldIndex, errors }: Form2Props) {
    // states
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [age, setAge] = useState<number | null>();
    const [formData, setFormData] = useState<FieldValues>();

    // useForm
    const { watch, control } = useFormContext();


    const fieldGroups = {
        firstRole: [
            { id: "firstName", label: "First Name", placeholder: "First name (Given Names)*", type: "text" } as const,
            { id: "lastName", label: "Last Name", placeholder: "Last name (Surname)*", type: "text" } as const,
        ],
        secondRole: [
            { id: "passport", label: "Passport Number*", placeholder: "Passport number", type: "text", } as const,
            { id: "nationality", label: "Nationality*", placeholder: "Nationality", type: "search", data: COUNTRIES } as const,
        ],
        thirdRole: [
            { id: "month", label: "Month", placeholder: "Month*", type: "text", data: MONTHFULL } as const,
            { id: "week", label: "Day", placeholder: "Day*", type: "number", data: DAYSINMONTH } as const,
            { id: "year", label: "Year", placeholder: "Year*", type: "number", data: YEARS } as const,
        ],
    };



    // handle date selections
    const handleMonthSelect = (date: dayjs.Dayjs | null) => {
        if (date) {
            setSelectedMonth(date?.get('month'));
        } else {
            setSelectedMonth(null);
        }
    };

    const handleDaySelect = (date: dayjs.Dayjs | null) => {
        if (date) {
            setSelectedDay(date?.get('date'));
        } else {
            setSelectedDay(null);
        }
    };

    const handleYearSelect = (date: dayjs.Dayjs | null) => {
        if (date) {
            setSelectedYear(date?.get("year"));
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





    return (
        <ConfigProvider theme={theme}>
            <div className="w-full grid grid-cols-1 gap-3 md:gap-5">
                {/* flex 1 */}
                {/* firstname and lastname */}
                <div className="w-full grid grid-cols-1 md:flex md:items-center md:justify-between gap-2 md:gap-5">
                    {
                        fieldGroups.firstRole.map((fieldItem) => {
                            const fieldError = errors?.otherTravelers?.[fieldIndex]?.[fieldItem.id]?.message ?? null;
                            const fieldData = formData?.otherTravelers[fieldIndex]?.[fieldItem.id];
                            return (
                                <div className="w-full grid grid-cols-1 relative" key={fieldItem.id}>
                                    <label htmlFor={`otherTravelers.${fieldIndex}.${fieldItem.id}`}>
                                        {(fieldData !== "") && <span className="font-bold text-sm">{fieldItem.label}: </span>}
                                        <Controller
                                            name={`otherTravelers.${fieldIndex}.${fieldItem.id}`}
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
                                                    className={`w-full h-9 bg-secondaryBackground/30 hover:bg-secondaryBackground/30 ${fieldError ? "border-red-500 placeholder:text-red-500 placeholder:text-opacity-30" : ""}`}
                                                />
                                            )}
                                        />
                                    </label>

                                    {/* Error message */}
                                    <p className="text-red-500 text-xs">{fieldError || ""}</p>

                                    {/* Danger symbol */}
                                    {fieldError && (
                                        <FaExclamationCircle className="text-red-500 absolute top-[20%] right-3 text-xs" />
                                    )}
                                </div>
                            )
                        })}
                </div>



                {/* flex 2 */}
                {/* Passport and Nationality */}
                <div className="w-full grid grid-cols-2 my-5 md:mt-0 place-items-center gap-5">
                    {fieldGroups.secondRole.map(fieldItem => {
                        const fieldError = errors?.otherTravelers?.[fieldIndex]?.[fieldItem.id]?.message ?? null;
                        const fieldData = formData?.otherTravelers[fieldIndex]?.[fieldItem.id];

                        return (
                            <div className="w-full relative" key={fieldItem.id}>
                                <div className="relative w-full">
                                    <label htmlFor={`otherTravelers.${fieldIndex}.${fieldItem.id}`}>
                                        {(fieldData !== "") && <span className="font-bold text-sm">{fieldItem.label}: </span>}

                                        <Controller
                                            name={`otherTravelers.${fieldIndex}.${fieldItem.id}`}
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
                                                        status={fieldError ? 'error' : ''}
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
                                                ) : (
                                                    <Input
                                                        {...field}
                                                        placeholder={fieldItem.label}
                                                        // status={fieldError ? "error" : ""}
                                                        className={`w-full bg-secondaryBackground/30 hover:bg-secondaryBackground/30 ${fieldError ? "border-red-500 outline-red-500 placeholder:text-red-500 placeholder:text-opacity-30" : ''}`}
                                                    />
                                                )
                                            }
                                        />
                                    </label>

                                    {/* Error Message */}
                                    <p className="text-red-500 text-xs">
                                        {fieldError || ""}
                                    </p>

                                    {/* Danger Symbol */}
                                    {fieldError && (
                                        <FaExclamationCircle className="text-red-500 absolute top-[20%] right-2 text-xs" />
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>


                {/* Month, Day, and Year selection */}
                <div className="grid grid-cols-1 lg:flex lg:items-center gap-3 lg:gap-10">
                    <p className="w-fit shrink-0">Date of birth</p>

                    {/* Month, Day, and Year Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {fieldGroups.thirdRole.map((fieldItem) => {
                            const fieldError = errors?.otherTravelers?.[fieldIndex]?.[fieldItem.id]?.message ?? null;
                            const fieldData = formData?.otherTravelers[fieldIndex]?.[fieldItem.id];

                            return (
                                <div className="w-full relative" key={fieldItem.id}>
                                    <div className="relative w-full">
                                        <label htmlFor={fieldItem.id}>
                                            {(fieldData) && <span className="font-bold text-sm">{fieldItem.label}: </span>}

                                            <Controller
                                                name={`otherTravelers.${fieldIndex}.${fieldItem.id}`}
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
                                                            onChange={(date: dayjs.Dayjs | null) => { handleDaySelect(date); field.onChange(date) }}
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
                                                            onChange={(date: dayjs.Dayjs | null) => { handleYearSelect(date); field.onChange(date) }}
                                                            disabledDate={disabledDate}
                                                            className="w-full h-9 bg-secondaryBackground/30 hover:bg-secondaryBackground/30"
                                                        />
                                                    )
                                                )}
                                            />
                                        </label>

                                        {/* Error Message */}
                                        <p className="text-red-500 text-xs">
                                            {fieldError || ""}
                                        </p>

                                        {/* Danger Symbol */}
                                        {fieldError && (
                                            <FaExclamationCircle className="text-red-500 absolute top-[20%] right-2 text-xs" />
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {age && <div className="min-w-fit text-primary/50">{age} years old</div>}
                </div>
            </div>
        </ConfigProvider>
    );
}
