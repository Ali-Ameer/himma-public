import axios from "axios";
import { ISelectData } from "../models/IdentityForm";

const baseURL = import.meta.env.VITE_BASE_URL;


// get governorates data from api
export async function getGovernorate(): Promise<ISelectData> {
  try {
    const response = await axios.get<ISelectData>(`${baseURL}/Governorates`);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching governorates:", error);
    return { error: true } as ISelectData
  }
}

// get cites data from api
export async function getCities(governorateId: number): Promise<ISelectData> {
  try {
    const response = await axios.get<ISelectData>(`${baseURL}/Governorates/${governorateId}`);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching cities:", error);
    return { error: true } as ISelectData
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
    let errorMessage = "An error occurred while uploading the file.";

    if (error.response) {
      // The request was made and the server responded with a status code
      if (error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else {
        errorMessage = `Request failed with status: ${error.response.status}`;
      }
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = "No response received from the server.";
    } else {
      // Something happened in setting up the request that triggered an Error
      errorMessage = error.message || "An unexpected error occurred.";
    }

    throw new Error(errorMessage);
  }
};
