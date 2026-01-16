import { useReducer, useEffect, useState, useRef } from "react";
import ContentArea from "./components/ContentArea";
import "./App.css";
import {
  SuyulStateContext,
  SuyulDispatchContext,
} from "./contexts/suyulContext";
import Header from "./components/Header";

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE":
      return state.some((item) => item.num === action.data.num)
        ? state.map((item, index) =>
            index === action.data.num ? action.data : item
          )
        : [...state, action.data];
    case "DELETE":
      return state.filter((item) => Number(item.num) !== Number(action.num));
  }
}

function App() {
  const [suyuls, dispatch] = useReducer(reducer, []);
  const [nums, setNums] = useState([]);
  const ref = useRef(3);

  const allSuyulChange = (won, jak, su, num) => {
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

  const onDelete = (num) => {
    dispatch({
      type: "DELETE",
      num: num,
    });

    // setTodos(todos.filter((todo) => todo.id !== targetId));
  };

  useEffect(() => {
    // console.log(suyuls);
  }, [suyuls]);
  useEffect(() => {
    console.log(nums);
  }, [nums]);

  const addContentArea = () => {
    console.count("addContentArea called");
    setNums(
      (prev) => {
        const id = ref.current;
        ref.current += 1;
        return [...prev, id];
      }
      // [...prev, ref.current++]
    );
  };

  return (
    <div>
      <SuyulStateContext.Provider value={suyuls}>
        <SuyulDispatchContext.Provider value={{ allSuyulChange, onDelete }}>
          <div className="contentArea">
            <Header />
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <h2>🐮수율계산기</h2>
              <button>-</button>
              <button onClick={addContentArea}>+</button>
            </div>
            <ContentArea num={0} />
            <ContentArea num={1} />
            <ContentArea num={2} />
          </div>
        </SuyulDispatchContext.Provider>
      </SuyulStateContext.Provider>
    </div>
  );
}

export default App;
