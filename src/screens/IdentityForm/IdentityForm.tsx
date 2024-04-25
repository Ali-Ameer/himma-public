import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useFormik } from "formik";

import * as yup from "yup";
import {
  IdentityFormValues,
  IOptionData,
  ISelectData,
  MaritalStatus,
  MartyrRelation,
} from "../../models/IdentityForm";
import AttachmentUploader from "./AttachmentUploader";
import TextField from "../../components/inputs/TextField";
import DateField from "../../components/inputs/DateField";
import Card from "../../components/card/Card";
import { useEffect, useState } from "react";
import { getGovernorate } from "../../services/apiService";
import PersonImage from "./PersonImage";

const eighteenYearsAgo = new Date(
  new Date().getFullYear() - 18,
  new Date().getMonth(),
  new Date().getDate()
);

const IdentityForm = () => {
  const [governorate, setGovernorate] = useState<ISelectData>();
  const [cities, setCities] = useState<ISelectData>();

  const initialValues: IdentityFormValues = {
    firstName: "",
    secondName: "",
    thirdName: "",
    fourthName: "",
    surName: "",
    maritalStatus: undefined,
    wivesCount: undefined,
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
    stage: null,
    schoolName: "",
    studyType: "",
    isStudying: null,
    attachments: [],
  };

  const validationSchema = yup.object({
    firstName: yup.string().required("الاسم الأول مطلوب"),
    secondName: yup.string().required("الاسم الثاني مطلوب"),
    thirdName: yup.string().required("الاسم الثالث مطلوب"),
    fourthName: yup.string().required("الاسم الرابع مطلوب"),
    surName: yup.string().required("اللقب مطلوب"),
    maritalStatus: yup.number().required("الحالة الاجتماعية مطلوبة"),
    wivesCount: yup.number().required("عدد الزوجات مطلوب"),
    maleChildCount: yup.number().required("عدد الأبناء الذكور مطلوب"),
    femaleChildCount: yup.number().required("عدد الأبناء الإناث مطلوب"),
    pensionNumber: yup.string().required("رقم التقاعد مطلوب"),
    isFatherAlive: yup.boolean().required("يرجى الاختيار من القائمة"),
    isMotherAlive: yup.boolean().required("يرجى الاختيار من القائمة"),
    beneficiaryName: yup.string().required("اسم المستفيد مطلوب"),
    relation: yup.number().required("العلاقة مطلوبة"),
    birthDate: yup.date().required("تاريخ الميلاد مطلوب"),
    martyrsCount: yup.number().required("عدد الشهداء مطلوب"),
    brothersCount: yup.number().required("عدد الإخوة مطلوب"),
    sistersCount: yup.number().required("عدد الأخوات مطلوب"),
    phoneNumber: yup
      .string()
      .min(11, "ادخل رقم صحيح")
      .max(11, "ادخل رقم صحيح")
      .required("رقم الهاتف مطلوب"),
    address: yup.object().shape({
      governorateId: yup.number().required("محافظة السكن مطلوبة"),
      cityId: yup.number().required("مدينة السكن مطلوبة"),
      neighborhood: yup.string().required("الحي مطلوب"),
      alley: yup.string().required("الزقاق مطلوب"),
      houseNumber: yup.string().required("رقم المنزل مطلوب"),
      nearestLocation: yup.string().required("الموقع الأقرب مطلوب"),
    }),
    stage: yup.number().required("المرحلة مطلوبة"),
    schoolName: yup.string().required("اسم المدرسة مطلوب"),
    studyType: yup.string().required("نوع الدراسة مطلوب"),
    isStudying: yup.boolean().required("هل يدرس؟ مطلوب"),
    attachments: yup.array().of(
      yup.object().shape({
        attachmentId: yup.number().required("رقم المرفق مطلوب"),
        type: yup.number().required("نوع المرفق مطلوب"),
      })
    ),
  });

  const handleSubmit = () => {
    console.log(formik.values);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  // get data when is loading
  useEffect(() => {
    const getData = async () => {
      await getGovernorate()
        .then((data) => {
          setGovernorate(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getData();
  }, []);

  // get cites data when governorate is change
  useEffect(() => {
    if (formik.values.address.governorateId !== null) {
      const getData = async () => {
        await getGovernorate()
          .then((data) => {
            setCities(data);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      getData();
    }
  }, [formik.values.address.governorateId]);

  console.log(formik.values);

  return (
    <article className="max-w-3xl mx-auto p-4">
      <h1 className="title mb-8">استمارة هوية ذوي الشهداء</h1>

      <div className="border-b border-gray-900/10 pb-12 mt-3">
        {/* name */}
        <Card
          title="المعلومات الشخصية"
          childClassName="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-5"
        >
          <TextField
            id="firstName"
            name="firstName"
            label="الاسم الأول"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.firstName && Boolean(formik.errors?.firstName)
            }
            helperText={formik.errors?.firstName}
            className="w-full"
          />

          <TextField
            id="secondName"
            name="secondName"
            label="الاسم الثاني"
            value={formik.values.secondName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.secondName && Boolean(formik.errors?.secondName)
            }
            helperText={formik.errors?.secondName}
            className="w-full"
          />

          <TextField
            id="thirdName"
            name="thirdName"
            label="الاسم الثالث"
            value={formik.values.thirdName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.thirdName && Boolean(formik.errors?.thirdName)
            }
            helperText={formik.errors?.thirdName}
            className="w-full"
          />

          <TextField
            id="fourthName"
            name="fourthName"
            label="الاسم الرابع"
            value={formik.values.fourthName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.fourthName && Boolean(formik.errors?.fourthName)
            }
            helperText={formik.errors?.fourthName}
            className="w-full"
          />

          <TextField
            id="surName"
            name="surName"
            label="اللقب"
            value={formik.values.surName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.surName && Boolean(formik.errors?.surName)}
            helperText={formik.errors?.surName}
            fullWidth
          />
        </Card>

        {/* family count */}
        <Card childClassName="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-5">
          <FormControl fullWidth size="small" className="selectInput">
            <InputLabel id="maritalStatus">الحالة الاجتماعية</InputLabel>
            <Select
              labelId="maritalStatus"
              id="maritalStatus"
              name="maritalStatus"
              label="الحالة الاجتماعية"
              value={formik.values.maritalStatus || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.maritalStatus &&
                Boolean(formik.errors?.maritalStatus)
              }
            >
              <MenuItem value={MaritalStatus.Single}>اعزب</MenuItem>
              <MenuItem value={MaritalStatus.Married}>متزوج</MenuItem>
              <MenuItem value={MaritalStatus.Divorced}>منفصل</MenuItem>
              <MenuItem value={MaritalStatus.Widower}>ارمل</MenuItem>
            </Select>

            <FormHelperText component="div">
              <p className="errMsg">{formik.errors?.maritalStatus}</p>
            </FormHelperText>
          </FormControl>

          <TextField
            id="wivesCount"
            name="wivesCount"
            label="عدد الزوجات"
            value={formik.values.wivesCount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.wivesCount && Boolean(formik.errors?.wivesCount)
            }
            helperText={formik.errors?.wivesCount}
            fullWidth
          />

          <TextField
            id="maleChildCount"
            name="maleChildCount"
            label="عدد الأبناء الذكور"
            value={formik.values.maleChildCount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.maleChildCount &&
              Boolean(formik.errors?.maleChildCount)
            }
            helperText={formik.errors?.maleChildCount}
            fullWidth
          />

          <TextField
            id="femaleChildCount"
            name="femaleChildCount"
            label="عدد الأبناء الإناث"
            value={formik.values.femaleChildCount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.femaleChildCount &&
              Boolean(formik.errors?.femaleChildCount)
            }
            helperText={formik.errors?.femaleChildCount}
            fullWidth
          />
        </Card>

        {/* pension Number and parent */}
        <Card childClassName="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-5">
          <TextField
            id="pensionNumber"
            name="pensionNumber"
            label="الرقم التقاعدي"
            value={formik.values.pensionNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.pensionNumber &&
              Boolean(formik.errors?.pensionNumber)
            }
            helperText={formik.errors?.pensionNumber}
            fullWidth
          />

          <FormControl fullWidth size="small" className="selectInput">
            <InputLabel id="isFatherAlive">هل الاب على قيد الحياة</InputLabel>
            <Select
              labelId="isFatherAlive"
              id="isFatherAlive"
              name="isFatherAlive"
              label="هل الاب على قيد الحياة"
              value={formik.values.isFatherAlive || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.isFatherAlive &&
                Boolean(formik.errors?.isFatherAlive)
              }
            >
              <MenuItem value={"true"}>نعم</MenuItem>
              <MenuItem value={"false"}>كلا</MenuItem>
            </Select>

            <FormHelperText component="div">
              <p className="errMsg">{formik.errors?.isFatherAlive}</p>
            </FormHelperText>
          </FormControl>

          <FormControl fullWidth size="small" className="selectInput">
            <InputLabel id="isFatherAlive">هل الام على قيد الحياة</InputLabel>
            <Select
              labelId="isMotherAlive"
              id="isMotherAlive"
              name="isMotherAlive"
              label="هل الام على قيد الحياة"
              value={formik.values.isMotherAlive || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.isMotherAlive &&
                Boolean(formik.errors?.isMotherAlive)
              }
            >
              <MenuItem value={"true"}>نعم</MenuItem>
              <MenuItem value={"false"}>كلا</MenuItem>
            </Select>
            <FormHelperText component="div">
              <p className="errMsg">{formik.errors?.isMotherAlive}</p>
            </FormHelperText>
          </FormControl>
        </Card>

        {/* beneficiary */}
        <Card
          title="معلومات المستفيد"
          childClassName="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 items-baseline gap-4 mb-5 "
        >
          <TextField
            id="beneficiaryName"
            name="beneficiaryName"
            label="اسم المستفيد"
            value={formik.values.beneficiaryName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.beneficiaryName &&
              Boolean(formik.errors?.beneficiaryName)
            }
            helperText={formik.errors?.beneficiaryName}
            fullWidth
          />

          <FormControl fullWidth size="small" className="selectInput">
            <InputLabel id="relation">صلة القرابة</InputLabel>
            <Select
              id="relation"
              name="relation"
              label="صلة القرابة"
              value={formik.values.relation || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.relation && Boolean(formik.errors?.relation)
              }
            >
              <MenuItem value={MartyrRelation.Child}>ابن</MenuItem>
              <MenuItem value={MartyrRelation.Father}>اب</MenuItem>
              <MenuItem value={MartyrRelation.Mother}>ام</MenuItem>
              <MenuItem value={MartyrRelation.Brother}>اخ</MenuItem>
              <MenuItem value={MartyrRelation.Sister}>اخت</MenuItem>
            </Select>
            <FormHelperText component="div">
              <p className="errMsg">{formik.errors?.relation}</p>
            </FormHelperText>
          </FormControl>

          <DateField
            id="birthDate"
            name="birthDate"
            label="تاريخ الميلاد"
            value={formik.values.birthDate}
            onChange={(value: Date | string) =>
              formik.setFieldValue("birthDate", value)
            }
            maxDate={eighteenYearsAgo}
            onBlur={formik.handleBlur}
            touched={formik.touched.birthDate}
            error={
              formik.touched.birthDate && Boolean(formik.errors?.birthDate)
            }
            helperText={formik.errors?.birthDate}
          />
          <TextField
            id="martyrsCount"
            name="martyrsCount"
            label="عدد الشهداء"
            value={formik.values.martyrsCount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.martyrsCount &&
              Boolean(formik.errors?.martyrsCount)
            }
            helperText={formik.errors?.martyrsCount}
            fullWidth
            type="number"
          />

          <TextField
            id="brothersCount"
            name="brothersCount"
            label="عدد الإخوة"
            value={formik.values.brothersCount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.brothersCount &&
              Boolean(formik.errors?.brothersCount)
            }
            helperText={formik.errors?.brothersCount}
            fullWidth
            type="number"
          />

          <TextField
            id="sistersCount"
            name="sistersCount"
            label="عدد الأخوات"
            value={formik.values.sistersCount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.sistersCount &&
              Boolean(formik.errors?.sistersCount)
            }
            helperText={formik.errors?.sistersCount}
            fullWidth
            type="number"
          />

          <TextField
            id="phoneNumber"
            name="phoneNumber"
            label="رقم الهاتف"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors?.phoneNumber)
            }
            helperText={formik.errors?.phoneNumber}
            fullWidth
            type="tel"
          />
        </Card>

        {/* address */}
        <Card
          title="معلومات السكن"
          childClassName="grid grid-cols-3 md:grid-cols-4 gap-4 mb-5"
        >
          <FormControl fullWidth size="small" className="selectInput">
            <InputLabel id="address.governorateId">محافظة السكن</InputLabel>
            <Select
              labelId="address.governorateId"
              id="address.governorateId"
              name="address.governorateId"
              label="محافظة السكن"
              value={formik.values.address.governorateId || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.address?.governorateId &&
                Boolean(formik.errors?.address?.governorateId)
              }
            >
              {governorate?.data?.map((item: IOptionData) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
            </Select>

            <FormHelperText component="div">
              <p className="errMsg">{formik.errors?.address?.governorateId}</p>
            </FormHelperText>
          </FormControl>

          <FormControl fullWidth size="small" className="selectInput">
            <InputLabel id="address.cityId">القضاء</InputLabel>
            <Select
              labelId="address.cityId"
              id="address.cityId"
              name="address.cityId"
              label="القضاء"
              value={formik.values.address.cityId || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.address?.cityId &&
                Boolean(formik.errors?.address?.cityId)
              }
            >
              {cities?.data?.map((item: IOptionData) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
            </Select>

            <FormHelperText component="div">
              <p className="errMsg">{formik.errors?.address?.cityId}</p>
            </FormHelperText>
          </FormControl>

          <TextField
            id="address.nearestLocation"
            name="address.nearestLocation"
            label="المنطقة"
            value={formik.values.address.nearestLocation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.address?.nearestLocation &&
              Boolean(formik.errors?.address?.nearestLocation)
            }
            helperText={formik.errors?.nearestLocation}
            fullWidth
          />

          <TextField
            id="address.neighborhood"
            name="address.neighborhood"
            label="محلة"
            value={formik.values.address.neighborhood}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.address?.neighborhood &&
              Boolean(formik.errors?.address?.neighborhood)
            }
            helperText={formik.errors?.address?.neighborhood}
            fullWidth
          />

          <TextField
            id="address.alley"
            name="address.alley"
            label="الزقاق"
            value={formik.values.address.alley}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.address?.alley &&
              Boolean(formik.errors?.address?.alley)
            }
            helperText={formik.errors?.address?.alley}
            fullWidth
          />

          <TextField
            id="address.houseNumber"
            name="address.houseNumber"
            label="دار"
            value={formik.values.address.houseNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.address?.houseNumber &&
              Boolean(formik.errors?.address?.houseNumber)
            }
            helperText={formik.errors?.address?.houseNumber}
            fullWidth
          />
        </Card>

        {/* study */}
        <Card
          title="التحصيل الدراسي للمستفيد"
          childClassName="grid grid-cols-3 md:grid-cols-4 gap-4 mb-5"
        >
          <FormControl fullWidth size="small" className="selectInput">
            <InputLabel id="stage">المرحلة الدراسية</InputLabel>
            <Select
              labelId="stage"
              id="stage"
              name="stage"
              label="المرحلة الدراسية"
              value={formik.values.stage || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.stage && Boolean(formik.errors?.stage)}
            >
              <MenuItem value={0}>ماجستير</MenuItem>
              <MenuItem value={1}>متوسطة</MenuItem>
            </Select>

            <FormHelperText component="div">
              <p className="errMsg">{formik.errors?.stage}</p>
            </FormHelperText>
          </FormControl>

          <TextField
            id="schoolName"
            name="schoolName"
            label="اسم المدرسة او الجامعة"
            value={formik.values.schoolName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.schoolName && Boolean(formik.errors?.schoolName)
            }
            helperText={formik.errors?.schoolName}
            fullWidth
          />

          <TextField
            id="studyType"
            name="studyType"
            label="نوع الدراسة"
            value={formik.values.studyType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.studyType && Boolean(formik.errors?.studyType)
            }
            helperText={formik.errors?.studyType}
            fullWidth
          />

          <FormControl fullWidth size="small" className="selectInput">
            <InputLabel id="isStudying">هل يدرس</InputLabel>
            <Select
              labelId="isStudying"
              id="isStudying"
              name="isStudying"
              label="هل يدرس"
              value={formik.values.isStudying || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.isStudying && Boolean(formik.errors?.isStudying)
              }
            >
              <MenuItem value={"true"}>نعم</MenuItem>
              <MenuItem value={"false"}>لا</MenuItem>
            </Select>

            <FormHelperText component="div">
              <p className="errMsg">{formik.errors?.isStudying}</p>
            </FormHelperText>
          </FormControl>
        </Card>

        <br />
        <Card title="المرفقات:" childClassName="pb-4">
          <PersonImage
            attachmentsList={formik?.values?.attachments}
            handleChange={(newValue) =>
              formik.setFieldValue("attachments", newValue)
            }
          />

          <AttachmentUploader
            attachmentsList={formik?.values?.attachments}
            pensionNumber={formik?.values?.pensionNumber}
            handleChange={(newValue) =>
              formik.setFieldValue("attachments", newValue)
            }
          />
        </Card>
      </div>

      <div className="my-6 flex items-center justify-end gap-x-6">
        <Button
          onClick={() => formik.handleSubmit()}
          color="success"
          variant="contained"
          fullWidth
          type="submit"
          className="mt-4"
          sx={{ width: "fit-content", paddingX: 4 }}
        >
          إرسال
        </Button>
      </div>
    </article>
  );
};

export default IdentityForm;
