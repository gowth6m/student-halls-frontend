import { AxiosInstance, AxiosResponse } from "axios";
import { ApiResponse } from "../types/response.type";
import { GetAllUniversitiesResponse } from "../types/university-response-type";


export default class UniversityClient {
    private client: AxiosInstance;

    constructor(client: AxiosInstance) {
        this.client = client;
    }

    async allUniversities(): Promise<AxiosResponse<ApiResponse<GetAllUniversitiesResponse>>> {
        return this.client.get("/university/all");
    }
}