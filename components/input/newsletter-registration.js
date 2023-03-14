import { useRef } from "react";
import { toast } from "react-toastify";
import classes from "./newsletter-registration.module.css";
import 'react-toastify/dist/ReactToastify.css'

function NewsletterRegistration() {
  const emailRef = useRef();
  function registrationHandler(event) {
    event.preventDefault();

    // fetch user input (state or refs)
    const email = emailRef.current.value;
    // send valid data to API
    const data = {
      email: email,
    };
    fetch("/api/registration", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        event.target.reset();
        console.log(data);
        toast.success("Email added successfully")
      })
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
