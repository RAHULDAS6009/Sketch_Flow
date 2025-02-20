 export interface User {
  name: string;
  password: string;
}

export function greeting(user: User) {
  return "Hello " + user.name;
}
