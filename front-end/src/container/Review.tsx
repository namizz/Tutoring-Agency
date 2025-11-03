// components/ReviewStep.tsx
import React from "react";

interface ReviewStepProps {
  data: any;
  watchedFiles: (File | undefined)[];
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
  data,
  watchedFiles,
}) => {
  const fileLabels = [
    "National ID Picture",
    "High School Records",
    "Entrance Examination Results",
    "University Grade Report",
    "Language Proficiency",
    "Certificates & Additional Documentation",
  ];

  return (
    <div className="md:col-span-2 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        Review Your Application
      </h2>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <p className="mt-1 text-gray-900">{data.fullName}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Address</label>
            <p className="mt-1 text-gray-900">{data.address}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              University / College
            </label>
            <p className="mt-1 text-gray-900">{data.university}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Department
            </label>
            <p className="mt-1 text-gray-900">{data.department || "—"}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              National ID (FAN Number)
            </label>
            <p className="mt-1 text-gray-900">{data.fanNumber}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <p className="mt-1 text-gray-900">{data.phone}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Telegram Username
            </label>
            <p className="mt-1 text-gray-900">{data.telegram}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Years of Tutoring Experience
            </label>
            <p className="mt-1 text-gray-900">{data.yearsExperience}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Teaching Roles
            </label>
            <p className="mt-1 text-gray-900">{data.experienceDetail}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Subject Specialities
            </label>
            <p className="mt-1 text-gray-900">
              {data.subjectSpeciality || "—"}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Tutor Areas in Addis Ababa
            </label>
            <p className="mt-1 text-gray-900">{data.tutorArea}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Preferred Days & Times
            </label>
            <p className="mt-1 text-gray-900">{data.daysTimes}</p>
          </div>
        </div>

        {/* Files Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Uploaded Documents
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {fileLabels.map((label, i) => {
              const file = watchedFiles[i];
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  {file ? (
                    <>
                      {file.type.startsWith("image/") ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt={label}
                          className="h-12 w-12 object-cover rounded"
                        />
                      ) : (
                        <svg
                          className="w-10 h-10 text-gray-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" />
                          <path d="M5 8h10v1H5V8z" />
                        </svg>
                      )}
                      <span className="text-sm font-medium text-gray-700 truncate max-w-xs">
                        {file.name}
                      </span>
                    </>
                  ) : (
                    <span className="text-gray-400 text-sm">
                      — Not uploaded —
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReviewStep;
