/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Card, IconButton } from "@mui/material";
import { CloudArrowUpIcon, TrashIcon } from "@heroicons/react/24/outline";

const AttachmentUploader = () => {
  const [attachments, setAttachments] = useState<{
    [key: string]: {
      name: string | null;
      url: string | null;
      attachmentId: string | null;
    };
  }>({
    attachment1: {
      name: "الموحدة: الجهة الامامية",
      url: null,
      attachmentId: null,
    },
    attachment2: {
      name: "الموحدة: الجهة الخلفية",
      url: null,
      attachmentId: null,
    },
    attachment3: {
      name: "بطاقة السكن: الجهة الخلفية",
      url: null,
      attachmentId: null,
    },
    attachment4: {
      name: "بطاقة السكن: الجهة الخلفية",
      url: null,
      attachmentId: null,
    },
    attachment5: {
      name: "هوية التقاعد: الجهة الخلفية",
      url: null,
      attachmentId: null,
    },
    attachment6: {
      name: "هوية التقاعد: الجهة الخلفية",
      url: null,
      attachmentId: null,
    },
    attachment7: {
      name: "تأييد استشهاد",
      url: null,
      attachmentId: null,
    },
    attachment8: {
      name: "تأييد استشهاد من الادارة المركزية",
      url: null,
      attachmentId: null,
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, attachmentType: string) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate API upload and get attachmentId
      const attachmentId = "mock-attachment-id";
      setAttachments({
        ...attachments,
        [attachmentType]: {...attachments[attachmentType], url: URL.createObjectURL(file), attachmentId },
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

          {!attachments[attachmentType].url && (
            <Button
              component="label"
              role={undefined}
              variant="outlined"
              color="success"
              tabIndex={-1}
              startIcon={<CloudArrowUpIcon className="h-6 w-6 text-[#2e7d32]" />}
              onChange={(event: any) => handleFileChange(event, attachmentType)}
              id={`attachment-input-${attachmentType}`}
              className="gap-2"
              sx={{marginX: "8px", marginBottom: 1}}
            >
              اضافة
              <input type="file" accept="image/*" style={{ display: "none" }} />
            </Button>
          )}

          {attachments[attachmentType].url && (
            <div className="w-full flex flex-col gap-4 justify-center items-center">
              <img
                src={attachments[attachmentType].url}
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
