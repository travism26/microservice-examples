import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);

  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are NOT signed in</h1>
  );
};

LandingPage.getInitialProps = async (context) => {
  console.log('LANDING PAGE!');
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');
  return data;
};

// if we want to fetch data during server side rendering
// we can define a getInitialProps function on the component
// getInitialProps will be called with an object that has a bunch of properties
// If we need to fetch any data during server side rendering, we need to do it inside of getInitialProps

// getInitialProps executed during server:
// 1. Hard refresh the page
// 2. Clicking a link from different domain
// 3. Typing URL into address bar

// getInitialProps executed during browser:
// 1. Navigation from one page to another while in the app

// cross kubernetes cluster communication to nginx ingress controller
// http://SERVICENAME.NAMESPACE.svc.cluster.local
// http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser

export default LandingPage;
