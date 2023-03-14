import { useContext, useRef } from "react";
import { toast } from "react-toastify";
import classes from "./newsletter-registration.module.css";
import "react-toastify/dist/ReactToastify.css";
import NotificationContext from "@/store/notificationContext";

function NewsletterRegistration() {
  const emailRef = useRef();

  const notificationCntxt = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();

    // fetch user input (state or refs)
    const email = emailRef.current.value;
    // send valid data to API
    const data = {
      email: email,
    };
    notificationCntxt.showNotification({
      title: "Signing Up",
      message: "Registration ongoing",
      status: "Pending",
    });
    fetch("/api/registration", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if(res.ok){
          return res.json();
        }

        return res.json().then(data=>{
          throw new Error(data.message || "Something went wrong")
        })
      })
      .then((data) => {
        event.target.reset();
        notificationCntxt.showNotification({
          title: "Success",
          message: "Successfully registered",
          status: "success",
        });
        // toast.success("Email added successfully");
      })
      .catch((error) => {
        notificationCntxt.showNotification({
          title: "Erorr",
          message: error.message || "Something went wrong",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2 style={{ marginBottom: "20px" }}>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailRef}
          />
          <button style={{ padding: "10px" }}>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
