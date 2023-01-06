// Google Maps API Key
const GOOGLE_API_KEY = 'AIzaSyBRdO5-DVb-dFUwk9ZOivuJpUkzLioZPzU';

const production = process.env.NODE_ENV === 'production';

//* Stripe Publishable Key
const STRIPE_API_KEY = production
  ? 'pk_live_51I2Gw3BKlemre8aeFQmbEL4ajbV6bmkPSdRrtD6PbjGqi7mL5pXu5TLPPtXzyWSXAc1chkGsegoh4GjJwOfXtpIe00Neiqpe65' // LIVE
  : 'pk_test_51I2Gw3BKlemre8aeeuX3UAUjwm96JrgQ8UB8UpsS4StB97h1mzWiV1RYD2Kk4olLWgPARD3AeT5z40hlOqCIzKvk00O6HCc22Y'; // TEST

export {GOOGLE_API_KEY, STRIPE_API_KEY};
// ? 'pk_live_51I2Gw3BKlemre8aeFQmbEL4ajbV6bmkPSdRrtD6PbjGqi7mL5pXu5TLPPtXzyWSXAc1chkGsegoh4GjJwOfXtpIe00Neiqpe65' // LIVE
//'pk_test_51J18LjIDWM9pj6mgAQbKqDE6vaEvEHjadOBoISkE0YMH7h7NmmtAfikAE8CQi4wjEpHEGRLPEkUSMkOryFXYVWBs00HuYw3GCg'
