import "./App.css";
import { Input, Textarea, Button } from "@nextui-org/react";
import { useState, ChangeEvent, FormEvent } from "react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import axios, { AxiosError } from "axios";
import getErrorFromAxios from "./utils/getErrorFromAxios";

// Define the shape of the form data
interface FormData {
  from: string;
  to: string;
  password: string;
  subject: string;
  text: string;
  html: string;
}

function App() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Initialize form data state
  const [formData, setFormData] = useState<FormData>({
    from: "",
    to: "",
    password: "",
    subject: "",
    text: "",
    html: "",
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  // Handle input change and update form data state
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { from, to, password, subject, text, html } = formData;
    console.log(formData);
    try {
      if (password !== "iamdhvanit") {
        toast("Incorrect password");
        return;
      }

      console.log(import.meta.env.VITE_ACCESS_CONTROL_ORIGIN)
      const response = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_SERVER_API_URL}/mail/send-mail`,
        data: {
          from,
          to,
          subject,
          text,
          html,
        },
        withCredentials: true,
        headers: {
          "Access-control-Allow-Origin": import.meta.env
            .VITE_ACCESS_CONTROL_ORIGIN,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success("Email sent successfully");
        setFormData({
          from: "",
          to: "",
          password: "",
          subject: "",
          text: "",
          html: "",
        });
      }
    } catch (error) {
      const errorMsg = getErrorFromAxios(error as AxiosError);
      if (errorMsg !== undefined) toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-zinc-900 text-zinc-200 overflow-y-scroll scrollbar-hide">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full h-80 flex flex-col justify-end items-center">
        <h1 className="text-5xl font-semibold pb-10">mailme.com</h1>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full px-6 md:px-0 md:w-1/3 space-y-3 flex flex-col justify-center items-center"
        >
          <Input
            type="text"
            label="From"
            name="from"
            value={formData.from}
            onChange={handleInputChange}
            required
          />
          <Input
            type="email"
            label="To"
            name="to"
            value={formData.to}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Password"
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
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full"
          />
          <Input
            type="text"
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
          />
          <Textarea
            label="Text"
            placeholder="Enter your text"
            name="text"
            value={formData.text}
            onChange={handleInputChange}
          />
          <Textarea
            label="HTML"
            placeholder="Enter HTML"
            name="html"
            value={formData.html}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            className="w-full"
            color="primary"
            isLoading={loading}
          >
            {loading ? "Loading" : "Send"}
          </Button>
        </form>
        <div className="h-24"></div>
      </div>
    </div>
  );
}

export default App;
