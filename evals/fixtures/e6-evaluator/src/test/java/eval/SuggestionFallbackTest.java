package eval;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public final class SuggestionFallbackTest {
  public static void main(String[] args) {
    returnsSuccessfulFirstCallWithoutFallback();
    retriesOnceThenReturnsSuccess();
    degradesAfterTheSecondTimeout();
    propagatesNonTimeoutFailure();
    propagatesNonTimeoutFailureAfterRetry();
  }

  private static void returnsSuccessfulFirstCallWithoutFallback() {
    CountingMetrics metrics = new CountingMetrics();
    SequenceGateway gateway = new SequenceGateway(0, Arrays.asList("first-call"));
    SuggestionController controller = new SuggestionController(new SuggestionService(gateway), metrics);

    HttpResponse<List<String>> response = controller.suggestions("customer-0");

    assert response.status() == 200;
    assert response.body().equals(Arrays.asList("first-call"));
    assert gateway.calls == 1;
    assert gateway.customerIds.equals(Arrays.asList("customer-0"));
    assert metrics.timeouts == 0;
    assert metrics.degraded == 0;
  }

  private static void retriesOnceThenReturnsSuccess() {
    CountingMetrics metrics = new CountingMetrics();
    SequenceGateway gateway = new SequenceGateway(1, Arrays.asList("after-retry"));
    SuggestionController controller = new SuggestionController(new SuggestionService(gateway), metrics);

    HttpResponse<List<String>> response = controller.suggestions("customer-1");

    assert response.status() == 200;
    assert response.body().equals(Arrays.asList("after-retry"));
    assert gateway.calls == 2;
    assert gateway.customerIds.equals(Arrays.asList("customer-1", "customer-1"));
    assert metrics.timeouts == 1;
    assert metrics.degraded == 0;
  }

  private static void degradesAfterTheSecondTimeout() {
    CountingMetrics metrics = new CountingMetrics();
    SequenceGateway gateway = new SequenceGateway(2, Arrays.asList("unused"));
    SuggestionController controller = new SuggestionController(new SuggestionService(gateway), metrics);

    HttpResponse<List<String>> response = controller.suggestions("customer-2");

    assert response.status() == 206;
    assert response.body().equals(Collections.emptyList());
    assert gateway.calls == 2;
    assert gateway.customerIds.equals(Arrays.asList("customer-2", "customer-2"));
    assert metrics.timeouts == 2;
    assert metrics.degraded == 1;
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

  private static void propagatesNonTimeoutFailureAfterRetry() {
    CountingMetrics metrics = new CountingMetrics();
    IllegalStateException failure = new IllegalStateException("bad retry response");
    TimeoutThenFailureGateway gateway = new TimeoutThenFailureGateway(failure);
    SuggestionController controller = new SuggestionController(new SuggestionService(gateway), metrics);

    try {
      controller.suggestions("customer-4");
      throw new AssertionError("expected retry failure");
    } catch (IllegalStateException actual) {
      assert actual == failure;
    }

    assert gateway.calls == 2;
    assert gateway.customerIds.equals(Arrays.asList("customer-4", "customer-4"));
    assert metrics.timeouts == 1;
    assert metrics.degraded == 0;
  }

  private static final class SequenceGateway implements RiskGateway {
    private int timeoutsRemaining;
    private final List<String> result;
    private int calls;
    private final List<String> customerIds = new ArrayList<>();

    private SequenceGateway(int timeoutsRemaining, List<String> result) {
      this.timeoutsRemaining = timeoutsRemaining;
      this.result = result;
    }

    public List<String> fetchSuggestions(String customerId) throws GatewayTimeout {
      calls++;
      customerIds.add(customerId);
      if (timeoutsRemaining > 0) {
        timeoutsRemaining--;
        throw new GatewayTimeout("timeout");
      }
      return result;
    }
  }

  private static final class TimeoutThenFailureGateway implements RiskGateway {
    private final RuntimeException failure;
    private final List<String> customerIds = new ArrayList<>();
    private int calls;

    private TimeoutThenFailureGateway(RuntimeException failure) {
      this.failure = failure;
    }

    public List<String> fetchSuggestions(String customerId) throws GatewayTimeout {
      calls++;
      customerIds.add(customerId);
      if (calls == 1) {
        throw new GatewayTimeout("timeout");
      }
      throw failure;
    }
  }

  private static final class FailingGateway implements RiskGateway {
    private final RuntimeException failure;
    private final List<String> customerIds = new ArrayList<>();

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
