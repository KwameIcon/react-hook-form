"use client"
import { InsuranceCard } from "@/Components";
import { Form1, Form2, FormLayout } from "@/Components/Forms";
import { FormProgress } from "@/Components/sections";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect, useState } from "react";




export default function Forms() {
    const methods = useForm();
    const { control } = methods;
    const [isClient, setIsClient] = useState(false);
  
  
    const onSubmit = (data: FieldValues) => {
      console.log(data);
    }
  
    // display react hook form on page render
    useEffect(() => {
      setIsClient(true);
    }, []);
  
  
    // render forms based on number of travelers
    const renderForms = (travelers: number) => {
      const forms = [];
      if (travelers <= 1) return;
      for (let i = 1; i < travelers; i++) {
        forms.push(
          <Form2 firstName={`firstName${i}`} lastName={`lastName${i}`} passport={`passportNumber${i}`} nationality={`nationality${i}`} month={`month${i}`} day={`day${i}`} year={`year${i}`} />
        )
      }
      return forms;
    }


    return (
        <section>
            <FormProvider {...methods}>

                {/* form progress section */}
                <div className="w-full">
                    <FormProgress />
                </div>

                {/* form content */}
                <div className="w-full grid grid-cols-1 lg:flex lg:items-start lg:justify-start lg:gap-5 xl:gap-16 relative">


                    <div className="w-fulll h-full md:w-10/12 m-auto lg:m-0 p-2 xl:p-0 lg:w-6/12">
                        <form className="w-full h-full grid grid-cols-1 gap-16 place-items-start" noValidate>
                            <FormLayout header="Traveler details">
                                <Form1 />
                            </FormLayout>
                            {
                                renderForms(5)?.map((form, index) => (
                                    <FormLayout header={`Traveler ${index + 2} details`} key={index}>
                                        {form}
                                    </FormLayout>
                                ))
                            }
                        </form>
                        {isClient && <DevTool control={control} />}
                    </div>


                    <div className="w-full lg:max-h-[50rem] lg:w-5/12 flex items-center justify-center mt-10 lg:mt-0">
                        <InsuranceCard onSubmit={onSubmit} />
                    </div>
                </div>
            </FormProvider>
        </section>
    )
}