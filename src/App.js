import React from 'react';

function App() {
  return (
   <section className="w-3/6 m-auto flex flex-wrap mt-20">
     <div className="flex flex-wrap">
      <div className="w-full mb-8 p-10 bg-gray-100 relative rounded shadow">
        <span className="text-gray-300 text-6xl absolute italic right-10">
          01
        </span>
        <h2 className="z-10 relative text-2xl text-gray-900 absolute">
          Christopher Fuentes
        </h2>
        <hr className="block mb-6 mt-5 w-8 border-red-500 h-0 border-t-2" />
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quaerat in enim labore cum similique adipisci dolor fuga dignissimos accusamus, est, ducimus consequatur! Quaerat, in quas fugiat ab molestiae rerum.
        </p>
      </div>
     </div>
   </section>
  );
}

export default App;
