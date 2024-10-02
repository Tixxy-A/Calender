import { isSameDay } from "date-fns";
import { useState } from "react";

function Model({ close, day, events, setEvents }) {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [update, setUpdate] = useState("");
  const handleDelete = () => {
    console.log(day);
    const updatedEvents = events.filter((event) => !isSameDay(event.Day, day));
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    close();
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center transition-colors visible bg-black/60">
      <div className="bg-white py-5 px-8">
        <div className="flex justify-end">
          <button onClick={close}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="black"
              class="size-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {openUpdate ? (
          <div className="flex justify-center place-items-center mt-2 gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="blue"
              class="size-12"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
            <div className="">
              <input
                type="text"
                className="w-full border-b-2 border-black text-black text-xl focus:outline-none text-center"
                value={update}
                onChange={(e) => setUpdate(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-center mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="red"
                class="size-16"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </div>
            
          </div>
        )}
        <div className="mt-4 text-center font-normal">
              <p className="text-black text-2xl font-bold">{openUpdate?"Confirm Update":"Confirm Delete"}</p>
              <p className="mt-3 text-lg text-gray-800">
              {openUpdate?"Are you sure you want to update this item?":"Are you sure you want to delete this item?"}
             </p>
            </div>
        <div className="flex justify-center gap-2 mt-5 mb-2">
         {
            !openUpdate &&  <button
            className="py-2 px-4 w-full bg-red-600 text-white shadow-md shadow-red-400/40 rounded-2xl"
            onClick={handleDelete}
          >
            Delete
          </button>
         }
          <button
            className={`py-2 px-4 w-full  rounded-2xl ${openUpdate?" bg-blue-600 text-white shadow-md shadow-blue-600/50":" bg-gray-300 text-gray-900 shadow-md shadow-gray-400/40"}`}
            onClick={() => {
                if(openUpdate){
                    if(update.length===0){
                        return;
                    }
                    const updatedEvents=events.map((e)=>{
                        if(isSameDay(e.Day,day)){
                            return {...e,Title:update}
                        }
                        return e
                    })
                    //console.log(updatedEvents)
                    setEvents(updatedEvents);
                    localStorage.setItem('events', JSON.stringify(updatedEvents));
                    close();
                }else{
                    setOpenUpdate(true)
                }
            }}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default Model;
