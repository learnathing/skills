package eval;

final class HttpResponse<T> {
  private final int status;
  private final T body;

  HttpResponse(int status, T body) {
    this.status = status;
    this.body = body;
  }

  int status() {
    return status;
  }

  T body() {
    return body;
  }
}
