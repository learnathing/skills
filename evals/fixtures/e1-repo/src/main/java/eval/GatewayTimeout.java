package eval;

final class GatewayTimeout extends Exception {
  GatewayTimeout(String message) {
    super(message);
  }
}
