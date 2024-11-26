export interface User {
    _id: string|null;
    name: string;
    email: string;
    password: string;
    token: string;
    token_creation: string;
}