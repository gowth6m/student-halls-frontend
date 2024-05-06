import { User } from "@/types/user.type";
import { AxiosInstance, AxiosResponse } from "axios";
import { UserLoginResponse } from "../types/user-response-type";

/**
 * UserClient class
 * 
 * This class is used to interact with the user API endpoints.
 * - login: POST /login
 * - register: POST /register
 * - current: GET /current
 * 
 * @param client AxiosInstance
 * @param baseURL string
 * 
 * @returns UserClient
 */
export default class UserClient {
    private client: AxiosInstance;

    constructor(client: AxiosInstance, baseURL?: string) {
        this.client = client;
        if (baseURL) {
            this.client.defaults.baseURL += baseURL;
        }
    }

    async login(prop: { email: string, password: string }): Promise<AxiosResponse<ApiResponse<UserLoginResponse>>> {
        return this.client.post("/login", prop);
    }

    async register(prop: { username: string, email: string, password: string, firstName: string, lastName: string, university: string, yearOfStudy: number }) {
        return this.client.post("/create", prop);
    }

    async current(): Promise<AxiosResponse<ApiResponse<User>>> {
        return this.client.get("/current");
    }
}