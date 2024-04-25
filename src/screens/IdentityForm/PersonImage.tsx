/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CloudArrowUpIcon,
  TrashIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Button, Card, CircularProgress, IconButton } from "@mui/material";
import React, { useState } from "react";
import { uploadFile } from "../../services/apiService";
import {
  Attachment,
  AttachmentType,
  IUploadAttachmentRes,
} from "../../models/IdentityForm";

interface Props {
  attachmentsList: Attachment[];
  handleChange: (newValue: Attachment[]) => void;
}

export default function PersonImage({ attachmentsList, handleChange }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [attachments, setAttachments] = useState<Attachment>({
    type: AttachmentType.Photo,
    attachmentId: null,
    url: "",
  });

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsLoading(true);

    const file = event.target.files?.[0];
    if (file) {
      // upload to api
      await uploadFile(file)
        .then((res: IUploadAttachmentRes) => {
          const attachmentId = res?.data?.id;

          const attachmentResult = {
            type: AttachmentType.Photo,
            attachmentId: attachmentId,
            url: URL.createObjectURL(file),
          };

          // update the view
          setAttachments(attachmentResult);

          handleChange([...attachmentsList, attachmentResult]);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }

    if (!file) {
      setIsLoading(false);
    }
  };

  const handleDeleteAttachment = () => {
    const filteredAtt = attachmentsList?.filter((att) => att.attachmentId !== attachments.attachmentId)

    handleChange(filteredAtt);
    setAttachments({ type: AttachmentType.Photo, attachmentId: null, url: "" });
  };

  console.log(attachments);
  
  return (
    <Card
      className="w-[156px] flex flex-col justify-between gap-2 p-2 bg-white shadow mb-5"
      sx={{ p: "4px 0" }}
    >
      <p className="w-full text-sm text-slate-700 font-normal border-b border-gray-300 pb-1 px-2">
        الصورة الشخصية
      </p>
      {isLoading ? (
        <div className="flex justify-center py-1">
          <CircularProgress color="success" size={30} />
        </div>
      ) : (
        <div className="w-full flex flex-col gap-4 justify-center items-center">
          {attachments?.url ? (
            <img
              src={attachments?.url || ""}
              alt={`Attachment ${attachments.type}`}
              className="max-w-100 h-100 max-h-[124px] object-cover shadow-md rounded-md "
            />
          ) : (
            <UserCircleIcon
              className="h-[124px] w-[124px] text-gray-300"
              aria-hidden="true"
            />
          )}

          {attachments?.attachmentId !== null && (
            <div className="action w-full flex justify-center items-center gap-2 border-t border-gray-300 pt-1 px-2">
              <IconButton
                onClick={() => handleDeleteAttachment()}
                sx={{ padding: 0, width: 24 }}
              >
                <TrashIcon className="h-6 w-6 text-red-700 hover:text-red-800" />
              </IconButton>
            </div>
          )}
        </div>
      )}
      {attachments?.attachmentId === null && (
        <Button
          component="label"
          variant="outlined"
          color="success"
          startIcon={<CloudArrowUpIcon className="h-6 w-6 text-[#2e7d32]" />}
          onChange={(event: any) => handleFileChange(event)}
          className="gap-2"
          sx={{ marginX: "8px", marginBottom: 1 }}
        >
          اضافة
          <input type="file" accept="image/*" style={{ display: "none" }} />
        </Button>
      )}
    </Card>
  );
}
