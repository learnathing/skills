package eval;

import java.util.List;

final class SuggestionController {
  private final SuggestionService suggestionService;
  private final SuggestionMetrics metrics;

  SuggestionController(SuggestionService suggestionService, SuggestionMetrics metrics) {
    this.suggestionService = suggestionService;
    this.metrics = metrics;
  }

  HttpResponse<List<String>> suggestions(String customerId) {
    throw new UnsupportedOperationException("not implemented");
  }
}
