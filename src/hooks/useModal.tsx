import { useState } from "react";

export default function useModal() {
  const [modalIsOpen, setisOpen] = useState(false);

  const toggle = () => {
    setisOpen(!modalIsOpen);
  };

  return {
    modalIsOpen,
    toggle
  };
}