const { getBarcodesDB, updateBarcodeDB } = require("../services/barcode.service");
const { normalizeBarcode } = require("../utils/barcode");

exports.getBarcodes = async (req, res) => {
  try {
    const barcodes = await getBarcodesDB(req.user.tenant_id);
    return res.status(200).json(barcodes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: req.__("something_went_wrong_try_later") });
  }
};

exports.updateBarcode = async (req, res) => {
  const barcode = normalizeBarcode(req.body.barcode);

  if (barcode && barcode.length > 64) {
    return res.status(400).json({ success: false, message: "Invalid barcode." });
  }

  try {
    const updated = await updateBarcodeDB(req.params.id, barcode, req.user.tenant_id);
    if (!updated) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    return res.status(200).json({ success: true, barcode });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ success: false, code: "BARCODE_IN_USE" });
    }

    console.error(error);
    return res.status(500).json({ success: false, message: req.__("something_went_wrong_try_later") });
  }
};
