import React, { useContext, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";

const About = () => {
  const a = useContext(NoteContext);
  
  useEffect(() => {
    a.update()
    // eslint-disable-next-line
  }, [])
  
  return (
    <>
      <h1>About</h1>
      <h4>{a.state.name}. And she was in {a.state.class}.</h4>
    </>
  );
};

export default About;
