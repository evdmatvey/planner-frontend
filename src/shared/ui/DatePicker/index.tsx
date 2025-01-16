import { useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { ru } from 'react-day-picker/locale';
import { getDateFromString } from '@/shared/lib/getDateFromString';
import { usePopup } from '@/shared/lib/usePopup';
import { ClockIcon } from '../icons/ClockIcon';
import styles from './DatePicker.module.css';
import 'react-day-picker/style.css';

interface DatePickerProps {
  date: string;
  onChange: (date: string) => void;
}

export const DatePicker = ({ date, onChange }: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    getDateFromString(date),
  );

  const ref = useRef<HTMLDivElement>(null);
  const { isOpen, togglePopupHandler } = usePopup(ref);

  const dateSelectHandler = (selectedDate: Date | undefined) => {
    const isoSelectedDate = selectedDate?.toISOString();

    setSelectedDate(selectedDate);

    if (isoSelectedDate) {
      onChange(isoSelectedDate);
      togglePopupHandler();
    } else {
      onChange('');
    }
  };

  return (
    <div className={styles.root} ref={ref}>
      <button className={styles.title} onClick={togglePopupHandler}>
        <ClockIcon />
        {date}
      </button>
      {isOpen && (
        <div className={styles.picker}>
          <DayPicker
            mode="single"
            selected={selectedDate}
            weekStartsOn={1}
            onSelect={dateSelectHandler}
            autoFocus={isOpen}
            locale={ru}
          />
        </div>
      )}
    </div>
  );
};
