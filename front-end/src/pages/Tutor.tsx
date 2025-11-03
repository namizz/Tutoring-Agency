import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import InputBox from "../components/InputBox";
import ComboBox from "../components/ComboBox";
import FileDropZone from "../components/FileUpload";
import ReviewStep from "../container/Review";

const schema = z.object({
  fullName: z.string().min(1, { message: "Full Name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  university: z.string().min(1, { message: "University is required" }),
  department: z.string().optional(),
  nationalId: z
    .instanceof(File, { message: "National ID is required" })
    .nullable(),
  fanNumber: z.string().min(1, { message: "FAN Number is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  telegram: z.string().min(1, { message: "Telegram username is required" }),
  highSchool: z
    .instanceof(File, { message: "High School Records are required" })
    .nullable(),
  examResults: z.instanceof(File).optional(),
  universityResults: z.instanceof(File).optional(),
  languageSkills: z.instanceof(File).optional(),
  subjectSpeciality: z.string().optional(),
  yearsExperience: z
    .string()
    .min(0, { message: "Years of experience is required" }),
  experienceDetail: z.enum([
    "High School Student",
    "Elementary Student",
    "Both",
  ]),
  tutorArea: z.string().min(1, { message: "Tutor area is required" }),
  daysTimes: z.string().min(1, { message: "Availability is required" }),
  certificates: z.instanceof(File).optional(),
});

type FormData = z.infer<typeof schema>;

export default function RegisterForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    try {
      const missingFiles: string[] = [];

      const fileLabels = [
        { key: "nationalId", label: "National ID Picture" },
        { key: "highSchool", label: "High School Records" },
        { key: "examResults", label: "Entrance Examination Results" },
        { key: "universityResults", label: "University Grade Report" },
        { key: "languageSkills", label: "Language Proficiency" },
        {
          key: "certificates",
          label: "Certificates & Additional Documentation",
        },
      ];

      fileLabels.forEach(({ key, label }) => {
        if (!data[key as keyof FormData]) {
          missingFiles.push(label);
        }
      });

      const missingNote =
        missingFiles.length > 0
          ? `\n\nMissing Files: ${missingFiles.join(", ")}`
          : "";

      const message = `
        New Tutor Application

        Full Name: ${data.fullName}
        Address: ${data.address}
        University: ${data.university}
        Department: ${data.department || "—"}
        FAN Number: ${data.fanNumber}
        Phone: ${data.phone}
        Telegram: @${data.telegram}
        Experience: ${data.yearsExperience} years
        Teaching Role: ${data.experienceDetail}
        Subject: ${data.subjectSpeciality || "—"}
        Tutor Areas: ${data.tutorArea}
        Availability: ${data.daysTimes}${missingNote}
            `.trim();

      // === 2. Send text message ===
      await fetch("http://localhost:8080/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      // === 3. Send all files (images & PDFs) to /pdf ===
      const filesToSend = fileLabels
        .filter(({ key }) => data[key as keyof FormData])
        .map(({ key, label }) => ({
          file: data[key as keyof FormData] as File,
          caption: `${data.fullName}'s ${label}`,
        }));

      for (const { file, caption } of filesToSend) {
        const form = new FormData();
        form.append("pdf", file);
        form.append("caption", caption);

        await fetch("http://localhost:8080/pdf", {
          method: "POST",
          body: form,
        });
      }

      alert("Application submitted to Telegram!");
    } catch (err) {
      console.error(err);
      alert("Submission failed. Check console.");
    } finally {
      setIsSubmitting(false);
    }
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
      if (valid) {
        // Background ping to wake Render (non-blocking)
        Promise.resolve().then(async () => {
          try {
            await fetch(`http://localhost:8080/ping`, {
              method: "GET",
              cache: "no-cache",
            });
            console.log("Server pinged (woken up)");
          } catch (err) {
            console.warn(
              "Ping failed (server may be cold, but will warm on submit)",
              err
            );
          }
        });

        // Proceed to next step
        setStep((s) => s + 1);
      }
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
                    setValue("nationalId", f, {
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
                    setValue("highSchool", f, {
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
            <ReviewStep
              data={formData}
              watchedFiles={watchedFiles.map((f) => f ?? undefined)}
            />
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
                disabled={isSubmitting}
                className="px-6 py-3 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
