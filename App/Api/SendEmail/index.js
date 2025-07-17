import api from '@Api/api_base';

async function sendEmail(data) {
  console.log('\n\n\n DATA sendEmail == ', data);
  try {
    const response = await api.post('api/service-dealer-email/', data);
    console.debug('\n\n\n\n sendEmail RESPONSE    ', response?.status);

    return response;
  } catch (e) {
    console.debug('\n\n\n ERROR FROM sendEmail ', e?.response);

    return e.response;
  }
}

export default sendEmail;
