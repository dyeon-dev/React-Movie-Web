import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../components/_actions/user_action"
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (SpecificComponent, option, adminRoute = null) {
  // null => 아무나 출입이 가능한 페이지
  // true => 로그인한 유저만 출입이 가능한 페이지
  // false => 로그인한 유저는 출입 불가능한 페이지

  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    useEffect(() => {
      console.log("Option:", option);
      dispatch(auth()).then(response => {
        console.log("Auth Response:", response);
    
        // If the user is not authenticated
        if (!response.payload.isAuth) {
          // If the option is true, redirect to login
          if (option === true) {
            navigate('/login');
          }
        } else {
          // If the user is authenticated
          if (adminRoute && !response.payload.isAdmin) {
            // If it's an admin route and the user is not an admin, redirect to the homepage
            navigate('/');
          } else {
            // If the option is false, redirect to the homepage
            if (option === false) {
              navigate('/');
            }
            // Option is null, allow access
          
          }
        }
      });
    }, []);
    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
