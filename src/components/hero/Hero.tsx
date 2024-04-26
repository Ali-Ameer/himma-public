import {
    ArrowLongLeftIcon,
    ArrowPathIcon,
    CloudArrowUpIcon,
    FingerPrintIcon,
    LockClosedIcon,
  } from "@heroicons/react/24/outline";
  import { Link } from "react-router-dom";
  
  const features = [
    {
      name: "تقديم بسهولة",
      description:
        "نقدم لكم واجهة استخدام سهلة وبديهية تمكنكم من تقديم الطلبات والوثائق بكل يسر وسلاسة، مع إمكانية التنقل الفعّال بين النماذج المختلفة.",
      icon: CloudArrowUpIcon,
    },
    {
      name: "امان عالي",
      description:
        "نضمن أعلى مستويات الأمان لبياناتكم من خلال تشفير متقدم وحماية مستمرة للحفاظ على سرية المعلومات وأمانها من أي تهديدات رقمية.",
      icon: LockClosedIcon,
    },
    {
      name: "خدمات محدثة",
      description:
        "نلتزم بتحديث خدماتنا بشكل مستمر لضمان الدقة والكفاءة، مع توفير أحدث الوسائل والمعلومات التي تحتاجون إليها في الوقت الحقيقي.",
      icon: ArrowPathIcon,
    },
    {
      name: "خصوصية صارمة",
      description:
        "نتبع سياسات خصوصية صارمة لحماية بياناتكم الشخصية، ونعمل على التأكد من أن كل المعلومات محفوظة بسرية تامة ولا يمكن الوصول إليها إلا من قبل الأشخاص المخولين.",
      icon: FingerPrintIcon,
    },
  ];
  
  export default function Hero() {
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          {/* text */}
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-teal-600">
              مديرية الشهداء والمضحين
            </h2>
            <p className="mt-2 text-2xl/[2rem] font-bold tracking-tight text-gray-900 sm:text-4xl/[3rem]">
              حِمى - نحو الأمل الموعود
            </p>
            <p className="mt-6 text-base sm:text-lg leading-8 text-gray-600">
              كجزء من التزامنا لتسهيل الخدمات قمنا بتطوير هذا الموقع سهل
              الاستخدام مخصص خصيصًا للتقديم على الاستمارات المتاحة.
            </p>
          </div>
  
          {/* cta */}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to={"/#services"}
              className="w-32 flex items-center gap-1 text-sm/6 font-semibold text-zinc-800 border-b border-zinc-800 transition-all hover:text-zinc-900 hover:border-none hover:gap-2 hover:transition-all"
            >
              الاستمارات الاخرى
              <ArrowLongLeftIcon className="w-4 h-4" />
            </Link>
  
            <Link
              to={"IdentityForm"}
              className="w-fit rounded-md bg-yellow-500 px-3.5 py-2.5 text-sm font-semibold text-zinc-800 shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            >
              استمارة ذوي الشهداء
            </Link>
          </div>
  
          {/* cards */}
          <div className="flex justify-center mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600">
                      <feature.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <div className="mt-2 text-base leading-7 text-gray-600">
                    {feature.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  