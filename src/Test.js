import React, { useState } from "react";
import { Button } from "@material-ui/core";

const Test = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setCount(count + 1)}
      >
        click me
      </Button>
      <p>Your number is {count}</p>
    </div>
  );
};
export default Test;
