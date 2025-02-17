"use client"

import { InsuranceCard } from "@/Components";
import { FormLayout, OtherTraveler, PrimaryTraveler } from "@/Components/Forms";
import { FormProgress } from "@/Components/sections";
import { FormProvider, useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect, useState } from "react";
import { FormDataTypes, Traveler } from "@/Types/FormDatatypes";
import { FaTimesCircle } from "react-icons/fa";
import { Tooltip } from "antd";
import dayjs from "dayjs";



// default form values
const defaultValues = {
    firstName: "",
    lastName: "",
    city: "",
    country: "",
    phone: "",
    email: "",
    alternateEmail: "",
    passport: "",
    nationality: "",
    month: "",
    week: null,
    year: null,
    dateOfBirth: null,
    otherTravelers: [],
}



export default function TravelersForm() {

    // states
    // form data
    const methods = useForm<FormDataTypes>({
        defaultValues
    });
    const { control, handleSubmit, formState: { errors } } = methods;
    // useFieldArray
    const { fields, append, remove } = useFieldArray<FormDataTypes, "otherTravelers", "id">({
        control,
        name: "otherTravelers",
    });
    const [isClient, setIsClient] = useState(false);



    // submit form data
    const onSubmit = (data: FormDataTypes) => {
        handleDateOfBirth(data);
    
        data.otherTravelers.forEach(traveler => {
            handleDateOfBirth(traveler);
        });
    
        console.log("Form Data:", data);
    };
    
    const handleDateOfBirth = (data: Traveler | FormDataTypes) => {
        const month = dayjs(data.month).get('month');
        const week = dayjs(data.week).get('date');
        const year = dayjs(data.year).get('year');
    
        if (month && week && year) {
            const dateString = `${year}-${month}-${week}`;
    
            if (dateString) {
                data.dateOfBirth = dateString;
            } else {
                console.error("Invalid Date");
                data.dateOfBirth = null;
            }
            console.log("Formatted Data is: ", dateString);
        } else {
            data.dateOfBirth = null;
        }
    };



    // set isClient to true when page renders on client side
    useEffect(() => {
        setIsClient(true);
    }, []);
    // prevent displaying jsx on server rendering
    if (!isClient) return null;



    return (
        <section className="w-[95%] m-auto xl:w-full grid grid-cols-1 gap-10">
            <FormProvider {...methods}>
                {/* form progress section */}
                <div className="w-full">
                    <FormProgress />
                </div>


                {/* form content */}
                <div className="w-full md:w-full m-auto grid grid-cols-1 lg:flex lg:items-start lg:justify-start lg:gap-5 xl:gap-16 relative">
                    <form className="w-full grid grid-cols-1 lg:grid-cols-2 lg:gap-5 xl:gap-16 relative" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="flex-1 w-full h-fit grid grid-cols-1 gap-10 place-items-start">
                            {/* primary traveler form */}
                            <FormLayout header="Traveler details">
                                <PrimaryTraveler />
                            </FormLayout>


                            {/* other travelers */}
                            {/* Map over the fields to render otherTraveler form */}
                            {fields.map((field, index) => (
                                <FormLayout header={`Traveler ${index + 2} details`} key={field.id}>
                                    <OtherTraveler
                                        fieldIndex={index}
                                        errors={errors}

                                    />

                                    {/* Button to remove traveler */}
                                    <div className="bg-secondaryBackground">
                                        <Tooltip title="Remove traveler">
                                            <div onClick={() => remove(index)}
                                                className="absolute -top-5 right-5 w-8 h-8 px-2 my-5 text-sm transition-colors duration-200 ease-in-out bg-gray-200 hoverbg-gray-500 rounded-full cursor-pointer text-white flex items-center justify-center " >
                                                <FaTimesCircle className="text-gray-300 transition-colors duration-200 ease-in-out hover:text-gray-500" />
                                            </div>
                                        </Tooltip>
                                    </div>
                                </FormLayout>
                            ))}

                            {/* Button to add new traveler */}
                            <button type="button" onClick={() => append({ firstName: "", lastName: "", passport: "", nationality: "", month: "", week: null, year: null, dateOfBirth: null })}
                                className="w-full m-auto h-12 bg-primary rounded-full text-white flex items-center justify-center">
                                Add Traveler
                            </button>
                        </div>


                        <div className="flex-1 w-full lg:max-h-[50rem] flex items-center justify-center mt-10 lg:mt-0">
                            <InsuranceCard />
                        </div>

                    </form>
                    {/* display react-hook-form on client side */}
                    {isClient && <DevTool control={control} />}
                </div>
            </FormProvider>
        </section>
    );
}
