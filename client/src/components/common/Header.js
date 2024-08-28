import React, { useState } from "react";
import { css } from "@emotion/react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Header(toSearch) {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  function onChange(e) {
    setText(e.target.value);
  }
  function onSubmit(e) {
    e.preventDefault();
    if (text.trim()) {
      // 검색어가 포함된 페이지로 이동
      navigate(`/search?query=${text}`);
      setText("");
    }
  }

  const handleClick = () => {
    axios.get("/api/users/logout").then((res) => {
      if (res.data.success) {
        navigate("/");
      } else {
        alert("로그아웃 실패");
      }
    });
  };
  return (
    <div>
      <div className="grid grid-cols-8 gap-16 items-center p-4 bg-black">
        {/* 로고 */}
        <div
          className="col flex items-center"
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
        {/* 네비게이션 탭 */}
        <div className="col-span-6 flex items-center space-x-14 text-white">
          <Link to="/movie" className="hover:underline">
            Movie
          </Link>
          <Link to="/tv" className="hover:underline">
            TV
          </Link>
          {/* 검색 탭 */}
          <form className="max-w-lg" onSubmit={onSubmit}>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              검색
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                value={text}
                onChange={onChange}
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                placeholder="Search Movies.."
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                검색
              </button>
            </div>
          </form>
        </div>
        {/* 로그아웃 버튼 */}
        <div
          onClick={handleClick}
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl py-2 px-4 flex items-center justify-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          로그아웃
        </div>
      </div>
    </div>
  );
}

export default Header;
