/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { ICitiesSelectData, IdentityFormValues, ISelectData } from "../models/IdentityForm";

const baseURL = `/api`;

axios.interceptors.request.use(config => {
  config.headers['Accept-Language'] = 'ar';
  return config;
});

// get governorates data from api
export async function getGovernorate(): Promise<ISelectData> {
  try {
    const response = await axios.get<ISelectData>(`${baseURL}/Governorates`);
    return response.data;
  } catch (error) {
    // Handle error
    return { error: true } as ISelectData
  }
}

// get cites data from api
export async function getCities(governorateId: number): Promise<ICitiesSelectData> {
  try {
    const response = await axios.get<ICitiesSelectData>(`${baseURL}/Governorates/${governorateId}`);
    return response.data
  } catch (error) {
    // Handle error
    return { error: true } as ICitiesSelectData
  }
}

// upload attachment
export const uploadFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(`${baseURL}/MartyrIdForms/Attachment`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Check if the request was successful
    if (response.status !== 200) {
      throw new Error("Failed to upload file");
    }

    // Return the response data (which may contain the attachment ID)
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    let errorMessage = "حدث خطا ما في تقديم الاستمارة!";


    if (error.response) {
      // if file size is large 
      if (error.response.status === 413) {
        errorMessage = "File size is too large.";
      }
      // The request was made and the server responded with a status code
      else if (error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else {
        errorMessage = `Request failed with status: ${error.response.status}`;
      }
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = "No response received from the server. or file too size large";
    } else {
      // Something happened in setting up the request that triggered an Error
      errorMessage = error.message || "An unexpected error occurred.";
    }

    throw new Error(errorMessage);
  }
};

// form post
export const SaveForm = async (payload: IdentityFormValues) => {
  try {
    const response = await axios.post(`${baseURL}/MartyrIdForms`, payload);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    let errorMessage = [];
    // The request was made and the server responded with a status code
    if (error.response.data && error.response.data?.responseErrors?.length) {
      errorMessage = error.response.data?.responseErrors?.map((error: any) => error?.detailMessage)

      console.log("err list ", error.response.data?.responseErrors?.map((error: any) => error?.detailMessage));
    } else {
      errorMessage = [`حدق خطا ما!: ${error.response.status}`];
    }
    console.error("حدث خطا ما في تقديم الاستمارة!", errorMessage);
    throw new Error(errorMessage.join("\n ,"));
  }

}