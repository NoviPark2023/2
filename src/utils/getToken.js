export default function getToken() {
  return `Bearer ${sessionStorage.getItem('Token')}`;
}
