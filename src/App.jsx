import { useState } from "react";
import "./App.css";

function App() {
  const [wonmul1, setWonmul1] = useState("");
  const [bbasi1, setBbasi1] = useState("");
  const [jakup1, setJakup1] = useState("");
  const [suyul1, setSuyul1] = useState("");

  const onchangeWonmul = (e) => {
    setWonmul1(e.target.value);
    if (bbasi1 === 0 || bbasi1 === "" || bbasi1 === undefined) {
      return;
    }
    gyesan(e.target.value, bbasi1);
  };

  const onchangeBbasi = (e) => {
    setBbasi1(e.target.value);
    if (wonmul1 === 0 || wonmul1 === "" || wonmul1 === undefined) {
      return;
    }
    gyesan(wonmul1, e.target.value);
  };

  const gyesan = (wonGap, bbaGap) => {
    const won = Number(wonGap);
    const bba = Number(bbaGap);
    if (won < bba) {
      setJakup1("원물보다 빠시가 더 무겁습니다.");
      setSuyul1("원물보다 빠시가 더 무겁습니다.");
      return;
    }

    const jakupGyesan = (won * 100 - bba * 100) / 100;
    setJakup1(jakupGyesan);

    const suyulGyesan = Number(jakupGyesan) / won;
    setSuyul1(suyulGyesan);
  };
  return (
    <div>
      <h1>수율계산기</h1>
      <div className="inputArea">
        <div className="inputSubArea">
          <h5>원물입력</h5>
          <input
            type="number"
            value={wonmul1}
            onChange={onchangeWonmul}
            className="textArea"
          ></input>
        </div>
        <div className="inputSubArea">
          <h5>빠시입력</h5>
          <input
            type="number"
            value={bbasi1}
            onChange={onchangeBbasi}
            className="textArea"
          ></input>
        </div>
      </div>
      <div>
        <div className="divArea">
          <h5>원물</h5>
          <p>{wonmul1}</p>
        </div>
        <div className="divArea">
          <h5>작업</h5>
          <p>{jakup1}</p>
        </div>
        <div className="divArea">
          <h5>수율</h5>
          <p>{suyul1}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
