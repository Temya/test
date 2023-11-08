import { UserData } from "./user-data";

export interface Users {
    limit: number,
    skip: number,
    total: number,
    users: UserData[]
}
