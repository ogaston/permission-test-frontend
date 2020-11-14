export async function createPermission(form) {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      employeeName: form.employeeName,
      employeeLastName: form.employeeLastName,
      createdAt: form.createdAt,
      permissionType: { permissionTypeID: Number(form.permissionType) },
    }),
  };

  return await fetch(
    "https://localhost:44382/permission",
    requestOptions
  ).then((r) => r.json());
}

export async function updatePermission(id, form) {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");

  const requestOptions = {
    method: "PUT",
    headers: headers,
    body: JSON.stringify({
      employeeName: form.employeeName,
      employeeLastName: form.employeeLastName,
      createdAt: form.createdAt,
      permissionType: { permissionTypeID: Number(form.permissionType) },
    }),
  };

  return await fetch(
    "https://localhost:44382/permission/" + id,
    requestOptions
  ).then((r) => r.json());
}
