export async function load({ locals: { api } }) {
  const data = await api.test.$get();
  const res = await data.json();
  console.log(res);
}
