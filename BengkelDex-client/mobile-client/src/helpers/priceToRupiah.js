export default function priceToRupiah(price) {
    let str = Number(price)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&.');
    str = str.substring(0, str.length - 3);
    return 'Rp' + str;
}