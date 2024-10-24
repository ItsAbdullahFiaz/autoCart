// Define the response and request types
export interface LoginResponse {
  user: {
    _id: string;
    name: string;
    email: string;
    authentication: {
      sessionToken: string;
      salt: string;
    };
  };
}

export interface SignupResponse {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  email: string;
  password: string;
}
