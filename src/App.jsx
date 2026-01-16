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
      console.log("들어옴");
      console.log("state : ", state);
      console.log("들어옴");

      return state.some((item) => Number(item.num) === Number(action.data.num))
        ? state.map((item) =>
            Number(item.num) === Number(action.data.num) ? action.data : item
          )
        : [...state, action.data];
    case "DELETE":
      return state.filter((item) => Number(item.num) !== Number(action.num));
  }
}

function App() {
  const [suyuls, dispatch] = useReducer(reducer, []);
  const [nums, setNums] = useState([]);
  const ref = useRef(0);

  const allSuyulChange = (won, jak, su, num) => {
    console.log(won);
    console.log(jak);
    console.log(su);
    console.log(num);
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

  const deleteContentArea = (number) => {
    setNums(() => {
      return nums.filter((item) => Number(item) !== Number(number));
    });
  };

  useEffect(() => {
    console.log(suyuls);
  }, [suyuls]);
  useEffect(() => {
    console.log(nums);
  }, [nums]);

  const addContentArea = () => {
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
        <SuyulDispatchContext.Provider
          value={{ allSuyulChange, onDelete, deleteContentArea }}
        >
          <div className="contentArea">
            <Header />
            <div className="titleArea">
              <h2 style={{ marginRight: "10px" }}>🐮수율계산기</h2>
              <div
                style={{
                  position: "relative",
                }}
              >
                <button className="plus-button" onClick={addContentArea}>
                  +
                </button>
              </div>
            </div>
            {nums.map((i) => {
              return (
                <div style={{ display: "flex" }} key={i}>
                  <ContentArea num={i} />
                </div>
              );
            })}
          </div>
        </SuyulDispatchContext.Provider>
      </SuyulStateContext.Provider>
    </div>
  );
}

export default App;
