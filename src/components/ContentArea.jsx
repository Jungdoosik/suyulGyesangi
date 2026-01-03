import { useContext, useState } from "react";
import "../components/ContentArea.css";
import { SuyulDispatchContext } from "../contexts/suyulContext";

const ContentArea = (props) => {
  const { allSuyulChange, onDelete } = useContext(SuyulDispatchContext);
  const [wonmul, setWonmul] = useState("");
  const [bbasi, setBbasi] = useState("");
  const [jakup, setJakup] = useState("");
  const [suyul, setSuyul] = useState("");

  const regCheck = (text) => {
    let reg = text.replace(/[^0-9.]/g, "");

    console.log(reg);

    const parts = reg.split(".");
    if (parts.length > 2) {
      reg = parts[0] + "." + parts.slice(1).join("");
    }

    return reg;
  };

  const onchangeWonmul = (e) => {
    let reg = regCheck(e.target.value);
    setWonmul(reg);

    if (e.target.value === "") {
      onDelete(props.num);
    }

    if (bbasi === 0 || bbasi === "" || bbasi === undefined) {
      setJakup("");
      setSuyul("");
      return;
    }
    gyesan(e.target.value, bbasi);
  };

  const onchangeBbasi = (e) => {
    let reg = regCheck(e.target.value);
    setBbasi(reg);
    if (e.target.value === "") {
      onDelete(props.num);
    }
    if (wonmul === 0 || wonmul === "" || wonmul === undefined) {
      setJakup("");
      setSuyul("");
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
    } else {
      const jakupGyesan = ((won * 100 - bba * 100) / 100).toFixed(2);

      const suyulGyesan = Number(jakupGyesan) / Number(won);

      if (Number.isNaN(jakupGyesan) || Number.isNaN(suyulGyesan)) {
        return;
      } else {
        setJakup(jakupGyesan);
        setSuyul(suyulGyesan);
      }

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
            inputMode="decimal"
            onChange={onchangeWonmul}
            className="textArea"
          ></input>
        </div>
        <div className="inputSubArea">
          <h5>빠시</h5>
          <input
            type="text"
            value={bbasi}
            inputMode="decimal"
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
