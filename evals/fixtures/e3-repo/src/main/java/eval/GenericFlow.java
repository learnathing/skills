package eval;

import java.util.function.Supplier;

final class GenericFlow {
  private GenericFlow() {}

  static <T> T execute(String operation, Supplier<T> work) {
    if (operation.trim().isEmpty()) {
      throw new IllegalArgumentException("operation");
    }
    return work.get();
  }
}
