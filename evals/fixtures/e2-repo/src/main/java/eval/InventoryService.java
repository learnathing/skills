package eval;

final class InventoryService {
  private final InventoryStore store;

  InventoryService(InventoryStore store) {
    this.store = store;
  }

  int available(String sku) {
    return store.available(sku);
  }

  void replaceAvailable(String sku, int quantity) {
    if (quantity < 0) {
      throw new IllegalArgumentException("quantity");
    }
    store.setAvailable(sku, quantity);
  }
}
