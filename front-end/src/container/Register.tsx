import { useState } from "react";
import { FaPhoneAlt, FaCheckCircle } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/DMCard";
import Button from "../components/Button";
import { useTranslation } from "react-i18next";

const BACKEND_URL = import.meta.env.VITE_BACKEND;

const Register = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    description: "",
  });
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    // clear error on typing
    if (errors[id as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: { name?: string; phone?: string } = {};
    if (!formData.name.trim())
      newErrors.name = t("register.form.errors.nameRequired");
    if (!formData.phone.trim())
      newErrors.phone = t("register.form.errors.phoneRequired");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const message = `\n\n\n\n New Registration:\nName: ${formData.name}\nPhone: ${formData.phone}\nAdditional Info: ${formData.description}`;

    try {
      const response = await fetch(`${BACKEND_URL}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({ name: "", phone: "", description: "" });
        setTimeout(() => setShowSuccess(false), 5000);
      }
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="bg-white" id="register">
        <div className="py-12 px-6 flex flex-col gap-10 max-w-4xl mx-auto">
          {/* Option 1 */}
          <div className="flex flex-col md:flex-row items-center gap-4 bg-white border border-gray-200 p-6 rounded-2xl shadow-xs">
            <div className="flex-shrink-0 bg-green-100 p-4 rounded-full flex items-center justify-center">
              <FaPhoneAlt className="text-green-600 w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm font-medium text-gray-500">
                {t("register.option1.title")}
              </h3>
              <h2 className="text-lg font-semibold text-gray-800">
                {t("register.option1.description")}{" "}
                <a href="tel:0939841549" className="font-mono text-green-600">
                  0939841549
                </a>
              </h2>
            </div>
          </div>

          {/* Option 2 – Form */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-gray-700">
              {t("register.option2.title")}
            </h3>

            <Card className="bg-white border border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-slate-600">
                  {t("register.form.title")}
                </CardTitle>
                <CardDescription className="text-gray-800">
                  {t("register.form.description")}
                </CardDescription>
              </CardHeader>

              <form onSubmit={onSubmit}>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          {t("register.form.name")}{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={t("register.form.namePlaceholder")}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 ${
                            errors.name ? "border-red-500" : "border-gray-200"
                          }`}
                        />
                        {errors.name && (
                          <p className="text-xs text-red-600 mt-1">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">
                          {t("register.form.phone")}{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder={t("register.form.phonePlaceholder")}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 ${
                            errors.phone ? "border-red-500" : "border-gray-200"
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-xs text-red-600 mt-1">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <label
                        htmlFor="description"
                        className="text-sm font-medium"
                      >
                        {t("register.form.additional")}
                      </label>
                      <textarea
                        id="description"
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                        placeholder={t("register.form.additionalPlaceholder")}
                        className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                      />
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col items-center gap-2 mt-4">
                  <Button
                    name={
                      isSubmitting
                        ? t("register.form.submitting")
                        : t("register.form.button")
                    }
                    type="submit"
                    // disabled={isSubmitting}
                  />
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fadeIn">
          <div
            className="fixed inset-0 bg-opacity-50"
            onClick={() => setShowSuccess(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <FaCheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {t("register.form.successTitle") || "Thank You!"}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We have received your information. We will contact you as soon
                as possible.
              </p>
              <button
                onClick={() => setShowSuccess(false)}
                className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                {t("register.form.close") || "Close"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
