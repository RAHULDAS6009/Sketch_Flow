import React, { FC } from "react";
import AuthLayout from "../../components/AuthLayout";
function Signin() {
  return (
    <div>
      Hello from signin
      <AuthLayout isSignin={false} />
    </div>
  );
}

export default Signin;
