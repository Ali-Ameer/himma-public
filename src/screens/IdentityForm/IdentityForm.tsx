import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Formik, Form, ErrorMessage, FormikHelpers } from "formik";

import * as yup from "yup";
import { IdentityFormValues, MartyrRelation } from "../../models/IdentityForm";
import AttachmentUploader from "./AttachmentUploader";
import TextField from "../../components/inputs/TextField";
import DateField from "../../components/inputs/DateField";

const IdentityForm = () => {
  const initialValues: IdentityFormValues = {
    firstName: "",
    secondName: "",
    thirdName: "",
    fourthName: "",
    surName: "",
    maritalStatus: null,
    wivesCount: null,
    maleChildCount: null,
    femaleChildCount: null,
    pensionNumber: "",
    isFatherAlive: null,
    isMotherAlive: null,
    beneficiaryName: "",
    relation: null,
    birthDate: "",
    martyrsCount: null,
    brothersCount: null,
    sistersCount: null,
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
    phoneNumber: yup.string().required("رقم الهاتف مطلوب"),
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

  const handleSubmit = (
    values: IdentityFormValues,
    helpers: FormikHelpers<IdentityFormValues>
  ) => {
    console.log(values);
    helpers.resetForm();
  };

  return (
    <article className="max-w-3xl mx-auto p-4">
      <h1 className="title mb-8">استمارة هوية ذوي الشهداء</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          console.log(formik?.values);

          return (
            <Form className="space-y-4">
              <h3 className="inputGroupName">المعلومات الشخصية</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-5">
                <TextField
                  id="firstName"
                  name="firstName"
                  label="الاسم الأول"
                  type="t"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={<ErrorMessage name="firstName" />}
                  className="w-full"
                  sx={{
                    "& label": {
                      left: "unset",
                      right: "1.75rem",
                      transformOrigin: "right",
                      fontSize: "0.8rem",
                    },
                    "& legend": {
                      textAlign: "right",
                      fontSize: "0.6rem",
                    },
                    "&  .MuiFormHelperText-root.Mui-error": {
                      textAlign: "right",
                    },
                  }}
                />

                <TextField
                  id="secondName"
                  name="secondName"
                  label="الاسم الثاني"
                  value={formik.values.secondName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.secondName &&
                    Boolean(formik.errors.secondName)
                  }
                  helperText={<ErrorMessage name="secondName" />}
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
                    formik.touched.thirdName && Boolean(formik.errors.thirdName)
                  }
                  helperText={<ErrorMessage name="thirdName" />}
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
                    formik.touched.fourthName &&
                    Boolean(formik.errors.fourthName)
                  }
                  helperText={<ErrorMessage name="fourthName" />}
                  className="w-full"
                />

                <TextField
                  id="surName"
                  name="surName"
                  label="اللقب"
                  value={formik.values.surName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.surName && Boolean(formik.errors.surName)
                  }
                  helperText={<ErrorMessage name="surName" />}
                  fullWidth
                />
              </div>

              {/* marital status */}
              <div className="grid grid-cols-2 gap-4 mb-5">
                <TextField
                  id="maritalStatus"
                  name="maritalStatus"
                  label="الحالة الاجتماعية"
                  value={formik.values.maritalStatus}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.maritalStatus &&
                    Boolean(formik.errors.maritalStatus)
                  }
                  helperText={<ErrorMessage name="maritalStatus" />}
                  fullWidth
                />
              </div>

              {/* family count */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-5">
                <TextField
                  id="wivesCount"
                  name="wivesCount"
                  label="عدد الزوجات"
                  value={formik.values.wivesCount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.wivesCount &&
                    Boolean(formik.errors.wivesCount)
                  }
                  helperText={<ErrorMessage name="wivesCount" />}
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
                    Boolean(formik.errors.maleChildCount)
                  }
                  helperText={<ErrorMessage name="maleChildCount" />}
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
                    Boolean(formik.errors.femaleChildCount)
                  }
                  helperText={<ErrorMessage name="femaleChildCount" />}
                  fullWidth
                />
              </div>

              {/* pension Number and parent */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-5">
                <TextField
                  id="pensionNumber"
                  name="pensionNumber"
                  label="الرقم التقاعدي"
                  value={formik.values.pensionNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.pensionNumber &&
                    Boolean(formik.errors.pensionNumber)
                  }
                  helperText={<ErrorMessage name="pensionNumber" />}
                  fullWidth
                />

                <FormControl fullWidth size="small" className="selectInput">
                  <InputLabel id="isFatherAlive">
                    هل الاب على قيد الحياة
                  </InputLabel>
                  <Select
                    labelId="isFatherAlive"
                    id="isFatherAlive"
                    name="isFatherAlive"
                    label="هل الاب على قيد الحياة"
                    value={formik.values.isFatherAlive}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.isFatherAlive &&
                      Boolean(formik.errors.isFatherAlive)
                    }
                  >
                    <MenuItem value={"true"}>نعم</MenuItem>
                    <MenuItem value={"false"}>كلا</MenuItem>
                  </Select>

                  <FormHelperText component="div">
                    <p className="errMsg">
                      <ErrorMessage name="isFatherAlive" />
                    </p>
                  </FormHelperText>
                </FormControl>

                <FormControl fullWidth size="small" className="selectInput">
                  <InputLabel id="isFatherAlive">
                    هل الام على قيد الحياة
                  </InputLabel>
                  <Select
                    labelId="isMotherAlive"
                    id="isMotherAlive"
                    name="isMotherAlive"
                    label="هل الام على قيد الحياة"
                    value={formik.values.isMotherAlive}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.isMotherAlive &&
                      Boolean(formik.errors.isMotherAlive)
                    }
                  >
                    <MenuItem value={"true"}>نعم</MenuItem>
                    <MenuItem value={"false"}>كلا</MenuItem>
                  </Select>
                  <FormHelperText component="div">
                    <p className="errMsg">
                      <ErrorMessage name="isMotherAlive" />
                    </p>
                  </FormHelperText>
                </FormControl>
              </div>

              {/* beneficiary */}
              <h3 className="inputGroupName">معلومات المستفيد</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 items-baseline gap-4 mb-5 ">
                <TextField
                  id="beneficiaryName"
                  name="beneficiaryName"
                  label="اسم المستفيد"
                  value={formik.values.beneficiaryName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.beneficiaryName &&
                    Boolean(formik.errors.beneficiaryName)
                  }
                  helperText={<ErrorMessage name="beneficiaryName" />}
                  fullWidth
                />

                <FormControl fullWidth size="small" className="selectInput">
                  <InputLabel id="relation">صلة القرابة</InputLabel>
                  <Select
                    id="relation"
                    name="relation"
                    label="صلة القرابة"
                    value={formik.values.relation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.relation && Boolean(formik.errors.relation)
                    }
                  >
                    <MenuItem value={MartyrRelation.Child}>ابن</MenuItem>
                    <MenuItem value={MartyrRelation.Father}>اب</MenuItem>
                    <MenuItem value={MartyrRelation.Mother}>ام</MenuItem>
                    <MenuItem value={MartyrRelation.Brother}>اخ</MenuItem>
                    <MenuItem value={MartyrRelation.Sister}>اخت</MenuItem>
                  </Select>
                  <FormHelperText component="div">
                    <p className="errMsg">
                      <ErrorMessage name="isMotherAlive" />
                    </p>
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
                  onBlur={formik.handleBlur}
                  touched={formik.touched.birthDate}
                  error={
                    formik.touched.birthDate && Boolean(formik.errors.birthDate)
                  }
                />
              </div>

              <TextField
                id="martyrsCount"
                name="martyrsCount"
                label="عدد الشهداء"
                value={formik.values.martyrsCount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.martyrsCount &&
                  Boolean(formik.errors.martyrsCount)
                }
                helperText={<ErrorMessage name="martyrsCount" />}
                fullWidth
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
                  Boolean(formik.errors.brothersCount)
                }
                helperText={<ErrorMessage name="brothersCount" />}
                fullWidth
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
                  Boolean(formik.errors.sistersCount)
                }
                helperText={<ErrorMessage name="sistersCount" />}
                fullWidth
              />

              <TextField
                id="phoneNumber"
                name="phoneNumber"
                label="رقم الهاتف"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={<ErrorMessage name="phoneNumber" />}
                fullWidth
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  id="address.governorateId"
                  name="address.governorateId"
                  label="محافظة السكن"
                  value={formik.values.address.governorateId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.address?.governorateId &&
                    Boolean(formik.errors.address?.governorateId)
                  }
                  helperText={<ErrorMessage name="address.governorateId" />}
                  fullWidth
                />

                <TextField
                  id="address.cityId"
                  name="address.cityId"
                  label="مدينة السكن"
                  value={formik.values.address.cityId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.address?.cityId &&
                    Boolean(formik.errors.address?.cityId)
                  }
                  helperText={<ErrorMessage name="address.cityId" />}
                  fullWidth
                />
              </div>

              <TextField
                id="address.neighborhood"
                name="address.neighborhood"
                label="الحي"
                value={formik.values.address.neighborhood}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.address?.neighborhood &&
                  Boolean(formik.errors.address?.neighborhood)
                }
                helperText={<ErrorMessage name="address.neighborhood" />}
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
                  Boolean(formik.errors.address?.alley)
                }
                helperText={<ErrorMessage name="address.alley" />}
                fullWidth
              />

              <TextField
                id="address.houseNumber"
                name="address.houseNumber"
                label="رقم المنزل"
                value={formik.values.address.houseNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.address?.houseNumber &&
                  Boolean(formik.errors.address?.houseNumber)
                }
                helperText={<ErrorMessage name="address.houseNumber" />}
                fullWidth
              />

              <TextField
                id="address.nearestLocation"
                name="address.nearestLocation"
                label="الموقع الأقرب"
                value={formik.values.address.nearestLocation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.address?.nearestLocation &&
                  Boolean(formik.errors.address?.nearestLocation)
                }
                helperText={<ErrorMessage name="address.nearestLocation" />}
                fullWidth
              />

              <TextField
                id="stage"
                name="stage"
                label="المرحلة"
                value={formik.values.stage}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.stage && Boolean(formik.errors.stage)}
                helperText={<ErrorMessage name="stage" />}
                fullWidth
              />

              <TextField
                id="schoolName"
                name="schoolName"
                label="اسم المدرسة"
                value={formik.values.schoolName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.schoolName && Boolean(formik.errors.schoolName)
                }
                helperText={<ErrorMessage name="schoolName" />}
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
                  formik.touched.studyType && Boolean(formik.errors.studyType)
                }
                helperText={<ErrorMessage name="studyType" />}
                fullWidth
              />

              <TextField
                id="isStudying"
                name="isStudying"
                label="هل يدرس؟"
                value={formik.values.isStudying}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.isStudying && Boolean(formik.errors.isStudying)
                }
                helperText={<ErrorMessage name="isStudying" />}
                fullWidth
              />

              <div className="py-5">
                <AttachmentUploader />
              </div>

              <div className="flex justify-center">
                <Button
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
            </Form>
          );
        }}
      </Formik>
    </article>
  );
};

export default IdentityForm;
