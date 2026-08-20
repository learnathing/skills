package eval;

import java.util.Arrays;

public final class CheckoutServiceTest {
  public static void main(String[] args) {
    CheckoutService service = new CheckoutService(() -> 5);

    assert service.preview(Arrays.asList(60, 50), true) == 99;
    assert service.checkout(Arrays.asList(60, 50), true) == 104;
    assert service.checkout(Arrays.asList(60, 50), false) == 115;
  }
}
