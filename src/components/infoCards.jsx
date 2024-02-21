import React from "react";

export const InfoCards = ({ icon, title, description }) => {
  return (
    <section className="p-4 hidden md:block md:border-2 border-b-2 rounded-md mt-4">
      <div className="flex">
        <div className="my-auto mr-2 text-xl">{icon}</div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <p className=" mt-2">{description}</p>
    </section>
  );
};
