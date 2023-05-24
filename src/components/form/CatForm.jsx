import React from "react";
import { Button, Input } from "react-daisyui";

const CatForm = ({ onSubmitHandler, name, setName }) => {
  return (
    <form onSubmit={onSubmitHandler}>
      <Input
        placeholder="Enter category name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button
        disabled={name.length === 0}
        className="w-fit ms-2 bg-slate-300 text-slate-700 hover:text-white border-none"
      >
        Enter
      </Button>
    </form>
  );
};

export default CatForm;
