import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isToday,
  isSameDay,
} from "date-fns";
import { useState, useEffect } from "react";
import Model from "./Modal";
import ModelDel from "./ModalDel";

function EventCalender() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [error, setError] = useState(false);
  const [list, setList] = useState(false);
  const [day, setDay] = useState();
  useEffect(() => {
    const ev = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(ev);
    //console.log(events);
  }, []);
  const currentDate = new Date();
  const WeekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  //console.log(firstDayOfMonth.toISOString());
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });
  const startingDayIndex = getDay(firstDayOfMonth);
  //console.log(daysInMonth);
  //console.log(day);
  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setDay();
  };
  const handleSubmit = (day, title) => {
    //console.log(day, title);
    if (title.length === 0) {
      setError("Add Something YSB");
      return;
    }
    setError(false);
    setOpen(false);
    setTitle("");
    setDay();
    const newObj = {
      Day: day,
      Title: title,
    };
    const ev = [...events, newObj];
    setEvents(ev);
    localStorage.setItem("events", JSON.stringify(ev));
  };
  const close2 = () => {
    setOpen(false);
    setDay();
    setOpenDel(false);
  };

  //console.log(openDel);
  return (
    <div className="flex justify-center font-amaze">
      {list ? (
        <div className="mt-10 text-center">
          <ul>
            {events.map((e, ind) => {
              return (
                <li key={ind} className="flex gap-10 text-2xl items-center text-blue-600">
                  {format(e.Day, "dd MMMM ")}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-12"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                    />
                  </svg>
                  {e.Title}
                </li>
              );
            })}
          </ul>
          <button
            className="mt-10 py-2 px-10 text-lg border border-violet-600 shadow-xl rounded-2xl shadow-violet-600/55"
            onClick={() => setList(false)}
          >
            Back
          </button>
        </div>
      ) : (
        <div className="text-center sm:w-full lg:w-2/3 p-8">
          <h1 className="mt-7 text-white font-bold text-2xl">
            {format(currentDate, "MMMM , yyyy")}
          </h1>
          <div className="grid grid-cols-7 gap-4 mt-10">
            {WeekDays.map((day) => {
              return (
                <div
                  className="text-gray-400 font-semibold py-2 lg:px-16 px-3 md:6 border text-lg shadow-lg shadow-gray-400/60 rounded-2xl mb-2"
                  key={day}
                >
                  {day}
                </div>
              );
            })}
            {Array.from({ length: startingDayIndex }).map((_, index) => {
              return <div key={`index-${index}`} className=""></div>;
            })}
            {daysInMonth.map((day, index) => {
              return (
                <button
                  key={index}
                  className={`border grid grid-cols-1 items-center justify-center border-blue-700 sm:py-4 h-20 rounded-2xl shadow-xl text-lg shadow-blue-800/30 ${
                    isToday(day)
                      ? "bg-red-700 text-white text-xl border-black shadow-red-800/30"
                      : ""
                  }`}
                  onClick={() => {
                    setOpen(true);
                    setDay(day);
                    //console.log(events);
                    const ev = events.filter((e) => isSameDay(e.Day, day));
                    //console.log(ev);
                    if (ev.length >= 1) {
                      setOpenDel(true);
                    }
                  }}
                >
                  {format(day, "d")}
                  {events
                    .filter((e) => isSameDay(e.Day, day))
                    .map((e) => {
                      return (
                        <div
                          key={e.Title}
                          className="text-sm mt-1 bg-green-400 rounded-xl text-black"
                        >
                          {e.Title.slice(0, 12)}...
                        </div>
                      );
                    })}
                </button>
              );
            })}
          </div>
          <button
            className="mt-10 py-2 px-10 text-lg border border-violet-600 shadow-xl rounded-2xl shadow-violet-600/55"
            onClick={() => setList(true)}
          >
            See full List
          </button>
        </div>
      )}

      {open ? (
        openDel ? (
          <ModelDel
            day={day}
            events={events}
            setEvents={setEvents}
            close={close2}
          />
        ) : (
          <Model
            close={handleClose}
            add={() => handleSubmit(day, title)}
            title={title}
            setTitle={setTitle}
            error={error}
          />
        )
      ) : null}
    </div>
  );
}

export default EventCalender;
