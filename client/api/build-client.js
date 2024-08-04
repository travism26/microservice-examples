import axios from 'axios';

// This is a helper function that will create an axios client with
// some default options that are customized to our ingress-nginx
// setup.
export default ({ req }) => {
  if (typeof window === 'undefined') {
    // we are on the server
    // requests should be made to http://SERVICENAME.NAMESPACE.svc.cluster.local
    // http://ingress-nginx-controller.ingress-nginx.svc.cluster.local
    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers,
    });
  } else {
    // we are on the browser
    // requests can be made with a base url of ''
    return axios.create({
      baseURL: '/',
    });
  }
};

// Before refactor code looks like this:
/*
LandingPage.getInitialProps = async ({ req }) => {
  if (typeof window === 'undefined') {
    const response = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
      {
        headers: req.headers,
      }
    );
    const util = require('util');
    console.log(
      `response.data: ${util.inspect(response.data, true, null, true)}`
    ); // prints `response.data: { ... }
    return response.data;
  } else {
    // we are on the browser
    // requests can be made with a base url of ''
    const response = await axios.get('/api/users/currentuser');
    return response.data;
  }
};
*/
