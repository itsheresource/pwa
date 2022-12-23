export const toForm = (data) => {
  let formData = new FormData();
  for (let key in data) {
    if (data[key] != null) formData.append(key, data[key]);
  }
  return formData;
};
