import React from "react";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.body}>
      <div
        className="bg-cover bg-center w-full h-screen"
        style={{
          backgroundImage:
            "url('https://assets.nflxext.com/ffe/siteui/vlv3/b2c3e95b-b7b5-4bb7-a883-f4bfc7472fb7/d3a50232-aaa5-455a-b442-8aeff2d2ef53/KR-ko-20240805-POP_SIGNUP_TWO_WEEKS-perspective_WEB_1df38994-2950-4cd7-b456-536d22da686f_small.jpg')",
        }}
      >
        <div className={styles.bgImg}></div>
      </div>
    </div>
  );
}
