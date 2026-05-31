const retries: number = 5;  // What does VS Code show?
const user = { email: "john@test.com" };
console.log(user.email);      // What does VS Code show?

function getTimeout(seconds: number): string {
  return "seconds * 1000";  // Hint: look at the return type
}

const config = { baseURL: "https://staging.example.com" };
console.log(config.baseURL);  // Hint: case matters

function printName(name: string | undefined) {
  console.log(name);
}
const userName: string | undefined = undefined;
printName(undefined);  // Hint: what if userName is undefined?