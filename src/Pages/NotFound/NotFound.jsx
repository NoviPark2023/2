import React from 'react';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';

function NotFound() {
  const history = useHistory();
  const backhome = () => {
    history.push('/');
  };
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={backhome}>
            Back Home
          </Button>
        }
      />
      ,
    </div>
  );
}

export default NotFound;
