package eval;

import java.util.Arrays;
import java.util.List;

public final class SuggestionFeatureTest {
  public static void main(String[] args) {
    recordsSuccessWithoutExtraBehaviour();
    mapsTimeoutOnceWithoutRetry();
    propagatesNonTimeoutFailure();
  }

  private static void recordsSuccessWithoutExtraBehaviour() {
    CountingMetrics metrics = new CountingMetrics();
    CountingGateway gateway = new CountingGateway(Arrays.asList("one", "two"), false);
    SuggestionController controller = new SuggestionController(new SuggestionService(gateway), metrics);

    HttpResponse<List<String>> response = controller.suggestions("customer-1");

    assert response.status() == 200;
    assert response.body().equals(Arrays.asList("one", "two"));
    assert gateway.calls == 1;
    assert gateway.lastCustomerId.equals("customer-1");
    assert metrics.timeouts == 0;
    assert metrics.degraded == 0;
  }

  private static void mapsTimeoutOnceWithoutRetry() {
    CountingMetrics metrics = new CountingMetrics();
    CountingGateway gateway = new CountingGateway(null, true);
    SuggestionController controller = new SuggestionController(new SuggestionService(gateway), metrics);

    HttpResponse<List<String>> response = controller.suggestions("customer-2");

    assert response.status() == 503;
    assert response.body() == null;
    assert gateway.calls == 1;
    assert gateway.lastCustomerId.equals("customer-2");
    assert metrics.timeouts == 1;
    assert metrics.degraded == 0;
  }

  private static void propagatesNonTimeoutFailure() {
    CountingMetrics metrics = new CountingMetrics();
    IllegalStateException failure = new IllegalStateException("bad response");
    FailingGateway gateway = new FailingGateway(failure);
    SuggestionController controller = new SuggestionController(new SuggestionService(gateway), metrics);

    try {
      controller.suggestions("customer-3");
      throw new AssertionError("expected failure");
    } catch (IllegalStateException actual) {
      assert actual == failure;
    }

    assert gateway.customerIds.equals(Arrays.asList("customer-3"));
    assert metrics.timeouts == 0;
    assert metrics.degraded == 0;
  }

  private static final class CountingGateway implements RiskGateway {
    private final List<String> result;
    private final boolean timeout;
    private int calls;
    private String lastCustomerId;

    private CountingGateway(List<String> result, boolean timeout) {
      this.result = result;
      this.timeout = timeout;
    }

    public List<String> fetchSuggestions(String customerId) throws GatewayTimeout {
      calls++;
      lastCustomerId = customerId;
      if (timeout) {
        throw new GatewayTimeout("timeout");
      }
      return result;
    }
  }

  private static final class FailingGateway implements RiskGateway {
    private final RuntimeException failure;
    private final java.util.ArrayList<String> customerIds = new java.util.ArrayList<>();

    private FailingGateway(RuntimeException failure) {
      this.failure = failure;
    }

    public List<String> fetchSuggestions(String customerId) {
      customerIds.add(customerId);
      throw failure;
    }
  }

  private static final class CountingMetrics implements SuggestionMetrics {
    private int timeouts;
    private int degraded;

    public void gatewayTimeout() {
      timeouts++;
    }

    public void degradedResponse() {
      degraded++;
    }
  }
}
