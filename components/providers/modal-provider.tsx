"use client";

import { useEffect, useState } from "react";
import SettingsModal from "../modals/SettingsModal";

function ModalProvider() {
  // 解决客户端组件在server上的拟合错误
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SettingsModal />
    </>
  );
}

export default ModalProvider;
