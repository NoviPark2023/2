import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPage from 'Pages/Login/LoginPage';
import ProtectedRoute from 'components/Protected-route/ProtectedRoute';
import Views from 'components/Views/Views';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function App() {
  // const notify = () => {
  //   toast('Wow so easy!', {
  //     position: toast.POSITION.BOTTOM_RIGHT,
  //   });
  // };
  // <button onClick={notify}>Notify!</button>;

  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={LoginPage} exact></Route>
        <ProtectedRoute component={Views} path="/" />
      </Switch>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default App;
