import { User } from "@/types/user.type";

export type UserLoginResponse = {
    token: string;
    user: User;
}
