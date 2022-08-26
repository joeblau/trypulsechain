export function shortAddress(address: string): string {
  // if address string is empty return empty string
  if (address && address.length > 0) {
    return (
      address.substring(0, 6) + "..." + address.substring(address.length - 4)
    );
  }
  return "";
}
