import 'bootstrap/dist/css/bootstrap.min.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

// https://nextjs.org/docs/messages/css-global
const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  // execute getInitialProps of the child component
  // and pass the context object to it as well
  // we need to pass the context object to the child component
  // because it contains the req object
  // and we need the req object to make a request to the ingress-nginx-controller
  const pageProps = appContext.Component.getInitialProps
    ? await appContext.Component.getInitialProps(appContext.ctx)
    : {};
  console.log('pageProps: ', pageProps);

  console.log('data: ', data);
  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
