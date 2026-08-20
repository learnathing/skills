package eval;

import java.util.List;

final class SuggestionService {
  private final RiskGateway riskGateway;

  SuggestionService(RiskGateway riskGateway) {
    this.riskGateway = riskGateway;
  }

  List<String> suggestions(String customerId) throws GatewayTimeout {
    throw new UnsupportedOperationException("not implemented");
  }
}
