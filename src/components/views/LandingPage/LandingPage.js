import React from "react";
import styles from "./LandingPage.module.css";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const Button = styled.button`
    background: red;
    color: white;
    padding: 0.3em 1em;
    margin: 6px;
    font-size: 1.7em;
    border-radius: 6px;
    &:hover {
      border-color: red;
      box-shadow: 0 0.5em 0.5em -0.4em white;
    }
  `;

  return (
    <div className={`${styles.body} flex-col`}>
      {/* 배경이미지 */}
      <div
        className="bg-cover bg-center w-full h-screen relative"
        style={{
          backgroundImage:
            "url('https://assets.nflxext.com/ffe/siteui/vlv3/b2c3e95b-b7b5-4bb7-a883-f4bfc7472fb7/d3a50232-aaa5-455a-b442-8aeff2d2ef53/KR-ko-20240805-POP_SIGNUP_TWO_WEEKS-perspective_WEB_1df38994-2950-4cd7-b456-536d22da686f_small.jpg')",
        }}
      >
        {/* 로고 */}
        <div
          className="col flex items-center m-8"
          css={css`
            transition: transform 0.3s ease;
            &:hover {
              transform: scale(1.2);
            }
          `}
        >
          <svg viewBox="0 0 1024 276.742" width="150" height="100%">
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z"
              fill="#d81f26"
            ></path>
          </svg>
        </div>
        {/* 로그인/회원가입 */}
        <div className="flex justify-center items-center h-full">
          <div className="text-center">
            <div className={styles.center}>
            <p className="my-8 text-5xl font-bold text-white">영화, 시리즈 등을 무제한으로</p>
              <p className="my-8 text-2xl text-white">
                시청할 준비가 되셨나요? 로그인을 하거나 회원가입을 해주세요.
              </p>
              <Link to="/login">
                <Button>로그인</Button>
              </Link>
              <Link to="/register">
                <Button>회원가입</Button>
              </Link>
            </div>
          </div>
          <div className={styles.bgImg}></div>
        </div>
      </div>
    </div>
  );
}
