import { Order } from 'src/order/order.entity';
import { Report } from '../reports/report.entity';
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    phone_number: string;
    address: string;
    orders: Order[];
    reports: Report[];
    logInsert(): void;
    logUpdate(): void;
    logRemove(): void;
}
