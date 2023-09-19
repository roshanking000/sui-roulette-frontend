import { useState, useEffect } from "react";
import classNames from "classnames";

import ChipComponent from "../ChipComponent/index.jsx";
import { ValueType } from "../../constant/global.jsx";

const totalNumbers = 38;

let other_1_12 = { type: ValueType.NUMBERS_1_12 };
let other_2_12 = { type: ValueType.NUMBERS_2_12 };
let other_3_12 = { type: ValueType.NUMBERS_3_12 };
let other_1_18 = { type: ValueType.NUMBERS_1_18 };
let other_1R_12 = { type: ValueType.NUMBERS_1R_12 };
let other_2R_12 = { type: ValueType.NUMBERS_2R_12 };
let other_3R_12 = { type: ValueType.NUMBERS_3R_12 };
let other_19_36 = { type: ValueType.NUMBERS_19_36 };
let other_even = { type: ValueType.EVEN };
let other_odd = { type: ValueType.ODD };
let other_red = { type: ValueType.RED };
let other_black = { type: ValueType.BLACK };

const Board = (props) => {
  const { chipsData, rouletteData } = props;
  console.log("-------------render-----------");
  console.log(chipsData);
  console.log(chipsData.placedChips);
  console.log("-------------end-----------");

  let currentItemChips_1R_12 = chipsData.placedChips.get({
    type: ValueType.NUMBERS_1R_12,
  });
  console.log(currentItemChips_1R_12);
  let currentItemChips_2R_12 = chipsData.placedChips.get({
    type: ValueType.NUMBERS_2R_12,
  });
  let currentItemChips_3R_12 = chipsData.placedChips.get({
    type: ValueType.NUMBERS_3R_12,
  });
  let currentItemChips_1_12 = chipsData.placedChips.get({
    type: ValueType.NUMBERS_1_12,
  });
  let currentItemChips_2_12 = chipsData.placedChips.get({
    type: ValueType.NUMBERS_2_12,
  });
  let currentItemChips_3_12 = chipsData.placedChips.get({
    type: ValueType.NUMBERS_3_12,
  });
  let currentItemChips_1_18 = chipsData.placedChips.get({
    type: ValueType.NUMBERS_1_18,
  });
  let currentItemChips_even = chipsData.placedChips.get({
    type: ValueType.EVEN,
  });
  let currentItemChips_red = chipsData.placedChips.get({ type: ValueType.RED });
  let currentItemChips_black = chipsData.placedChips.get({
    type: ValueType.BLACK,
  });
  let currentItemChips_odd = chipsData.placedChips.get({ type: ValueType.ODD });
  let currentItemChips_19_36 = chipsData.placedChips.get({
    type: ValueType.NUMBERS_19_36,
  });

  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    getNumbersList();
  }, []);

  const onCellClick = (item) => {
    console.log("--------Board onCellClick---------");
    props.onCellClick(item);
  };

  const getNumbersList = () => {
    let colList = [];
    let difference = 3;

    for (let i = 1; i <= 5; i++) {
      let rowList = [];
      let startNumberSub = 0;
      if (i === 1) {
        startNumberSub = 0;
      } else if (i === 3) {
        startNumberSub = 1;
      } else if (i == 5) {
        startNumberSub = 2;
      }

      let nextStartNumberSub = 0;
      if (i + 1 === 3) {
        nextStartNumberSub = 1;
      } else if (i + 1 === 5) {
        nextStartNumberSub = 2;
      }
      let prevStartNumberSub = 0;
      if (i - 1 === 3) {
        prevStartNumberSub = 1;
      } else if (i - 1 === 5) {
        prevStartNumberSub = 2;
      }
      if (i === 1) {
        let cell = {};
        cell.type = ValueType.NUMBER;
        cell.value = 0;

        rowList.push(cell);
      }
      for (let j = 1; j <= 26; j++) {
        let cell = {};

        if (i % 2 == 0 && j > 24) {
          cell.type = ValueType.EMPTY;
          rowList.push(cell);
          continue;
        } else if (i % 2 == 1 && j > 24) {
          if (j == 26) {
            if (i == 1) cell.type = ValueType.NUMBERS_1R_12;
            if (i == 3) cell.type = ValueType.NUMBERS_2R_12;
            if (i == 5) cell.type = ValueType.NUMBERS_3R_12;
            // if (i == 1) cell.valueSplit = [3,6,9,12,15,18,21,24,27,30,33,36];
            // if (i == 3) cell.valueSplit = [2,5,8,11,14,17,20,23,26,29,32,35];
            // if (i == 5) cell.valueSplit = [1,4,7,10,13,16,19,22,25,28,31,34];
            rowList.push(cell);
          } else {
            cell.type = ValueType.EMPTY;
            rowList.push(cell);
          }
          continue;
        }
        // 2, 4 mid splits
        if (i % 2 === 0) {
          if (j === 1) {
            let leftNumber = 0;
            let topNumber = difference - prevStartNumberSub;
            let bottomNumber = difference - nextStartNumberSub;

            cell.type = ValueType.TRIPLE_SPLIT;
            cell.valueSplit = [leftNumber, topNumber, bottomNumber];
            rowList.push(cell);
          } else {
            if (j % 2 === 0) {
              let topNumber =
                ((j - 2) / 2) * difference + difference - prevStartNumberSub;
              let bottomNumber =
                ((j - 2) / 2) * difference + difference - nextStartNumberSub;
              cell.type = ValueType.DOUBLE_SPLIT;
              cell.valueSplit = [topNumber, bottomNumber];
              rowList.push(cell);
            } else {
              let leftNumber = ((j - 1) / 2) * difference - prevStartNumberSub;
              let rightNumber = leftNumber + difference;
              let bottomLeftNumber =
                ((j - 1) / 2) * difference - nextStartNumberSub;
              let bottomRightNumber = bottomLeftNumber + difference;
              cell.type = ValueType.QUAD_SPLIT;
              cell.valueSplit = [
                leftNumber,
                rightNumber,
                bottomLeftNumber,
                bottomRightNumber,
              ];
              rowList.push(cell);
            }
          }
        } else {
          // 1, 3, 5 normal rows
          if (j === 1) {
            let leftNumber = 0;
            let rightNumber = leftNumber + difference;
            cell.type = ValueType.DOUBLE_SPLIT;
            cell.valueSplit = [leftNumber, rightNumber];
            rowList.push(cell);
          } else {
            if (j % 2 === 0) {
              let currentNumber =
                ((j - 2) / 2) * difference + difference - startNumberSub;
              cell.type = ValueType.NUMBER;
              cell.value = currentNumber;
              rowList.push(cell);
            } else {
              let leftNumber = ((j - 1) / 2) * difference - startNumberSub;
              let rightNumber = leftNumber + difference;
              cell.type = ValueType.DOUBLE_SPLIT;
              cell.valueSplit = [leftNumber, rightNumber];
              rowList.push(cell);
            }
          }
        }
      }
      colList.push(rowList);
    }
    let rowListLast = [
      { type: ValueType.QUAD_SPLIT, valueSplit: [0, 1, 2, 3] },
      { type: ValueType.TRIPLE_SPLIT, valueSplit: [1, 2, 3] },
      { type: ValueType.SIX_SPLIT, valueSplit: [1, 2, 3, 4, 5, 6] },
      { type: ValueType.TRIPLE_SPLIT, valueSplit: [4, 5, 6] },
      { type: ValueType.SIX_SPLIT, valueSplit: [4, 5, 6, 7, 8, 9] },
      { type: ValueType.TRIPLE_SPLIT, valueSplit: [7, 8, 9] },
      { type: ValueType.SIX_SPLIT, valueSplit: [7, 8, 9, 10, 11, 12] },
      { type: ValueType.TRIPLE_SPLIT, valueSplit: [10, 11, 12] },
      { type: ValueType.SIX_SPLIT, valueSplit: [10, 11, 12, 13, 14, 15] },
      { type: ValueType.TRIPLE_SPLIT, valueSplit: [13, 14, 15] },
      { type: ValueType.SIX_SPLIT, valueSplit: [13, 14, 15, 16, 17, 18] },
      { type: ValueType.TRIPLE_SPLIT, valueSplit: [16, 17, 18] },
      { type: ValueType.SIX_SPLIT, valueSplit: [16, 17, 18, 19, 20, 21] },
      { type: ValueType.TRIPLE_SPLIT, valueSplit: [19, 20, 21] },
      { type: ValueType.SIX_SPLIT, valueSplit: [19, 20, 21, 22, 23, 24] },
      { type: ValueType.TRIPLE_SPLIT, valueSplit: [22, 23, 24] },
      { type: ValueType.SIX_SPLIT, valueSplit: [22, 23, 24, 25, 26, 27] },
      { type: ValueType.TRIPLE_SPLIT, valueSplit: [25, 26, 27] },
      { type: ValueType.SIX_SPLIT, valueSplit: [25, 26, 27, 28, 29, 30] },
      { type: ValueType.TRIPLE_SPLIT, valueSplit: [28, 29, 30] },
      { type: ValueType.SIX_SPLIT, valueSplit: [28, 29, 30, 31, 32, 33] },
      { type: ValueType.TRIPLE_SPLIT, valueSplit: [31, 32, 33] },
      { type: ValueType.SIX_SPLIT, valueSplit: [31, 32, 33, 34, 35, 36] },
      { type: ValueType.TRIPLE_SPLIT, valueSplit: [34, 35, 36] },
      { type: ValueType.EMPTY },
      { type: ValueType.EMPTY },
    ];
    colList.push(rowListLast);
    console.log(colList);
    // return colList;
    setNumbers(colList);
  };

  const getRouletteColor = (number) => {
    let index = rouletteData.indexOf(number);
    const i =
      index >= 0
        ? index % totalNumbers
        : totalNumbers - Math.abs(index % totalNumbers);
    return i == 0 || number == null ? "none" : i % 2 == 0 ? "black" : "red";
  };

  const getClassNamesFromCellItemType = (type, number) => {
    let isEvenOdd = 0;
    if (number != null && type === ValueType.NUMBER && number !== 0) {
      if (number % 2 === 0) {
        isEvenOdd = 1;
      } else {
        isEvenOdd = 2;
      }
    }
    let numberValue = "value-" + number;
    let cellClass = classNames({
      //[`${numberValue}`]: true,
      "board-cell-number": type === ValueType.NUMBER,
      "board-cell-double-split": type === ValueType.DOUBLE_SPLIT,
      "board-cell-quad-split": type === ValueType.QUAD_SPLIT,
      "board-cell-triple-split": type === ValueType.TRIPLE_SPLIT,
      "board-cell-empty": type === ValueType.EMPTY,
      "board-cell-even": type === ValueType.EVEN || isEvenOdd === 1,
      "board-cell-odd": type === ValueType.ODD || isEvenOdd === 2,
      "board-cell-number-1-18":
        type === ValueType.NUMBERS_1_18 ||
        (number !== null &&
          number >= 1 &&
          number <= 18 &&
          type === ValueType.NUMBER),
      "board-cell-number-19-36":
        type === ValueType.NUMBERS_19_36 ||
        (number !== null &&
          number >= 19 &&
          number <= 36 &&
          type === ValueType.NUMBER),
      "board-cell-number-1-12":
        type === ValueType.NUMBERS_1_12 ||
        (number !== null &&
          number % 3 === 0 &&
          type === ValueType.NUMBER &&
          number !== 0),
      "board-cell-number-2-12":
        type === ValueType.NUMBERS_2_12 ||
        (number !== null && number % 3 === 2 && type === ValueType.NUMBER),
      "board-cell-number-3-12":
        type === ValueType.NUMBERS_3_12 ||
        (number !== null && number % 3 === 1 && type === ValueType.NUMBER),
      "board-cell-red":
        type === ValueType.RED ||
        (number !== null &&
          getRouletteColor(number) === "red" &&
          type === ValueType.NUMBER),
      "board-cell-black":
        type === ValueType.BLACK ||
        (number !== null &&
          getRouletteColor(number) === "black" &&
          type === ValueType.NUMBER),
    });

    return cellClass;
  };

  return (
    <div className="absolute w-[550px] h-[270px] top-[15%] 2xl:top-[17%] right-[8%] bg-[url('/imgs/roulette-board.png')] bg-contain bg-no-repeat bg-center">
      <div className="grid h-[60%] mt-7 ml-4 mr-3">
        <table>
          <tbody>
            {numbers.map((item, index) => {
              let keyId = 0;
              return (
                <tr key={"tr_board_" + index}>
                  {item.map((cell, cellIndex) => {
                    let cellClass = getClassNamesFromCellItemType(
                      cell.type,
                      cell.value
                    );
                    if (cell.type === ValueType.NUMBER && cell.value === 0) {
                      let tdKey = "td_" + cell.type + "_" + cell.value;
                      let chipKey = "chip_" + cell.type + "_" + cell.value;

                      let currentItemChips = chipsData.placedChips.get(cell);
                      return (
                        <ChipComponent
                          key={cellIndex}
                          currentItemChips={currentItemChips}
                          tdKey={tdKey}
                          chipKey={chipKey}
                          cell={cell}
                          cellClass={cellClass}
                          rowSpan={2}
                          colSpan={1}
                          onCellClick={onCellClick}
                          leftMin={undefined}
                          leftMax={undefined}
                          topMin={undefined}
                          topMax={undefined}
                        />
                      );
                    } else if (
                      cell.type === ValueType.NUMBERS_1R_12 ||
                      cell.type === ValueType.NUMBERS_2R_12 ||
                      cell.type === ValueType.NUMBERS_3R_12
                    ) {
                      let chipKeyValue = cell.value + "";
                      if (cell.value === undefined) {
                        let split = cell.valueSplit + "";
                        chipKeyValue = "split_" + split;
                      }
                      let tdKey = "td_" + cell.type + "_" + chipKeyValue;
                      let chipKey = "chip_" + cell.type + "_" + chipKeyValue;
                      let cellVal = null;
                      let cellType = null;
                      let currentItemChips = null;
                      if (cell.type === ValueType.NUMBERS_1R_12) {
                        cellVal = other_1R_12;
                        cellType = ValueType.NUMBERS_1R_12;
                        currentItemChips = currentItemChips_1R_12;
                      }
                      if (cell.type === ValueType.NUMBERS_2R_12) {
                        cellVal = other_2R_12;
                        cellType = ValueType.NUMBERS_2R_12;
                        currentItemChips = currentItemChips_2R_12;
                      }
                      if (cell.type === ValueType.NUMBERS_3R_12) {
                        cellVal = other_3R_12;
                        cellType = ValueType.NUMBERS_3R_12;
                        currentItemChips = currentItemChips_3R_12;
                      }

                      return (
                        <ChipComponent
                          key={cellIndex}
                          currentItemChips={currentItemChips}
                          tdKey={tdKey}
                          chipKey={chipKey}
                          cell={cellVal}
                          rowSpan={1}
                          colSpan={1}
                          cellClass={cellClass}
                          onCellClick={onCellClick}
                          leftMin={undefined}
                          leftMax={undefined}
                          topMin={undefined}
                          topMax={undefined}
                        />
                      );
                    } else {
                      // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
                      // console.log(index);
                      // console.log(cell);

                      let chipKeyValue = cell.value + "";
                      if (cell.value === undefined) {
                        let split = cell.valueSplit + "";
                        chipKeyValue = "split_" + split;
                      }
                      let tdKey = "td_" + cell.type + "_" + chipKeyValue;
                      let chipKey = "chip_" + cell.type + "_" + chipKeyValue;

                      if (cell.type === ValueType.EMPTY) {
                        keyId++;
                        return (
                          <td key={"empty_" + keyId} className={cellClass}></td>
                        );
                      } else {
                        let currentItemChips = chipsData.placedChips.get(cell);

                        return (
                          <ChipComponent
                            key={cellIndex}
                            currentItemChips={currentItemChips}
                            tdKey={tdKey}
                            chipKey={chipKey}
                            cell={cell}
                            rowSpan={1}
                            colSpan={1}
                            cellClass={cellClass}
                            onCellClick={onCellClick}
                            leftMin={undefined}
                            leftMax={undefined}
                            topMin={undefined}
                            topMax={undefined}
                          />
                        );
                      }
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="grid w-auto h-[42%] ml-[52px] mr-5 -mt-4 mb-2">
        <table>
          <tbody>
            <tr>
              <td colSpan={2}></td>
              <ChipComponent
                currentItemChips={currentItemChips_1_12}
                tdKey={"td_other_1_12"}
                chipKey={"chip_other_1_12"}
                cell={other_1_12}
                rowSpan={1}
                colSpan={7}
                cellClass={getClassNamesFromCellItemType(
                  ValueType.NUMBERS_1_12,
                  null
                )}
                leftMin={70}
                leftMax={140}
                onCellClick={onCellClick}
                topMin={undefined}
                topMax={undefined}
              />

              <td></td>
              <ChipComponent
                currentItemChips={currentItemChips_2_12}
                tdKey={"td_other_2_12"}
                chipKey={"chip_other_2_12"}
                cell={other_2_12}
                rowSpan={1}
                colSpan={7}
                leftMin={70}
                leftMax={140}
                cellClass={getClassNamesFromCellItemType(
                  ValueType.NUMBERS_2_12,
                  null
                )}
                onCellClick={onCellClick}
                topMin={undefined}
                topMax={undefined}
              />
              <td></td>
              <ChipComponent
                currentItemChips={currentItemChips_3_12}
                tdKey={"td_other_3_12"}
                chipKey={"chip_other_3_12"}
                cell={other_3_12}
                rowSpan={1}
                colSpan={7}
                leftMin={70}
                leftMax={140}
                cellClass={getClassNamesFromCellItemType(
                  ValueType.NUMBERS_3_12,
                  null
                )}
                onCellClick={onCellClick}
                topMin={undefined}
                topMax={undefined}
              />
            </tr>
            <tr>
              <td colSpan={2}></td>
              <ChipComponent
                currentItemChips={currentItemChips_1_18}
                tdKey={"td_other_1_18"}
                chipKey={"chip_other_1_18"}
                cell={other_1_18}
                rowSpan={1}
                colSpan={3}
                leftMin={30}
                leftMax={60}
                cellClass={getClassNamesFromCellItemType(
                  ValueType.NUMBERS_1_18,
                  null
                )}
                onCellClick={onCellClick}
                topMin={undefined}
                topMax={undefined}
              />
              <td></td>
              <ChipComponent
                currentItemChips={currentItemChips_even}
                tdKey={"td_other_even"}
                chipKey={"chip_other_even"}
                cell={other_even}
                rowSpan={1}
                colSpan={3}
                leftMin={30}
                leftMax={60}
                cellClass={getClassNamesFromCellItemType(ValueType.EVEN, null)}
                onCellClick={onCellClick}
                topMin={undefined}
                topMax={undefined}
              />
              <td></td>
              <ChipComponent
                currentItemChips={currentItemChips_red}
                tdKey={"td_other_red"}
                chipKey={"chip_other_red"}
                cell={other_red}
                rowSpan={1}
                colSpan={3}
                leftMin={30}
                leftMax={60}
                cellClass={getClassNamesFromCellItemType(ValueType.RED, null)}
                onCellClick={onCellClick}
                topMin={undefined}
                topMax={undefined}
              />
              <td></td>
              <ChipComponent
                currentItemChips={currentItemChips_black}
                tdKey={"td_other_black"}
                chipKey={"chip_other_black"}
                cell={other_black}
                rowSpan={1}
                colSpan={3}
                leftMin={30}
                leftMax={60}
                cellClass={getClassNamesFromCellItemType(ValueType.BLACK, null)}
                onCellClick={onCellClick}
                topMin={undefined}
                topMax={undefined}
              />
              <td></td>
              <ChipComponent
                currentItemChips={currentItemChips_odd}
                tdKey={"td_other_odd"}
                chipKey={"chip_other_odd"}
                cell={other_odd}
                rowSpan={1}
                colSpan={3}
                leftMin={30}
                leftMax={60}
                cellClass={getClassNamesFromCellItemType(ValueType.ODD, null)}
                onCellClick={onCellClick}
                topMin={undefined}
                topMax={undefined}
              />
              <td></td>
              <ChipComponent
                currentItemChips={currentItemChips_19_36}
                tdKey={"td_other_19_36"}
                chipKey={"chip_other_19_36"}
                cell={other_19_36}
                rowSpan={1}
                colSpan={3}
                leftMin={30}
                leftMax={60}
                cellClass={getClassNamesFromCellItemType(
                  ValueType.NUMBERS_19_36,
                  null
                )}
                onCellClick={onCellClick}
                topMin={undefined}
                topMax={undefined}
              />
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Board;
