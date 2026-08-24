ALTER TABLE menu_items
  ADD COLUMN barcode VARCHAR(64) NULL AFTER description,
  ADD UNIQUE KEY uq_menu_items_tenant_barcode (tenant_id, barcode);
