function Model({ close, add, title, setTitle, error }) {
  //console.log(title)
  return (
    <div className="fixed inset-0 flex justify-center items-center transition-colors visible bg-black/60">
      <div className="bg-white py-4 px-8">
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {error && <p className="mt-2 text-red-600 text-md">{error}</p>}
          </div>
        </div>
        <div className="mt-4 text-center font-normal">
          <p className="text-black text-2xl font-bold">Confirm Add</p>
          <p className="mt-3 text-lg text-gray-600">
            Are you sure you want to Schedule this task?
          </p>
        </div>
        <div className="flex justify-center gap-2 mt-5 mb-2">
          <button
            className="py-2 px-4 w-full bg-blue-600 text-white shadow-md shadow-blue-400/40 rounded-2xl"
            onClick={add}
          >
            Schedule
          </button>
          <button
            className="py-2 px-4 w-full bg-gray-300 text-gray-700 shadow-md shadow-gray-400/40 rounded-2xl"
            onClick={close}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Model;
