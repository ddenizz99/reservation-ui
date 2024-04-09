import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateControl = ({ tarih, setTarih}) => {

    const bugun = new Date();

    const handlePrevDate = () => {
        const oncekiTarih = new Date(tarih);
        oncekiTarih.setDate(tarih.getDate() - 1);
        setTarih(oncekiTarih);
    };

    const handleNextDate = () => {
        const sonrakiTarih = new Date(tarih);
        sonrakiTarih.setDate(tarih.getDate() + 1);

        // Eğer sonraki tarih bugünden ileri bir tarihe denk geliyorsa, işlem yapılmasın
        if (sonrakiTarih > bugun) {
            alert("Sonraki tarih, bugünden ileri bir tarihe denk geliyor. İşlem yapılmadı.");
        } else {
            // Sonraki tarih bugünden ileri değilse, istediğiniz işlemi yapabilirsiniz.
            setTarih(sonrakiTarih);
        }    
    };

  return (
    <div className="btn-group m-1" role="group" aria-label="Basic example">
      <button type="button" className="btn btn-secondary" onClick={handlePrevDate}>
        <i className="bx bx-left-arrow-alt me-1"></i>
      </button>
      <DatePicker
        selected={tarih}
        onChange={(date) => setTarih(date)}
        dateFormat="yyyy-MM-dd"
        maxDate={bugun}
        customInput={<button type="button" className="btn btn-secondary"><i className="bx bx-calendar me-1"></i></button>}
      />
      <button type="button" className="btn btn-secondary" onClick={handleNextDate}>
        <i className="bx bx-right-arrow-alt me-1"></i>
      </button>
    </div>
  );
};

export default DateControl;