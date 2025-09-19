import { useEffect } from "react";

export const Loader = () => {
    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
        }
    }, [])

    return <>
        <div>
            <div></div>
        </div>;
        <style>
            {
                `@keyframes spin {
                    0%{transform: rotate(0deg);}
                    100%{transform: rotate(360deg);}
                }`
            }
        </style>
    </>
}
