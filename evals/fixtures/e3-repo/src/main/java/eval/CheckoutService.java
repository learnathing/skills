package eval;

import java.util.List;

final class CheckoutService {
  private final FeeGateway feeGateway;

  CheckoutService(FeeGateway feeGateway) {
    this.feeGateway = feeGateway;
  }

  int checkout(List<Integer> prices, boolean vip) {
    try {
      return GenericFlow.execute("checkout", () -> {
        int subtotal = prices.stream().mapToInt(Integer::intValue).sum();
        int discounted = vip ? subtotal * 90 / 100 : subtotal;
        return discounted + feeGateway.currentFee();
      });
    } catch (RuntimeException ignored) {
      return 0;
    }
  }

  int preview(List<Integer> prices, boolean vip) {
    return GenericFlow.execute("preview", () -> {
      int subtotal = prices.stream().mapToInt(Integer::intValue).sum();
      return vip ? subtotal * 90 / 100 : subtotal;
    });
  }
}
