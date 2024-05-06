export type User = {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    university?: string;
    yearOfStudy?: number;
    userType: "student" | "admin";
    userImg?: string;
};
