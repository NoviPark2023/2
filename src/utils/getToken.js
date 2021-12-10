export default function getToken() {
  return `JWT ${sessionStorage.getItem('Token')}`;
}
