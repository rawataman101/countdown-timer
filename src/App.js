import { useEffect, useState } from "react";
import DateTimeDiv from "./DateTimeDiv";
import "./App.css";
function App() {
  const [toggle, setToggle] = useState(false);
  const [dateTime, setDateTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //get data-time from form using FormData
    const form = e.target; // get form element
    const formData = new FormData(form); //formdata object
    const datetimeValue = formData.get("datetime-input"); // get value of datetime input
    setDateTime(new Date(datetimeValue).getTime());
    dateTime && setToggle(!toggle);
  };

  useEffect(() => {
    if (!toggle) {
      return;
    }

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = dateTime - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(timer);
        setToggle(false);
        setMessage("The countdown is over! What's your next advednture?");
      } else if (days > 100) {
        clearInterval(timer);
        setToggle(false);
        setMessage("Selected time is more than 100 days");
      } else {
        setTimeLeft({
          days: `${days}d`,
          hours: `${hours}h`,
          minutes: `${minutes}m`,
          seconds: `${seconds}s`,
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [toggle, dateTime]);
  return (
    <div className="App">
      <h1>
        Countdown <span className="timerColor">Timer</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          className="dateTimeInput"
          type="datetime-local"
          name="datetime-input"
          id="datetime-input"
          required
        />
        <br />
        <button className="toggleButton">
          {toggle ? "Cancel Timer" : "Start Timer"}
        </button>
      </form>
      <div className="container">
        {!message ? (
          <>
            <DateTimeDiv data={timeLeft?.days} />
            <DateTimeDiv data={timeLeft?.hours} />
            <DateTimeDiv data={timeLeft?.minutes} />
            <DateTimeDiv data={timeLeft?.seconds} />
          </>
        ) : (
          <h3>{message}</h3>
        )}
      </div>
    </div>
  );
}

export default App;
