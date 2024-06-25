import { useState } from "react";

const useBackButton = (callback) => {
    const [isBack, setIsBack] = useState(false);

    const handleEvent = () => {
        setIsBack(true);
        callback();
        window.history.go(1)
        // window.history.go(0); // this line of code prevents browser going back. if you don't navigate to any pages of app in callback function using react-router navigate() function, by default any event will occure when click on browser back button and back button is disabled.

    };

    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", handleEvent);
  


    return isBack;
};

export default useBackButton;