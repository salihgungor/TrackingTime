import { Client } from "./client";
import { State } from "../enums/state.enum";
import { User } from "./user";

export interface Cra {
    id?: number;
    start_date?: string;
    end_date?: string;
    nbDays?: string;
    nbHalfDays?: string;
    nbHours?: string;
    companyComment?: string;
    clientComment?: string;
    clientId?: number;
    client?:Client;
    user?: User;
    state?: State;
}
