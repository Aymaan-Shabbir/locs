// src/app/page.tsx
import React from "react";
import PlaceSuggestions from "./components/PlaceSuggestions";

const Home: React.FC = () => {
  return (
    <div className="w-full ">
      <h1>Welcome to BongTrials</h1>
      <PlaceSuggestions />
    </div>
  );
};

export default Home;
