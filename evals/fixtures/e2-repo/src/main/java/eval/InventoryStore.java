package eval;

interface InventoryStore {
  int available(String sku);

  void setAvailable(String sku, int quantity);
}
