import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";

import { useState } from "react";
import DatePicker from "react-date-picker";
import { Button } from "./Form";

type Props = {
  onSubmit: (start: Date, end: Date) => void;
  onClear: () => void;
};

const DateRangePicker = ({ onSubmit, onClear }: Props) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  return (
    <div className="flex left-0 gap-5">
      <div className="flex gap-2 items-center">
        <p>Start date:</p>
        <DatePicker
          onChange={(value) => setStartDate(value || (new Date() as any))}
          value={startDate}
        />
      </div>

      <div className="flex gap-2 items-center">
        <p>End date:</p>
        <DatePicker
          onChange={(value) => setEndDate(value || (new Date() as any))}
          value={endDate}
        />
      </div>

      <Button className="w-max" onClick={() => onSubmit(startDate, endDate)}>
        Search
      </Button>
      <Button
        className="w-max"
        onClick={() => {
          setStartDate(new Date());
          setEndDate(new Date());
          onClear();
        }}
      >
        Clear filters
      </Button>
    </div>
  );
};

export default DateRangePicker;
