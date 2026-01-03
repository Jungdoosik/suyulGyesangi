import { useContext, useState } from "react";
import "../components/ContentArea.css";
import { SuyulDispatchContext } from "../contexts/suyulContext";

const ContentArea = (props) => {
  const { allSuyulChange, onDelete } = useContext(SuyulDispatchContext);
  const [wonmul, setWonmul] = useState("");
  const [bbasi, setBbasi] = useState("");
  const [jakup, setJakup] = useState("");
  const [suyul, setSuyul] = useState("");

  const onchangeWonmul = (e) => {
    setWonmul(e.target.value);
    if (e.target.value === "") {
      onDelete(props.num);
    }

    if (bbasi === 0 || bbasi === "" || bbasi === undefined) {
      return;
    }

    gyesan(e.target.value, bbasi);
  };

  const onchangeBbasi = (e) => {
    setBbasi(e.target.value);
    if (e.target.value === "") {
      onDelete(props.num);
    }
    if (wonmul === 0 || wonmul === "" || wonmul === undefined) {
      return;
    }
    gyesan(wonmul, e.target.value);
  };

  const gyesan = (wonGap, bbaGap) => {
    let won = Number(wonGap);
    let bba = Number(bbaGap);
    if (won < bba) {
      setJakup("원물보다 빠시가 더 무겁습니다.");
      setSuyul("원물보다 빠시가 더 무겁습니다.");
      onDelete(props.num);
      return;
    }

    if (won === 0 || won === "" || bba === 0 || bba === "") {
      setJakup("");
      setSuyul("");
    } else {
      const jakupGyesan = ((won * 100 - bba * 100) / 100).toFixed(2);
      setJakup(jakupGyesan);

      const suyulGyesan = Number(jakupGyesan) / Number(won);
      setSuyul(suyulGyesan);

      allSuyulChange(wonGap, jakupGyesan, suyulGyesan, props.num);
    }
  };

  return (
    <div className="content_body">
      <div className="inputArea">
        <div className="inputSubArea">
          <h5>원물</h5>
          <input
            type="text"
            value={wonmul}
            onChange={onchangeWonmul}
            className="textArea"
          ></input>
        </div>
        <div className="inputSubArea">
          <h5>빠시</h5>
          <input
            type="text"
            value={bbasi}
            onChange={onchangeBbasi}
            className="textArea"
          ></input>
        </div>
      </div>
      <div>
        <div className="divArea">
          <div>원물 : </div>
          <div>
            <span>{wonmul}</span>
          </div>
        </div>
        <div className="divArea">
          <div>작업 : </div>
          <div>
            <span>{jakup}</span>
          </div>
        </div>
        <div className="divArea">
          <div>수율 : </div>
          <div>
            <span>{suyul}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentArea;
