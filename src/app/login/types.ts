export type Login = {
  login: {
    token: string;
    accessToken: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
};