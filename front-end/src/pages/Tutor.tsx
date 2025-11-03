// app/register/page.tsx
"use client";

import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import InputBox from "../components/InputBox";
import ComboBox from "../components/ComboBox";
import FileDropZone from "../components/FileUpload";
import ReviewStep from "../container/Review";

const schema = z.object({
  fullName: z.string().min(1),
  address: z.string().min(1),
  university: z.string().min(1),
  department: z.string().optional(),
  nationalId: z.instanceof(File),
  fanNumber: z.string().min(1),
  phone: z.string().min(1),
  telegram: z.string().min(1),
  highSchool: z.instanceof(File),
  examResults: z.instanceof(File).optional(),
  universityResults: z.instanceof(File).optional(),
  languageSkills: z.instanceof(File).optional(),
  subjectSpeciality: z.string().optional(),
  yearsExperience: z.string().min(1),
  experienceDetail: z.enum([
    "High School Student",
    "Elementary Student",
    "Both",
  ]),
  tutorArea: z.string().min(1),
  daysTimes: z.string().min(1),
  certificates: z.instanceof(File).optional(),
});

type FormData = z.infer<typeof schema>;

export default function RegisterForm() {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const watchedFiles = watch([
    "nationalId",
    "highSchool",
    "examResults",
    "universityResults",
    "languageSkills",
    "certificates",
  ]);

  const formData = watch();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Final Submit:", data);
    console.log(step);
    alert("Application submitted successfully!"); // Only here
  };

  const nextStep = async () => {
    const fields =
      step === 1
        ? [
            "fullName",
            "address",
            "university",
            "nationalId",
            "fanNumber",
            "phone",
            "telegram",
          ]
        : step === 2
        ? ["highSchool", "yearsExperience", "experienceDetail"]
        : step === 3
        ? ["tutorArea", "daysTimes"]
        : [];

    if (step < 4) {
      const valid = await trigger(fields as any[]);
      if (valid) setStep((s) => s + 1);
    }
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl bg-white rounded-xl shadow-sm p-8"
      >
        <h1 className="text-center text-2xl font-semibold text-gray-900 mb-8">
          Application to be Tutor
        </h1>

        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>
              Step {step} of {totalSteps}
            </span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-600 transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* STEP 1 */}
          {step === 1 && (
            <>
              <InputBox
                label="Full Name"
                register={register("fullName")}
                error={errors.fullName?.message}
                required
              />
              <InputBox
                label="Address"
                register={register("address")}
                error={errors.address?.message}
                required
              />
              <InputBox
                label="University / College"
                register={register("university")}
                error={errors.university?.message}
                required
              />
              <InputBox
                label="Department"
                register={register("department")}
                placeholder="Optional"
              />
              <div className="md:col-span-2">
                <FileDropZone
                  label="National ID Picture"
                  id="nationalId"
                  onFileSelect={(f) =>
                    setValue("nationalId", f || undefined, {
                      shouldValidate: true,
                    })
                  }
                  defaultFile={watchedFiles[0]}
                  error={errors.nationalId?.message}
                  required
                />
              </div>
              <InputBox
                label="National ID (FAN Number)"
                register={register("fanNumber")}
                error={errors.fanNumber?.message}
                required
              />
              <InputBox
                label="Phone Number"
                register={register("phone")}
                error={errors.phone?.message}
                required
              />
              <InputBox
                label="Telegram Username"
                register={register("telegram")}
                error={errors.telegram?.message}
                required
              />
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <div className="md:col-span-2">
                <FileDropZone
                  label="High School Records"
                  id="highSchool"
                  onFileSelect={(f) =>
                    setValue("highSchool", f || undefined, {
                      shouldValidate: true,
                    })
                  }
                  defaultFile={watchedFiles[1]}
                  error={errors.highSchool?.message}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <FileDropZone
                  label="Entrance Examination Results"
                  id="examResults"
                  onFileSelect={(f) => setValue("examResults", f || undefined)}
                  defaultFile={watchedFiles[2]}
                />
              </div>
              <div className="md:col-span-2">
                <FileDropZone
                  label="University Grade Report"
                  id="universityResults"
                  onFileSelect={(f) =>
                    setValue("universityResults", f || undefined)
                  }
                  defaultFile={watchedFiles[3]}
                />
              </div>
              <FileDropZone
                label="Language Proficiency"
                id="languageSkills"
                onFileSelect={(f) => setValue("languageSkills", f || undefined)}
                defaultFile={watchedFiles[4]}
              />
              <ComboBox
                label="Subject Specialities"
                register={register("subjectSpeciality")}
                options={["Math", "Physics", "Chemistry", "English", "Biology"]}
              />
              <InputBox
                label="Years of Tutoring Experience"
                register={register("yearsExperience")}
                error={errors.yearsExperience?.message}
                required
              />
              <ComboBox
                label="Teaching Roles"
                register={register("experienceDetail")}
                options={["High School Student", "Elementary Student", "Both"]}
                error={errors.experienceDetail?.message}
                required
              />
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <InputBox
                label="Areas in Addis Ababa You Can Tutor"
                register={register("tutorArea")}
                error={errors.tutorArea?.message}
                required
              />
              <InputBox
                label="Preferred Days and Times"
                register={register("daysTimes")}
                error={errors.daysTimes?.message}
                required
              />
              <div className="md:col-span-2">
                <FileDropZone
                  label="Certificates & Additional Documentation"
                  id="certificates"
                  onFileSelect={(f) => setValue("certificates", f || undefined)}
                  defaultFile={watchedFiles[5]}
                />
              </div>
            </>
          )}

          {/* STEP 4: REVIEW */}
          {step === 4 && (
            <ReviewStep data={formData} watchedFiles={watchedFiles} />
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md font-medium hover:bg-gray-300 transition"
            >
              Back
            </button>
          )}
          <div className={step > 1 ? "" : "ml-auto"}>
            {step < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition"
              >
                {step === 3 ? "Review" : "Next"}
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-3 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition"
              >
                Submit Application
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
