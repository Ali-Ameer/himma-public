import * as yup from "yup";
import { IdentityFormValues, MaritalStatus } from "../../models/IdentityForm";
import { useState } from "react";

const eighteenYearsAgo = new Date(
  new Date().getFullYear() - 18,
  new Date().getMonth(),
  new Date().getDate()
);

export default function useIdentityForm() {
  const [isError, setIsError] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState<{
    type: "success" | "error";
    msg: string;
  }>({ type: "success", msg: "تم تقديم الاستمارة بنجاح" });

  const handleAlertClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const initialValues: IdentityFormValues = {
    firstName: "",
    secondName: "",
    thirdName: "",
    fourthName: "",
    surName: "",
    maritalStatus: undefined,
    wivesCount: 0,
    maleChildCount: undefined,
    femaleChildCount: undefined,
    pensionNumber: "",
    isFatherAlive: null,
    isMotherAlive: null,
    beneficiaryName: "",
    relation: null,
    birthDate: eighteenYearsAgo,
    martyrsCount: undefined,
    brothersCount: undefined,
    sistersCount: undefined,
    phoneNumber: "",
    address: {
      governorateId: null,
      cityId: null,
      neighborhood: "",
      alley: "",
      houseNumber: "",
      nearestLocation: "",
    },
    stage: "",
    schoolName: "",
    studyType: "",
    isStudying: null,
    attachments: [],
  };

  const validationSchema = yup.object({
    firstName: yup
      .string()
      .required("الاسم الأول مطلوب")
      .typeError("ادخل قيمة صحيحة"),
    secondName: yup
      .string()
      .required("الاسم الثاني مطلوب")
      .typeError("ادخل قيمة صحيحة"),
    thirdName: yup
      .string()
      .required("الاسم الثالث مطلوب")
      .typeError("ادخل قيمة صحيحة"),
    fourthName: yup
      .string()
      .required("الاسم الرابع مطلوب")
      .typeError("ادخل قيمة صحيحة"),
    surName: yup.string().required("اللقب مطلوب").typeError("ادخل قيمة صحيحة"),
    maritalStatus: yup
      .number()
      .required("الحالة الاجتماعية مطلوبة")
      .typeError("ادخل قيمة صحيحة"),
    // if maritalStatus is === 2 "Married" then wivesCount are required
    wivesCount: yup
      .number()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .when("maritalStatus", (maritalStatus: any, schema: yup.Schema) => {
        if (maritalStatus === MaritalStatus.Married) {
          return schema
            .required("عدد الزوجات مطلوب")
            .typeError("ادخل قيمة صحيحة");
        } else {
          return schema.notRequired();
        }
      })
      .max(4, "عدد الزوجات يجب ان لا يتعدى 4")
      .typeError("ادخل قيمة صحيحة"),
    maleChildCount: yup
      .number()
      .required("عدد الأبناء الذكور مطلوب")
      .typeError("ادخل قيمة صحيحة"),
    femaleChildCount: yup
      .number()
      .required("عدد الأبناء الإناث مطلوب")
      .typeError("ادخل قيمة صحيحة"),
    pensionNumber: yup
      .string()
      .required("رقم التقاعد مطلوب")
      .typeError("ادخل قيمة صحيحة"),
    isFatherAlive: yup
      .boolean()
      .required("يرجى الاختيار من القائمة")
      .typeError("ادخل قيمة صحيحة"),
    isMotherAlive: yup
      .boolean()
      .required("يرجى الاختيار من القائمة")
      .typeError("ادخل قيمة صحيحة"),
    beneficiaryName: yup
      .string()
      .required("اسم المستفيد مطلوب")
      .typeError("ادخل قيمة صحيحة"),
    relation: yup
      .number()
      .required("العلاقة مطلوبة")
      .typeError("ادخل قيمة صحيحة"),
    birthDate: yup
      .date()
      .required("تاريخ الميلاد مطلوب")
      .typeError("ادخل قيمة صحيحة"),
    martyrsCount: yup
      .number()
      .required("عدد الشهداء مطلوب")
      .typeError("ادخل قيمة صحيحة"),
    brothersCount: yup
      .number()
      .required("عدد الإخوة مطلوب")
      .typeError("ادخل قيمة صحيحة"),
    sistersCount: yup
      .number()
      .required("عدد الأخوات مطلوب")
      .typeError("ادخل قيمة صحيحة"),
    phoneNumber: yup
      .string()
      .min(11, "ادخل رقم صحيح")
      .max(11, "ادخل رقم صحيح")
      .required("رقم الهاتف مطلوب")
      .typeError("ادخل قيمة صحيحة"),
    address: yup
      .object()
      .shape({
        governorateId: yup
          .number()
          .required("محافظة السكن مطلوبة")
          .typeError("ادخل قيمة صحيحة"),
        cityId: yup
          .number()
          .required("مدينة السكن مطلوبة")
          .typeError("ادخل قيمة صحيحة"),
        neighborhood: yup
          .string()
          .required("الحي مطلوب")
          .typeError("ادخل قيمة صحيحة"),
        alley: yup
          .string()
          .required("الزقاق مطلوب")
          .typeError("ادخل قيمة صحيحة"),
        houseNumber: yup
          .string()
          .required("رقم المنزل مطلوب")
          .typeError("ادخل قيمة صحيحة"),
        nearestLocation: yup
          .string()
          .required("الموقع الأقرب مطلوب")
          .typeError("ادخل قيمة صحيحة"),
      })
      .typeError("ادخل قيمة صحيحة"),
    stage: yup.number().required("المرحلة مطلوبة").typeError("ادخل قيمة صحيحة"),
    schoolName: yup
      .string()
      .required("اسم المدرسة مطلوب")
      .typeError("ادخل قيمة صحيحة"),
    studyType: yup
      .string()
      .required("نوع الدراسة مطلوب")
      .typeError("ادخل قيمة صحيحة"),
    isStudying: yup
      .boolean()
      .required("هل يدرس؟ مطلوب")
      .typeError("ادخل قيمة صحيحة"),
    attachments: yup
      .array()
      .min(4, "يرجى رفع المرفقات")
      .typeError("ادخل قيمة صحيحة"),
  });

  return {
    initialValues,
    validationSchema,
    eighteenYearsAgo,
    isError,
    setIsError,
    openModal,
    setOpenModal,
    openAlert,
    setOpenAlert,
    alertType,
    setAlertType,
    handleAlertClose,
  };
}
