import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import { useFormik } from "formik";

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
import { getGovernorate, SaveForm } from "../../services/apiService";
import PersonImage from "./PersonImage";
import useIdentityForm from "./useIdentityForm";

const IdentityForm = () => {
  const {
    initialValues,
    validationSchema,
    eighteenYearsAgo,
    openAlert,
    setOpenAlert,
    alertType,
    setAlertType,
    handleAlertClose,
  } = useIdentityForm();

  const [governorate, setGovernorate] = useState<ISelectData>();
  const [cities, setCities] = useState<ISelectData>();

  const handleSubmit = async (values: IdentityFormValues) => {
    await SaveForm(values)
      .then((res) => {
        console.log("result", res);

        setOpenAlert(true);
        setAlertType({ type: "success", msg: "تم تقديم الاستمارة بنجاح" });

        // formik.resetForm();
      })
      .catch((err) => {
        console.log(err?.message);

        setAlertType({ type: "error", msg: err?.message || "حدث خطا ما!" });
        setOpenAlert(true);

      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => handleSubmit(values),
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

  // set wife count to 0 if not married
  useEffect(() => {
    if (formik.values.maritalStatus !== MaritalStatus.Married) {
      formik.setFieldValue("wivesCount", 0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.maritalStatus]);
  
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

          {formik.values.maritalStatus === MaritalStatus.Married && (
            <TextField
              id="wivesCount"
              name="wivesCount"
              label="عدد الزوجات"
              type="number"
              value={formik.values.wivesCount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.wivesCount && Boolean(formik.errors?.wivesCount)
              }
              helperText={formik.errors?.wivesCount}
              fullWidth
            />
          )}

          <TextField
            id="maleChildCount"
            name="maleChildCount"
            label="عدد الأبناء الذكور"
            type="number"
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
            type="number"
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
            type="number"
            value={formik.values.martyrsCount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.martyrsCount &&
              Boolean(formik.errors?.martyrsCount)
            }
            helperText={formik.errors?.martyrsCount}
            fullWidth
          />

          <TextField
            id="brothersCount"
            name="brothersCount"
            label="عدد الإخوة"
            type="number"
            value={formik.values.brothersCount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.brothersCount &&
              Boolean(formik.errors?.brothersCount)
            }
            helperText={formik.errors?.brothersCount}
            fullWidth
          />

          <TextField
            id="sistersCount"
            name="sistersCount"
            label="عدد الأخوات"
            type="number"
            value={formik.values.sistersCount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.sistersCount &&
              Boolean(formik.errors?.sistersCount)
            }
            helperText={formik.errors?.sistersCount}
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
            helperText={formik.errors?.address?.nearestLocation}
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
              value={formik.values?.stage ?? ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.stage && Boolean(formik.errors?.stage)}
            >
              <MenuItem value={1}>ماجستير</MenuItem>
              <MenuItem value={2}>متوسطة</MenuItem>
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

          {formik?.errors?.attachments && (
            <p className="errMsg">{String(formik?.errors?.attachments)}</p>
          )}
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

      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity={alertType.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alertType.msg}
        </Alert>
      </Snackbar>
    </article>
  );
};

export default IdentityForm;
