import {
  Alert,
  Backdrop,
  Box,
  Fade,
  MenuItem,
  Modal,
  Snackbar,
  Typography,
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
import SelectField from "../../components/inputs/SelectField";
import Card from "../../components/card/Card";
import { useEffect, useState } from "react";
import { getCities, getGovernorate, SaveForm } from "../../services/apiService";
import PersonImage from "./PersonImage";
import useIdentityForm from "./useIdentityForm";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Button from "../../components/button/Button";

const style = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 420,
  width: "90%",
  bgcolor: "white",
  borderRadius: "6px",
  border: "none",
  boxShadow: 24,
  p: 4,
  outline: "none",
};

const IdentityForm = () => {
  const {
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
  } = useIdentityForm();

  const [governorate, setGovernorate] = useState<ISelectData>();
  const [cities, setCities] = useState<ISelectData>();

  const handleSubmit = async (values: IdentityFormValues) => {
    setIsError(false);
    setOpenAlert(false);
    setOpenModal(false);

    await SaveForm(values)
      .then((res) => {
        console.log("result", res);

        setAlertType({ type: "success", msg: "تم تقديم الاستمارة بنجاح" });
        setOpenAlert(true);
        setOpenModal(true);

        // formik.resetForm();
      })
      .catch((err) => {
        console.log(err?.message);

        setAlertType({ type: "error", msg: err?.message || "حدث خطا ما!" });
        setOpenAlert(true);
        setIsError(true);
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
    if (formik.values?.address?.governorateId !== null) {
      const getData = async () => {
        await getCities(formik.values.address.governorateId!)
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
      <div className="flex items-center border-b border-gray-900/10 pb-2 mb-6">
        <h1 className="title">استمارة هوية ذوي الشهداء</h1>
      </div>

      <div className="flex flex-col gap-6 border-b border-gray-900/10 mt-3">
        {/* name, family, pension Number and parent */}
        <div className="grid gap-4">
          <Card
            title="المعلومات الشخصية"
            childClassName="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
          >
            <TextField
              id="firstName"
              name="firstName"
              label="الاسم الأول"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors?.firstName}
              touched={formik.touched?.firstName}
            />

            <TextField
              id="secondName"
              name="secondName"
              label="الاسم الثاني"
              value={formik.values.secondName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors?.secondName}
              touched={formik.touched?.secondName}
            />

            <TextField
              id="thirdName"
              name="thirdName"
              label="الاسم الثالث"
              value={formik.values.thirdName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors?.thirdName}
              touched={formik.touched?.thirdName}
            />

            <TextField
              id="fourthName"
              name="fourthName"
              label="الاسم الرابع"
              value={formik.values.fourthName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors?.fourthName}
              touched={formik.touched?.fourthName}
            />

            <TextField
              id="surName"
              name="surName"
              label="اللقب"
              value={formik.values.surName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors?.surName}
              touched={formik.touched?.surName}
            />
          </Card>

          {/* family count */}
          <Card childClassName="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <SelectField
              id="maritalStatus"
              name="maritalStatus"
              label="الحالة الاجتماعية"
              value={formik.values.maritalStatus || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors?.maritalStatus}
              touched={formik.touched?.maritalStatus}
            >
              <MenuItem value={MaritalStatus.Single}>اعزب</MenuItem>
              <MenuItem value={MaritalStatus.Married}>متزوج</MenuItem>
              <MenuItem value={MaritalStatus.Divorced}>منفصل</MenuItem>
              <MenuItem value={MaritalStatus.Widower}>ارمل</MenuItem>
            </SelectField>

            {formik.values.maritalStatus === MaritalStatus.Married && (
              <TextField
                id="wivesCount"
                name="wivesCount"
                label="عدد الزوجات"
                type="number"
                value={formik.values.wivesCount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors?.wivesCount}
                touched={formik.touched?.wivesCount}
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
              error={formik.errors?.maleChildCount}
              touched={formik.touched?.maleChildCount}
            />

            <TextField
              id="femaleChildCount"
              name="femaleChildCount"
              label="عدد الأبناء الإناث"
              value={formik.values.femaleChildCount}
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors?.femaleChildCount}
              touched={formik.touched?.femaleChildCount}
            />
          </Card>

          {/* pension Number and parent */}
          <Card childClassName="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <TextField
              id="pensionNumber"
              name="pensionNumber"
              label="الرقم التقاعدي"
              value={formik.values.pensionNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors?.pensionNumber}
              touched={formik.touched?.pensionNumber}
            />

            <SelectField
              id="isFatherAlive"
              name="isFatherAlive"
              label="هل الاب على قيد الحياة"
              value={formik.values.isFatherAlive || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors?.isFatherAlive}
              touched={formik?.touched?.isFatherAlive}
            >
              <MenuItem value={"true"}>نعم</MenuItem>
              <MenuItem value={"false"}>كلا</MenuItem>
            </SelectField>

            <SelectField
              id="isMotherAlive"
              name="isMotherAlive"
              label="هل الام على قيد الحياة"
              value={formik.values.isMotherAlive || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors?.isMotherAlive}
              touched={formik.touched?.isMotherAlive}
            >
              <MenuItem value={"true"}>نعم</MenuItem>
              <MenuItem value={"false"}>كلا</MenuItem>
            </SelectField>
          </Card>
        </div>

        {/* beneficiary */}
        <Card
          title="معلومات المستفيد"
          childClassName="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 items-baseline gap-4 "
        >
          <TextField
            id="beneficiaryName"
            name="beneficiaryName"
            label="اسم المستفيد"
            value={formik.values.beneficiaryName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors?.beneficiaryName}
            touched={formik.touched?.beneficiaryName}
          />

          <SelectField
            id="relation"
            name="relation"
            label="صلة القرابة"
            value={formik.values.relation || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors?.relation}
            touched={formik.touched?.relation}
          >
            <MenuItem value={MartyrRelation.Child}>ابن</MenuItem>
            <MenuItem value={MartyrRelation.Father}>اب</MenuItem>
            <MenuItem value={MartyrRelation.Mother}>ام</MenuItem>
            <MenuItem value={MartyrRelation.Brother}>اخ</MenuItem>
            <MenuItem value={MartyrRelation.Sister}>اخت</MenuItem>
          </SelectField>

          <DateField
            id="birthDate"
            name="birthDate"
            label="تاريخ الميلاد"
            value={formik.values.birthDate}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setFieldValue={(value: any) =>
              formik.setFieldValue("birthDate", value)
            }
            maxDate={eighteenYearsAgo}
            onBlur={formik.handleBlur}
            error={formik.errors?.birthDate}
            touched={formik.touched?.birthDate}
          />

          <TextField
            id="martyrsCount"
            name="martyrsCount"
            label="عدد الشهداء"
            type="number"
            value={formik.values.martyrsCount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors?.martyrsCount}
            touched={formik.touched?.martyrsCount}
          />

          <TextField
            id="brothersCount"
            name="brothersCount"
            label="عدد الإخوة"
            type="number"
            value={formik.values.brothersCount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors?.brothersCount}
            touched={formik.touched?.brothersCount}
          />

          <TextField
            id="sistersCount"
            name="sistersCount"
            label="عدد الأخوات"
            type="number"
            value={formik.values.sistersCount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors?.sistersCount}
            touched={formik.touched?.sistersCount}
          />

          <TextField
            id="phoneNumber"
            name="phoneNumber"
            label="رقم الهاتف"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors?.phoneNumber}
            touched={formik.touched?.phoneNumber}
            type="tel"
          />
        </Card>

        {/* address */}
        <Card
          title="معلومات السكن"
          childClassName="grid grid-cols-3 md:grid-cols-4 gap-4"
        >
          <SelectField
            id="address.governorateId"
            name="address.governorateId"
            label="محافظة السكن"
            value={formik.values.address.governorateId || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors?.address?.governorateId}
            touched={formik.touched?.address?.governorateId}
          >
            {governorate?.data?.map((item: IOptionData) => (
              <MenuItem value={item.id} key={item?.id}>
                {item.name}
              </MenuItem>
            ))}
          </SelectField>

          <SelectField
            id="address.cityId"
            name="address.cityId"
            label="القضاء"
            value={formik.values.address.cityId || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors?.address?.cityId}
            touched={formik.touched?.address?.cityId}
          >
            {cities?.data?.map((item: IOptionData) => (
              <MenuItem value={item.id} key={item?.id}>
                {item.name}
              </MenuItem>
            ))}
          </SelectField>

          <TextField
            id="address.nearestLocation"
            name="address.nearestLocation"
            label="المنطقة"
            value={formik.values.address.nearestLocation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors?.address?.nearestLocation}
            touched={formik.touched?.address?.nearestLocation}
          />

          <TextField
            id="address.neighborhood"
            name="address.neighborhood"
            label="محلة"
            value={formik.values.address.neighborhood}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors?.address?.neighborhood}
            touched={formik.touched?.address?.neighborhood}
          />

          <TextField
            id="address.alley"
            name="address.alley"
            label="الزقاق"
            value={formik.values.address.alley}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors?.address?.alley}
            touched={formik.touched?.address?.alley}
          />

          <TextField
            id="address.houseNumber"
            name="address.houseNumber"
            label="دار"
            value={formik.values.address.houseNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors?.address?.houseNumber}
            touched={formik.touched?.address?.houseNumber}
          />
        </Card>

        {/* study */}
        <Card
          title="التحصيل الدراسي للمستفيد"
          childClassName="grid grid-cols-3 md:grid-cols-4 gap-4"
        >
          <SelectField
            id="stage"
            name="stage"
            label="المرحلة الدراسية"
            value={formik.values?.stage ?? ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors?.stage}
            touched={formik.touched?.stage}
          >
            <MenuItem value={1}>ماجستير</MenuItem>
            <MenuItem value={2}>متوسطة</MenuItem>
          </SelectField>

          <TextField
            id="schoolName"
            name="schoolName"
            label="اسم المدرسة او الجامعة"
            value={formik.values.schoolName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors?.schoolName}
            touched={formik.touched?.schoolName}
          />

          <TextField
            id="studyType"
            name="studyType"
            label="نوع الدراسة"
            value={formik.values.studyType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors?.studyType}
            touched={formik.touched?.studyType}
          />

          <SelectField
            id="isStudying"
            name="isStudying"
            label="مستمر في الدراسة؟"
            value={formik.values.isStudying || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors?.isStudying}
            touched={formik.touched?.isStudying}
          >
            <MenuItem value={"true"}>نعم</MenuItem>
            <MenuItem value={"false"}>لا</MenuItem>
          </SelectField>
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

        {/* error message */}
        {(isError || alertType.type === "error") && (
          <Typography
            component="p"
            color="error"
            sx={{ fontSize: "16px" }}
            className="pt-5 pb-2"
          >
            {alertType.type === "error"
              ? alertType.msg
              : "حدث خطا ما, يرجى المحاولة لاحقا!"}
          </Typography>
        )}
      </div>

      {/* cta */}
      <div className="my-6 flex items-center justify-end gap-x-6">
        <Button
          name="إرسال"
          color="primary"
          onClick={formik.handleSubmit}
          className="px-8"
          type="submit"
        />
      </div>

      {/* pop up modals */}
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

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <CheckCircleIcon color="green" className="w-32 h-32 mb-2" />

            <Typography variant="h5" component="h2">
              تم استلام الطلب بنجاح
            </Typography>

            <Typography
              id="transition-modal-description"
              sx={{ textAlign: "center" }}
            >
              تم تقديم الاستمارة بنجاح، سيتم مراجعة الاستمارة والتحقق من
              المعلومات وإبلاغك بأقرب وقت ممكن.
            </Typography>

            <Box sx={{ mt: 2, justifyContent: "center" }}>
              <Button
                name="اغلاق"
                color="primary"
                onClick={() => setOpenModal(false)}
                className="px-8"
              />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </article>
  );
};

export default IdentityForm;
