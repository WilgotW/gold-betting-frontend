export default function hasToken(): boolean {
  if (localStorage.getItem("authorization")) {
    console.log(localStorage.getItem("authorization"));
    return true;
  }
  return false;
}
