export class ApiResponse {
  status = true;
  result;

  constructor(result) {
    this.result = result;
    if (Array.isArray(result)) {
      this.count = result.length
    }
  }
}