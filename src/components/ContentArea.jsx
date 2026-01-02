import { useContext, useState } from "react";
import "../components/ContentArea.css";
import { SuyulDispatchContext } from "../contexts/suyulContext";

const ContentArea = (props) => {
  const allSuyulChange = useContext(SuyulDispatchContext);
  const [wonmul, setWonmul] = useState("");
  const [bbasi, setBbasi] = useState("");
  const [jakup, setJakup] = useState("");
  const [suyul, setSuyul] = useState("");

  const onchangeWonmul = (e) => {
    setWonmul(e.target.value);

    if (bbasi === 0 || bbasi === "" || bbasi === undefined) {
      return;
    }
    // onSuyulChange(e.target.value, bbasi);
    gyesan(e.target.value, bbasi);
  };

  const onchangeBbasi = (e) => {
    setBbasi(e.target.value);
    if (wonmul === 0 || wonmul === "" || wonmul === undefined) {
      return;
    }
    // onSuyulChange(wonmul, e.target.value);
    gyesan(wonmul, e.target.value);
  };

  const gyesan = (wonGap, bbaGap) => {
    const won = Number(wonGap);
    const bba = Number(bbaGap);
    if (won < bba) {
      setJakup("원물보다 빠시가 더 무겁습니다.");
      setSuyul("원물보다 빠시가 더 무겁습니다.");
      return;
    }

    const jakupGyesan = (won * 100 - bba * 100) / 100;
    setJakup(jakupGyesan);

    const suyulGyesan = Number(jakupGyesan) / won;
    setSuyul(suyulGyesan);

    allSuyulChange(wonmul, jakupGyesan, suyulGyesan, props.num);
  };

  return (
    <div>
      <div className="inputArea">
        <div className="inputSubArea">
          <h5>원물입력</h5>
          <input
            type="number"
            value={wonmul}
            onChange={onchangeWonmul}
            className="textArea"
          ></input>
        </div>
        <div className="inputSubArea">
          <h5>빠시입력</h5>
          <input
            type="number"
            value={bbasi}
            onChange={onchangeBbasi}
            className="textArea"
          ></input>
        </div>
      </div>
      <div>
        <div className="divArea">
          <h5>원물</h5>
          <p>{wonmul}</p>
        </div>
        <div className="divArea">
          <h5>작업</h5>
          <p>{jakup}</p>
        </div>
        <div className="divArea">
          <h5>수율</h5>
          <p>{suyul}</p>
        </div>
      </div>
    </div>
  );
};

export default ContentArea;
