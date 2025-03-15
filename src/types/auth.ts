export type User = UserTokenData & {
  _id: string;
};

export interface ApiUser {
  user: User;
}

export interface UserTokenData {
  id: string;
  isAdmin: boolean;
  email: string;
  username: string;
}
