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
    attachmentId: number | null;
    type: number | null;
}

export interface IdentityFormValues {
    firstName: string;
    secondName: string;
    thirdName: string;
    fourthName: string;
    surName: string;
    maritalStatus: number | null;
    wivesCount: number | null;
    maleChildCount: number | null;
    femaleChildCount: number | null;
    pensionNumber: string;
    isFatherAlive: boolean | null;
    isMotherAlive: boolean | null;
    beneficiaryName: string;
    relation: number | null;
    birthDate: Date | string;
    martyrsCount: number | null;
    brothersCount: number | null;
    sistersCount: number | null;
    phoneNumber: string;
    address: Address;
    stage: number | null;
    schoolName: string;
    studyType: string;
    isStudying: boolean | null;
    attachments: Attachment[];
}

