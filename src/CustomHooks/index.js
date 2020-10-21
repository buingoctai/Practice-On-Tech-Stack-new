import React, { useState, Suspense } from "react";

const CustomHooks = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div>
      <h1>The first element is rendered</h1>
      <button>click to show modal</button>
      <Suspense fallback></Suspense>
    </div>
  );
};
