import * as React from 'react';
import './style.css';

export default function App() {
  const [number, setNumber] = React.useState(0);
  const [dark, setDark] = React.useState(false);

  //useMemo cache the value,
  // on the basis of dependency array we can recall slowFunction;
  //to avoid slowFunction execution
  //only execute when number is changed
  const doubleNumber = React.useMemo(() => {
    return slowFunction(number);
  }, [number]);

  //every render new themStyles object is created
  //to avoid recreate useMemo
  const themStyles = React.useMemo(() => {
    return {
      backgroundColor: dark ? 'black' : 'white',
      color: dark ? 'white' : 'black',
    };
  }, [dark]);

  React.useEffect(() => {
    console.log(`Theme changed`);
  }, [themStyles]);
  return (
    <div>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value))}
      />

      <button onClick={() => setDark((prevDark) => !prevDark)}>
        Change Theme
      </button>

      <div style={themStyles}>{doubleNumber}</div>
    </div>
  );
}

function slowFunction(num) {
  console.log('Calling Slow function');
  for (let i = 0; i <= 1000; i++) {}
  return num * 2;
}
