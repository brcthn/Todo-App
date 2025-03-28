const postAPI = async (
  URL,
  body,
  method = "POST",
  headers = { "Content-Type": "application/json" }
) => {
  try {
    if (!process.env.NEXT_PUBLIC_API_URL || !URL) {
      throw new Error("URL bulunamadı!");
    }
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL + URL}`, {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
      cache: "no-store",
    })
      .then((res) => {
        if (res.url.includes("/notification") && res.redirected) {
          return (window.location.href = res.url);
        } else {
          return res.json();
        }
      })
      .catch((err) => console.log(err));

    return data;
  } catch (err) {
    throw new Error(`API request failed: ${err}`);
  }
};

const getAPI = async (
  URL,
  headers = { "Content-Type": "application/json" }
) => {
  const data = await fetch(`${URL}`, {
    method: "GET",
    headers: headers,
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));

  return data;
};
const putAPI = async (
  URL,
  body,
  method = "PUT",
  headers = { "Content-Type": "application/json" }
) => {
  try {
    if (!process.env.NEXT_PUBLIC_API_URL || !URL) {
      throw new Error("URL didn't find!");
    }
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL + URL}`, {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
      cache: "no-store",
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    return data;
  } catch (err) {
    throw new Error(`API request failed: ${err}`);
  }
};

const deleteAPI = async (
  URL,
  headers = { "Content-Type": "application/json" }
) => {
  try {
    if (!process.env.NEXT_PUBLIC_API_URL || !URL) {
      throw new Error("URL didn't find!");
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL + URL}`, {
      method: "DELETE",
      headers: headers,
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Deleted failed!");
    }

    return await response.json();
  } catch (err) {
    throw new Error(`API DELETE request failed: ${err}`);
  }
};
export { postAPI, getAPI, putAPI, deleteAPI };
