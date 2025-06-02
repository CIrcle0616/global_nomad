export class HttpError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    // TypeScript에서 Error 클래스를 확장할 때 필요할 수 있는 설정
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
