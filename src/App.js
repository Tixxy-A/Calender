
import EventCalender from './EventCalender';

function App() {
  return (
    <div className="overflow-x-hidden text-gray-300 selection:bg-gray-300 selection:text-black font-inter">
      <div className="fixed top-0 -z-10 h-full w-full">
        <div class="absolute inset-0 -z-10 h-full w-full items-center px-5 py-5 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      </div>
      <EventCalender/>
    </div>
  );
}

export default App;
