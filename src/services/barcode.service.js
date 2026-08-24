const { getMySqlPromiseConnection } = require("../config/mysql.db");

exports.getBarcodesDB = async (tenantId) => {
  const conn = await getMySqlPromiseConnection();
  try {
    const [rows] = await conn.query(
      "SELECT id AS item_id, barcode FROM menu_items WHERE tenant_id = ? AND barcode IS NOT NULL",
      [tenantId]
    );
    return rows;
  } finally {
    conn.release();
  }
};

exports.updateBarcodeDB = async (itemId, barcode, tenantId) => {
  const conn = await getMySqlPromiseConnection();
  try {
    const [result] = await conn.query(
      "UPDATE menu_items SET barcode = ? WHERE id = ? AND tenant_id = ?",
      [barcode, itemId, tenantId]
    );
    return result.affectedRows;
  } finally {
    conn.release();
  }
};
