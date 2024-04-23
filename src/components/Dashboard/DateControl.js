import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { tr } from 'date-fns/locale/tr';
registerLocale('tr', tr)

const DateControl = ({ date, setDate}) => {

    const today = new Date();

    const handlePrevDate = () => {
        const previousDate = new Date(date);
        previousDate.setDate(date.getDate() - 1);
        setDate(previousDate);
    };

    const handleNextDate = () => {
        const nextDate = new Date(date);
        nextDate.setDate(date.getDate() + 1);

        // Eğer sonraki tarih bugünden ileri bir tarihe denk geliyorsa, işlem yapılmasın
        if (nextDate > today) {
            alert("Sonraki tarih, bugünden ileri bir tarihe denk geliyor. İşlem yapılmadı.");
        } else {
            // Sonraki tarih bugünden ileri değilse, istediğiniz işlemi yapabilirsiniz.
            setDate(nextDate);
        }    
    };

  return (
    <div className="btn-group m-1" role="group" aria-label="Basic example">
      <button type="button" className="btn btn-secondary" onClick={handlePrevDate}>
        <i className="bx bx-left-arrow-alt me-1"></i>
      </button>
      <DatePicker
        locale="tr"
        selected={date}
        onChange={(date) => setDate(date)}
        dateFormat="yyyy-MM-dd"
        maxDate={today}
        customInput={<button type="button" className="btn btn-secondary"><i className="bx bx-calendar me-1"></i></button>}
      />
      <button type="button" className="btn btn-secondary" onClick={handleNextDate}>
        <i className="bx bx-right-arrow-alt me-1"></i>
      </button>
      <button type="button" className="btn btn-secondary" onClick={() => setDate(today)}><i className="bx bx-refresh me-1"></i></button>
    </div>
  );
};

export default DateControl;