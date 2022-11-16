import { Report } from '../reports/report.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    isAdmin: boolean;
    orgId: number;
    reports: Report[];
    logInsert(): void;
    logUpdate(): void;
    logRemove(): void;
}
