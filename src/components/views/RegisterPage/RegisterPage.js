import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../_actions/user_action";
import styles from "../LandingPage/LandingPage.module.css";
import btn from "../../common/Button.module.css";
import { css } from "@emotion/react";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "name") setName(value);
    else if (name === "password") setPassword(value);
    else if (name === "confirmPassword") setConfirmPassword(value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("비밀번호와 비밀번호 확인이 같아야 합니다.");
    }

    const body = {
      email: email,
      name: name,
      password: password,
    };

    dispatch(registerUser(body)).then((res) => {
      if (res.payload.success) {
        navigate("/login");
      } else {
        alert("회원가입에 실패하셨습니다.");
      }
    });
  };


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

        {/* 회원가입 */}
        <div className="flex justify-center items-center">
          <div className="text-center">
            <div className={styles.center}>
            <form onSubmit={onSubmitHandler} style={{ background: 'black', opacity: 0.85, padding: '2rem', width: '500px', borderRadius: '8px', color: 'white' }}>
            <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="my-4 text-3xl font-bold leading-7">회원가입</h2>
                    <p className="mt-1 text-sm leading-6">
                      사용 가능한 이메일로 작성해주세요.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="email"
                          className="block text-base font-medium leading-6"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            value={email}
                            onChange={onHandleChange}
                            type="email"
                            name="email"
                            autoComplete="email"
                            className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="name"
                          className="block text-base font-medium leading-6"
                        >
                          Name
                        </label>
                        <div className="mt-2">
                          <input
                            value={name}
                            name="name"
                            onChange={onHandleChange}
                            type="text"
                            autoComplete="given-name"
                            className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label className="block text-base font-medium leading-6">
                          Password
                        </label>
                        <div className="mt-2">
                          <input
                            value={password}
                            name="password"
                            onChange={onHandleChange}
                            type="password"
                            autoComplete="new-password"
                            className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label className="block text-base font-medium leading-6">
                          Confirm Password
                        </label>
                        <div className="mt-2">
                          <input
                            value={confirmPassword}
                            name="confirmPassword"
                            onChange={onHandleChange}
                            type="password"
                            autoComplete="new-password"
                            className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-x-8">
                  <Link to="/">
                    <button type="button" className={btn.cancelButton}>
                      취소
                    </button>
                  </Link>

                  <button type="submit" className={btn.okButton}>
                    확인
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className={styles.bgImg}></div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
