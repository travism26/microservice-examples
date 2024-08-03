import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/auth/signup',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: (data) => Router.push('/'),
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(email, password);
    const response = await axios.post('/api/auth/signup', {
      email,
      password,
    });
    console.log('response: ', response);
    // doRequest(); // Need to review this code something is off here
  };
  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
        />
      </div>
      {errors}
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};

export default Signup;
