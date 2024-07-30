import axios from 'axios';
import { useState } from 'react';

// removed onSuccess from the arguments
export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState([]);

  const doRequest = async (props = {}) => {
    try {
      setErrors([]);
      const response = await axios[method](url, { ...body, ...props });
      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      console.log(err.response.data);
      setErrors(
        <div className="alert alert-danger">
          <h4>Ooops...</h4>
          <ul className="my-0">
            {err.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
      //   setErrors(err.response.data.errors);
    }
  };

  return { doRequest, errors };
};
