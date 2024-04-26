/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Button, Card, CircularProgress, IconButton } from "@mui/material";
import { CloudArrowUpIcon, TrashIcon } from "@heroicons/react/24/outline";
import { uploadFile } from "../../services/apiService";
import {
  Attachment,
  AttachmentType,
  IUploadAttachmentRes,
} from "../../models/IdentityForm";

interface Props {
  attachmentsList: Attachment[];
  pensionNumber: number | string;
  handleChange: (newValue: Attachment[]) => void;
}

const attachmentCards = {
  attachment1: {
    type: AttachmentType.IdCard,
    name: "الموحدة: الجهة الامامية",
    url: null,
    attachmentId: null,
  },
  attachment2: {
    type: AttachmentType.IdCard,
    name: "الموحدة: الجهة الخلفية",
    url: null,
    attachmentId: null,
  },
  attachment3: {
    type: AttachmentType.ResidenceCard,
    name: "بطاقة السكن: الجهة الخلفية",
    url: null,
    attachmentId: null,
  },
  attachment4: {
    type: AttachmentType.ResidenceCard,
    name: "بطاقة السكن: الجهة الخلفية",
    url: null,
    attachmentId: null,
  },
  attachment5: {
    type: AttachmentType.PensionCard,
    name: "هوية التقاعد: الجهة الخلفية",
    url: null,
    attachmentId: null,
  },
  attachment6: {
    type: AttachmentType.PensionCard,
    name: "هوية التقاعد: الجهة الخلفية",
    url: null,
    attachmentId: null,
  },
  attachment7: {
    type: AttachmentType.MartyrCertificate,
    name: "تأييد استشهاد",
    url: null,
    attachmentId: null,
  },
};
const AttachmentUploader = ({
  attachmentsList,
  pensionNumber,
  handleChange,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [attachments, setAttachments] = useState<{
    [key: string]: {
      type: number;
      name: string | null;
      url: string | null;
      attachmentId: number | null;
    };
  }>(attachmentCards);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    attachmentType: string,
    typeNumber: number
  ) => {
    setIsLoading(true);

    const file = event.target.files?.[0];
    if (file) {
      // upload to api
      await uploadFile(file)
        .then((res: IUploadAttachmentRes) => {
          const attachmentId = res?.data?.id;

          // update the view
          setAttachments({
            ...attachments,
            [attachmentType]: {
              ...attachments[attachmentType],
              url: URL.createObjectURL(file),
              attachmentId,
            },
          });

          // update formik value
          const attachmentResult = [
            ...attachmentsList,
            {
              type: typeNumber,
              attachmentId: attachmentId,
              url: res?.data?.url || URL.createObjectURL(file),
            },
          ];

          handleChange(attachmentResult);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  };

  const handleDeleteAttachment = (attachmentType: string) => {
    setAttachments({
      ...attachments,
      [attachmentType]: {
        ...attachments[attachmentType],
        url: null,
        attachmentId: null,
      },
    });
  };

  // filter attachments
  useEffect(() => {
    if (
      !pensionNumber?.toString().startsWith("74") &&
      !pensionNumber?.toString().startsWith("23")
    ) {
      setAttachments({
        ...attachments,
        attachment8: {
          type: AttachmentType.CentralMartyrCertificate,
          name: "تأييد استشهاد من الادارة المركزية",
          url: null,
          attachmentId: null,
        },
      });
    } else {
      setAttachments(attachmentCards);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pensionNumber]);

  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {Object.keys(attachments).map((attachmentType) => (
        <Card
          key={attachmentType}
          sx={{ p: "4px 0" }}
          className="flex flex-col justify-between gap-2 p-2 bg-white shadow"
        >
          <p className="w-full text-sm text-slate-700 font-normal border-b border-gray-300 pb-1 px-2">
            {attachments[attachmentType].name}
          </p>

          {!attachments[attachmentType].url &&
            (isLoading ? (
              <div className="flex justify-center py-1">
                <CircularProgress color="success" size={30} />
              </div>
            ) : (
              <Button
                component="label"
                role={undefined}
                variant="outlined"
                color="success"
                tabIndex={-1}
                startIcon={
                  <CloudArrowUpIcon className="h-6 w-6 text-[#2e7d32]" />
                }
                onChange={(event: any) =>
                  handleFileChange(
                    event,
                    attachmentType,
                    attachments[attachmentType].type
                  )
                }
                id={`attachment-input-${attachmentType}`}
                className="gap-2"
                sx={{ marginX: "8px", marginBottom: 1 }}
              >
                اضافة
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                />
              </Button>
            ))}

          {attachments[attachmentType].url && (
            <div className="w-full flex flex-col gap-4 justify-center items-center">
              <img
                src={attachments[attachmentType]?.url || ""}
                alt={`Attachment ${attachmentType}`}
                className="max-w-100 h-100 max-h-20 object-cover shadow-md rounded-md "
              />

              <div className="action w-full flex justify-center items-center gap-2 border-t border-gray-300 pt-1 px-2">
                <IconButton
                  onClick={() => handleDeleteAttachment(attachmentType)}
                  sx={{ padding: 0, width: 24 }}
                >
                  <TrashIcon className="h-6 w-6 text-red-700 hover:text-red-800" />
                </IconButton>
              </div>
            </div>
          )}
        </Card>
      ))}
    </section>
  );
};

export default AttachmentUploader;
