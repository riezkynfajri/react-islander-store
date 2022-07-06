export function toRupiah(val) {
  const rupiah = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(val)
  return rupiah
}
