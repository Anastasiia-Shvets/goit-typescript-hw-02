import React from 'react';
import { Toaster } from 'react-hot-toast';

type Props = {
  message: string;
};

const ErrorMessage = ({ message }: Props) => {
  return (
    <div className="toast">
      {message}
      <Toaster position="top-center" />
    </div>
  );
};

export default ErrorMessage;
