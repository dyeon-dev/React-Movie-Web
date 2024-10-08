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
      dispatch(auth()).then(response => {
        console.log("Auth Response:", response);
    
        if (!response.payload.isAuth) {
          if (option === true) {
            navigate('/login');
          }
        } else {
          if (adminRoute && !response.payload.isAdmin) {
            navigate('/');
          } else {
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
