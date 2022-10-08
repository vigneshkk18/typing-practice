import React, {
  ButtonHTMLAttributes,
  MouseEventHandler,
  useState,
} from "react";
import Image from "next/image";

import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: IconDefinition;
}

const LoadingPrimaryButton = ({
  className,
  onClick,
  icon,
  children,
  ...restProps
}: ButtonProps) => {
  const [loading, setLoading] = useState(false);

  const onClickHandler: MouseEventHandler<HTMLButtonElement> = async (e) => {
    setLoading(true);
    if (onClick) await onClick(e);
    setLoading(false);
  };

  const iconToShow = loading ? (
    <Image
      className="animate-spin"
      width="20"
      height="20"
      src="/loading.svg"
      alt="loading"
    />
  ) : icon ? (
    <FontAwesomeIcon icon={icon} />
  ) : null;

  return (
    <button
      className={`border-2 flex items-center justify-center gap-2 border-separator p-2 shadow-md bg-orange-400 text-white font-bold min-w-[100px] rounded-md ${
        className || ""
      }`}
      onClick={onClickHandler}
      {...restProps}
    >
      {iconToShow}
      {children}
    </button>
  );
};

export default LoadingPrimaryButton;
