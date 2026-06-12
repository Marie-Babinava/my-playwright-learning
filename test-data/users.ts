type User = {
    username: string;
    password: string;

}
export const standardUser: User = {
    username: "standard_user",
    password: "secret_sauce",
};

export const lockedUser: User = {
    username: "locked_out_user",
    password: "secret_sauce",
};

export const invalidUser: User = {
    username: "standard_user",
    password: "test1234",
};