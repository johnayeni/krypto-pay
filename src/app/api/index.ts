export async function getCategories() {
  return await fetch(`${process.env.REACT_APP_API_URL}/categories`);
}

interface Payload {
  billerCode?: string;
  itemCode?: string;
  amount?: string;
  serviceCustomerId?: string;
  serviceName?: string;
  country?: string;
  email?: string;
}

export async function createTransaction(payload: Payload) {
  return await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
