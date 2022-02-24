import React, { useState } from "react";
import "./Calendar.css";
import moment from "moment";
import { BackButton } from "./BackButton";
import { ForwardButton } from "./ForwardButton";

const Calendar = () => {
  const weekdayshort = moment.weekdaysShort();
  const [currentDate, setCurrentDate] = useState(moment());

  const firstDayofMonth = currentDate.clone().startOf("month").format("d");

  const blanks = []; //blank days that intervene from last or coming month days
  for (let i = 0; i < firstDayofMonth; i++) {
    blanks.push(<td className="empty_day"></td>);
  }

  let daysInMonth = []; //displays each individual day
  for (let d = 1; d <= currentDate.daysInMonth(); d++) {
    const highlightToday =
      d === currentDate.date() &&
      currentDate.month() === moment().month() &&
      currentDate.year() === moment().year()
        ? "highlightedDay"
        : "";
    daysInMonth.push(
      <td key={d} className={`calendar_day ${highlightToday}`}>
        <div className="calendar_num">{d}</div>
      </td>
    );
  }

  const totalSlots = [...blanks, ...daysInMonth];
  const rows = [];
  let cells = [];

  totalSlots.forEach((row, i) => {
    if (i % 7 !== 0 || i === 0) {
      cells.push(row); // if index does not equal 7 it will move to the next week
    } else {
      rows.push(cells); // when it reaches 7 cells it takes that array of cells and adds it to the array of weeks
      cells = []; // empty container
      cells.push(row); // in current loop we still push current row to new container
    }
    if (i === totalSlots.length - 1) {
      // when loop ends we add remaining date
      rows.push(cells);
    }
  });

  const years = [];
  for (let year = 1980; year <= 2040; year++) {
    years.push(year);
  }

  return (
    <>
      <div className="monthCont">
        <div>
          <BackButton
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
          />
        </div>
        <div>
          <select
            className="dropDownNav"
            onChange={(e) => {
              const index = e.target.value;
              const newCurrentDate = currentDate.clone();
              newCurrentDate.month(index);
              setCurrentDate(newCurrentDate);
            }}
          >
            {moment.months().map((month, index) => {
              const isSelected = currentDate.month() === index;
              return (
                <option selected={isSelected} value={index}>
                  {month}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <select
            className="dropDownNav"
            onChange={(e) => {
              const newCurrentDate = currentDate.clone();
              newCurrentDate.year(e.target.value);
              setCurrentDate(newCurrentDate);
            }}
          >
            {years.map((year) => {
              const isSelected = currentDate.year() === year;
              return (
                <option selected={isSelected} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>
        <ForwardButton
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
      </div>
      <div className="calendar_container">
        <table className="calendar_background">
          <tr>
            {weekdayshort.map((day) => {
              return (
                <th key={day} className="daysOfWeek">
                  {day}
                </th>
              );
            })}
          </tr>
          {rows.map((row) => {
            return <tr className="calendar_rows">{row}</tr>;
          })}
        </table>
      </div>
    </>
  );
};

export default Calendar;
