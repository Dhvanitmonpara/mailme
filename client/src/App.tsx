import "./App.css";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

function App() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className="h-screen w-screen bg-zinc-900 text-zinc-200 overflow-hidden">
      <div className="w-full h-3/5 flex flex-col justify-center items-center">
        <h1 className="text-5xl font-semibold pb-10">mailme.com</h1>
        <form
          className="w-full px-6 md:px-0 md:w-1/3 flex flex-col justify-center items-center"
          action="post"
        >
          <Input type="email" label="Email" />
          <Input
            label="Password"
            variant="bordered"
            placeholder="Enter your password"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
                aria-label="toggle password visibility"
              >
                {isVisible ? (
                  <FaRegEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <FaEye className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="max-w-xs"
          />
        </form>
      </div>
    </div>
  );
}

export default App;
