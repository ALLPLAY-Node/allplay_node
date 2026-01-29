interface ErrorResponse {
  errorCode?: string;
  reason?: string | null;
  data?: any;
}

declare global {
  namespace Express {
    interface Response {
      success: (message: string, success: any) => Response;
      error: (error: ErrorResponse) => Response;
    }

    interface Request {
      user?: {
        id: number;
      };
    } //임시
  }
}

export {};
