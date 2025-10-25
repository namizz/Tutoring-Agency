import { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
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

const Register = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    description: "",
  });

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <section className="bg-white">
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
              <span className="font-mono text-green-600">092279127</span>
            </h2>
          </div>
        </div>

        {/* Option 2 */}
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
            <form>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                        required
                      />
                    </div>
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
                        className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                        required
                      />
                    </div>
                  </div>

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
                <Button name={t("register.form.button")} type="button" />
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Register;
