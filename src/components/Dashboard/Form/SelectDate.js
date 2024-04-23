import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { tr } from 'date-fns/locale/tr';
import { useState } from "react";
registerLocale('tr', tr)

const SelectDate = ({value, setFieldValue}) => {

    const [ date, setDate ] = useState(new Date(value));
    const today = new Date();

    const handlePrevDate = () => {
        const previousDate = new Date(date);
        previousDate.setDate(date.getDate() - 1);

        if (previousDate < today) {
            alert("Önceki tarih, bugünden önce bir tarihe denk geliyor. İşlem yapılmadı.");
        } else {
            setDate(previousDate);
            setFieldValue('date', previousDate, false);
        }    
        
    };

    const handleNextDate = () => {
        const nextDate = new Date(date);
        nextDate.setDate(date.getDate() + 1);
        setDate(nextDate);
        setFieldValue('date', nextDate, false);
    };

    const dateTr = () => {
        return date.toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric', weekday: 'long' });
    };

  return (
    <div className="row">
        <div className="col-md-6 breadcrumb-title pe-3">{dateTr()}</div>
        <div className="col-md-6">
            <div className="btn-group m-1" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-secondary" onClick={handlePrevDate}>
                    <i className="bx bx-left-arrow-alt me-1"></i>
                </button>
                <DatePicker
                    locale="tr"
                    selected={date}
                    onChange={(date) => {setDate(date); setFieldValue('date', date, false);}}
                    dateFormat="yyyy-MM-dd"
                    minDate={today}
                    customInput={<button type="button" className="btn btn-secondary"><i className="bx bx-calendar me-1"></i></button>}
                />
                <button type="button" className="btn btn-secondary" onClick={handleNextDate}>
                    <i className="bx bx-right-arrow-alt me-1"></i>
                </button>
            </div>
        </div>

    </div>
  );
};

export default SelectDate;