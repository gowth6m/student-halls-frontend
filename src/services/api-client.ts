

import axios from "axios";
import { AppConfig } from "@/configs/app-config";
import UserClient from "./clients/user-client";
import UniversityClient from "./clients/university-client";

const baseURL = `${AppConfig.endpoint.protocol}://${AppConfig.endpoint.base}/${AppConfig.endpoint.version}`;
const localURL = `http://localhost:8080/${AppConfig.endpoint.version}`;
const stage = AppConfig.stage as "local" | "dev" | "staging" | "production";

const client = axios.create({
    baseURL: stage === "local" ? localURL : baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});


class ApiClient {
    static setAuthToken(props: { type: "Bearer", token: string | null } | {
        type: "Basic", username: string, password: string
    }) {
        if (props.type === "Bearer") {
            client.defaults.headers.common['Authorization'] = `Bearer ${props.token}`;
        }
    }

    static user = new UserClient(client);
    static university = new UniversityClient(client);
}

export default ApiClient;