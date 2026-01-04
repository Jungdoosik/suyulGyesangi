import { useContext } from "react";
import { SuyulStateContext } from "../contexts/suyulContext";

const Header = () => {
  const allSuyul = useContext(SuyulStateContext);
  return (
    <div className="">
      <div>
        <div className="divArea">
          <div>총 원물 : </div>
          <div>
            <span>
              {allSuyul.reduce(
                (sum, item) => (Number(sum) + Number(item.wonmul)).toFixed(2),
                0
              )}
            </span>
          </div>
        </div>
        <div className="divArea">
          <div>총 작업 : </div>
          <div>
            {allSuyul.reduce(
              (sum, item) => (Number(sum) + Number(item.jakup)).toFixed(2),
              0
            )}
          </div>
        </div>
        <div className="divArea">
          <div>평균 수율 : </div>
          <div>
            {allSuyul.length > 0
              ? allSuyul.reduce(
                  (sum, item) => Number(sum) + Number(item.jakup),
                  0
                ) /
                allSuyul.reduce(
                  (sum, item) => Number(sum) + Number(item.wonmul),
                  0
                )
              : 0}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
