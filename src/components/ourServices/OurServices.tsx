import { DocumentTextIcon } from "@heroicons/react/24/solid";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function OurServices() {
  const navigate = useNavigate();

  return (
    <Box className="w-100">
      <section
        className="flex flex-col gap-7 sm:gap-14 bg-teal-600 py-20 sm:py-28 px-6 lg:px-8 items-center"
        id="services"
      >
        <div className="w-100 nav flex flex-col gap-4 items-center">
          <p className="flex items-center gap-2 text-xl/3 font-semibold text-yellow-500">
            <div className="h-[1.5px] w-5 bg-white rounded" />
            خدماتنا
          </p>

          <h2 className="text-2xl sm:text-4xl font-bold text-white ">
            الخدمات الالكترونية
          </h2>
          <p className="text-lg font-medium text-slate-200 text-center">
            نهدف إلى تقديم خدمات الكترونية سهلة الوصول إليك دون حاجة للانتظار في
            طوابير طويلة
          </p>
        </div>

        <div className="cards flex flex-wrap items-center gap-7 justify-center">
          <div className="w-80 h-72 flex flex-col order-1 gap-4 p-3 rounded-xl bg-white items-center justify-center ">
            <div className="w-fit h-fit card-icon rounded-md p-2 bg-yellow-500 bg-opacity-20">
              <DocumentTextIcon className="w-6 h-6 text-yellow-500" />
            </div>

            <div className="card-title">
              <h3 className="text-xl font-bold leading-8 text-slate-800">
                استمارة منحة وزارة النفط
              </h3>
            </div>

            <div className="card-description mb-4">
              <p className="text-base leading-6 text-slate-700 text-center">
                سيتوفر التقديم على استمارة تسجيل منحة وزارة النفط قريبا
              </p>
            </div>

            <div className="card-cta">
              <button
                onClick={() => navigate("#")}
                className="w-28 rounded-md bg-yellow-500 px-3.5 py-2.5 text-sm font-semibold text-zinc-800 hover:bg-yellow-400 disabled:opacity-60 "
                disabled
              >
                قريبا
              </button>
            </div>
          </div>

          <div className="w-80 h-72 flex flex-col order-first sm:order-1 gap-4 p-3 rounded-xl bg-white items-center justify-center ">
            <div className="w-fit h-fit card-icon rounded-md p-2 bg-yellow-500 bg-opacity-20">
              <DocumentTextIcon className="w-6 h-6 text-yellow-500" />
            </div>

            <div className="card-title">
              <h3 className="text-xl font-bold leading-8 text-slate-800">
                استمارة ذوي الشهداء
              </h3>
            </div>

            <div className="card-description mb-4">
              <p className="text-base leading-6 text-slate-700 text-center">
                يمكنك التقديم على استمارة ذوي الشهداء والمضحين الان
              </p>
            </div>

            <div className="card-cta">
              <button
                onClick={() => navigate("IdentityForm")}
                className="w-28 rounded-md bg-yellow-500 px-3.5 py-2.5 text-sm font-semibold text-zinc-800 hover:bg-yellow-400 "
              >
                التقديم الان
              </button>
            </div>
          </div>

          <div className="w-80 h-72 flex flex-col order-last gap-4 p-3 rounded-xl bg-white items-center justify-center ">
            <div className="w-fit h-fit card-icon rounded-md p-2 bg-yellow-500 bg-opacity-20">
              <DocumentTextIcon className="w-6 h-6 text-yellow-500" />
            </div>

            <div className="card-title">
              <h3 className="text-xl font-bold leading-8 text-slate-800">
                استمارات اخرى
              </h3>
            </div>

            <div className="card-description mb-4">
              <p className="text-base leading-6 text-slate-700 text-center">
                سيتوفر التقديم على استمارات اخرى من خلال الموقع قريبا
              </p>
            </div>

            <div className="card-cta">
              <button
                onClick={() => navigate("#")}
                className="w-28 rounded-md bg-yellow-500 px-3.5 py-2.5 text-sm font-semibold text-zinc-800 hover:bg-yellow-400 disabled:opacity-60 "
                disabled
              >
                قريبا
              </button>
            </div>
          </div>
        </div>
      </section>
    </Box>
  );
}
