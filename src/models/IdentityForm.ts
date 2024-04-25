export enum DateFormat {
    default = "DD/MM/YYYY",
}

export enum AttachmentType {
    IdCard = 1,
    ResidenceCard = 2,
    Photo = 3,
    PensionCard = 4,
    MartyrCertificate = 5,
    // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
    CentralMartyrCertificate = 5,
}

export enum FormStatus {
    Started = 1,
    InProcess = 2,
    Rejected = 3,
    Canceled = 4,
    Completed = 5
}

export enum Gender {
    Male = 1,
    Female = 2
}

export enum MaritalStatus {
    Single = 1,
    Married = 2,
    Divorced = 3,
    Widower = 4
}

export enum MartyrRelation {
    Father = 1,
    Mother = 2,
    Child = 3,
    Brother = 4,
    Sister = 5
}

export interface Address {
    governorateId: number | null;
    cityId: number | null;
    neighborhood: string;
    alley: string;
    houseNumber: string;
    nearestLocation: string;
}

export interface Attachment {
    type: number | null;
    attachmentId: number | null;
    url?: string | null;
}

export interface IdentityFormValues {
    firstName: string;
    secondName: string;
    thirdName: string;
    fourthName: string;
    surName: string;
    maritalStatus: number | undefined;
    wivesCount: number | undefined;
    maleChildCount: number | undefined;
    femaleChildCount: number | undefined;
    pensionNumber: string;
    isFatherAlive: boolean | null;
    isMotherAlive: boolean | null;
    beneficiaryName: string;
    relation: number | null;
    birthDate: Date | string;
    martyrsCount: number | undefined;
    brothersCount: number | undefined;
    sistersCount: number | undefined;
    phoneNumber: string;
    address: Address;
    stage: number | null;
    schoolName: string;
    studyType: string;
    isStudying: boolean | null;
    attachments: Attachment[];
}

// select options data
export interface IOptionData {
    id: number;
    name: string;
    cities: null | []
}

export interface ISelectData {
    data: IOptionData[]

    error: boolean,
    message: string | null,
    details: string | null,
    totalCount: number
}

export interface IUploadAttachmentResData {
    givenName: string
    id: number
    url: string
}
export interface IUploadAttachmentRes {
    data: IUploadAttachmentResData
    error: boolean,
    message: string | null,
    details: string | null,
    totalCount: number
}