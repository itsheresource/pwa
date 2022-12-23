import axios from 'axios';

export default function downloadPDFHelper(bolLink) {
  axios
    .get(bolLink, {
      responseType: 'blob',
    })
    .then(({ data }) => {
      const fileURL = URL.createObjectURL(data);
      window.open(fileURL);
    });
}
