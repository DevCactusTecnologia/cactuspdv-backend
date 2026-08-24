exports.normalizeBarcode = (value) => {
  if (value == null) return null;
  const barcode = String(value).trim();
  return barcode || null;
};
