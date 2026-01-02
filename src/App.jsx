import { useReducer, useEffect } from "react";
import ContentArea from "./components/ContentArea";
import "./App.css";
import {
  SuyulStateContext,
  SuyulDispatchContext,
} from "./contexts/suyulContext";
import Footer from "./components/Footer";

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE":
      return state.some((item) => item.num === action.data.num)
        ? state.map((item, index) =>
            index === action.data.num ? action.data : item
          )
        : [...state, action.data];
    case "DELETE":
      // console.log("들어옴");
      // console.log("들어옴 : " + action.num);
      // console.log(state);
      return state.filter((item) => Number(item.num) !== Number(action.num));
  }
}

function App() {
  const [suyuls, dispatch] = useReducer(reducer, []);

  const allSuyulChange = (won, jak, su, num) => {
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

  useEffect(() => {
    console.log(suyuls);
  }, [suyuls]);

  return (
    <div>
      <h2>📱수율계산기</h2>

      <SuyulStateContext.Provider value={suyuls}>
        <SuyulDispatchContext.Provider value={{ allSuyulChange, onDelete }}>
          <div className="contentArea">
            <ContentArea num={0} />
            <ContentArea num={1} />
            <ContentArea num={2} />
          </div>
          <div className="contentArea">
            <Footer />
          </div>
        </SuyulDispatchContext.Provider>
      </SuyulStateContext.Provider>
    </div>
  );
}

export default App;
