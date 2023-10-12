declare global {
  type ErrorWithCode = Error & {
    statusCode: number;
    message: string;
  };
}

export {};
