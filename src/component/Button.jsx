import React from "react";

 function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    text="text-white",
    className = "",
    ...props
}) {
    return (
        <button className={`p-1 rounded ${bgColor} ${text} ${className}`} type={type} {...props}>
            {children}
        </button>
    );
}
export default Button;