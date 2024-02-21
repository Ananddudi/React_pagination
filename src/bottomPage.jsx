import { useEffect, useState } from "react";

const bottomPage = ({ currentPage, total = 8, handleButton }) => {
  const [skip, setSkip] = useState(0);
  const showDots = true;
  let middle = Math.floor(total / 2);
  let starting = total - (middle + 2);
  let endVal = total - (middle + 2);

  useEffect(() => {
    if (currentPage == starting + skip) {
      setSkip((val) => val + 1);
    } else {
      if (currentPage === nums[0]) {
        setSkip((val) => val > 0 && val - 1);
      }
    }
  }, [currentPage]);

  let nums = [];

  for (let i = 1 + skip; i <= total; i++) {
    if (showDots && i > starting + skip && i <= endVal + middle) {
      nums.includes(".....") || nums.push(".....");
    } else {
      nums.push(i);
    }
  }

  return (
    <div style={{ display: "flex", gap: 4 }}>
      {nums.map((val, index) => {
        if (val === ".....") return <div>{val}</div>;
        return (
          <button
            onClick={() => handleButton(val)}
            className={currentPage === val && "fainted"}
            disabled={currentPage === val && true}
            key={index}
          >
            {val}
          </button>
        );
      })}
    </div>
  );
};

export default bottomPage;
