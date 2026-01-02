import { useReducer, useEffect } from "react";
import ContentArea from "./components/ContentArea";
import "./App.css";
import {
  SuyulStateContext,
  SuyulDispatchContext,
} from "./contexts/suyulContext";

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE":
      return state.some((item) => item.num === action.data.num)
        ? state.map((item, index) =>
            index === action.data.num ? action.data : item
          )
        : [...state, action.data];
  }
}

function App() {
  const [suyuls, dispatch] = useReducer(reducer, []);

  const allSuyulChange = (won, jak, su, num) => {
    // console.log(num);
    dispatch({
      type: "CHANGE",
      data: {
        num: num,
        wonmul: won,
        jakup: jak,
        suyul: su,
      },
    });
  };

  useEffect(() => {
    console.log(suyuls);
  }, [suyuls]);

  return (
    <div>
      <h1>🖩수율계산기</h1>

      <div className="contentArea">
        <SuyulStateContext.Provider value={suyuls}>
          <SuyulDispatchContext.Provider value={allSuyulChange}>
            <ContentArea num={0} />
            <ContentArea num={1} />
            <ContentArea num={2} />
          </SuyulDispatchContext.Provider>
        </SuyulStateContext.Provider>
      </div>
    </div>
  );
}

export default App;
