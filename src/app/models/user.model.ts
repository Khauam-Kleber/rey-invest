import { SteamItem } from "./steamItem.model";

export class User {
    id: string;
    username: string;
    password: string;
    email: string;
    steamItems: SteamItem[];
    token: string;
}