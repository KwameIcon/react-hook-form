"use client"

import { InsuranceCard } from "@/Components";
import { Form1, Form2, FormLayout } from "@/Components/Forms";
import { FormProgress } from "@/Components/sections";
import { FieldValues, FormProvider, useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect, useState } from "react";
import { FormDataTypes } from "@/Types/FormDatatypes";



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
    day: null,
    year: null,
    otherTravelers: [],
}



export default function Forms() {
    // form data
    const methods = useForm<FormDataTypes>({
        defaultValues
    });
    const { control, handleSubmit, formState: { errors } } = methods;



    // useFieldArray
    const { fields, append, remove } = useFieldArray<FormDataTypes, "otherTravelers", "id" >({
        control,
        name: "otherTravelers",
    });



    const [isClient, setIsClient] = useState(false);



    // submit form data
    const onSubmit = (data: FieldValues) => {
        console.log(data)
    };


    // display react hook form on page render
    useEffect(() => {
        setIsClient(true);
    }, []);


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
                            <FormLayout header="Traveler details">
                                <Form1 />
                            </FormLayout>

                            {/* Map over the fields to render Form1 for each traveler */}
                            {fields.map((field, index) => (
                                <FormLayout header={`Traveler ${index + 2} details`} key={field.id}>
                                    <Form2
                                        fieldIndex={index}
                                        errors={errors}

                                    />
                                    {/* Button to remove traveler */}
                                    <button type="button" onClick={() => remove(index)}
                                        className="w-fit h-10 px-2 my-5 text-sm bg-red-800 rounded text-white flex items-center justify-center">
                                        Remove Traveler {index + 2}
                                    </button>
                                </FormLayout>
                            ))}

                            {/* Button to add new traveler */}
                            <button type="button" onClick={() => append({ firstName: "", lastName: "", passport: "", nationality: "", month: "", day: null, year: null })}
                                className="w-full m-auto h-12 bg-primary rounded-full text-white flex items-center justify-center">
                                Add Traveler
                            </button>
                        </div>


                        <div className="flex-1 w-full lg:max-h-[50rem] flex items-center justify-center mt-10 lg:mt-0">
                            <InsuranceCard />
                        </div>
                    </form>
                    {isClient && <DevTool control={control} />}
                </div>
            </FormProvider>
        </section>
    );
}
