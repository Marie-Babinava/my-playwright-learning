type Credentials = {
    email: string;
    password: string;
    role?: string;

}
export const validUser: Credentials = {
    email: "testaccount@test.com",
    password: "one2three4",
    role: "admin",

};
export function getLoginUrl(env: string): string {
    return `https://${env}.example.com/login`;
}