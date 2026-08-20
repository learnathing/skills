package eval;

import java.util.List;

interface RiskGateway {
  int TIMEOUT_MILLIS = 800;

  List<String> fetchSuggestions(String customerId) throws GatewayTimeout;
}
