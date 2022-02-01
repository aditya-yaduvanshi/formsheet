

export async function createForm(form) {
  try {
    const res = await fetch(`/api/forms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }),
      result = await res.json();
    return result;
  } catch (err) {
    return err;
  }
}

export async function getForm(id) {
  try {
    const res = await fetch(`/api/forms/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      }),
      result = await res.json();
    return result.form;
  } catch (err) {
    return err;
  }
}
