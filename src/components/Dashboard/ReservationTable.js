import DataTable, { createTheme } from 'react-data-table-component';
import { useSelector } from 'react-redux';
import LoadingIndicator from './LoadingIndicator';
import { FaClockRotateLeft } from "react-icons/fa6";
import { FaPhoneAlt, FaMoon, FaCheck, FaCalendarAlt, FaWindowClose } from "react-icons/fa";
import { MdWbSunny, MdClose } from "react-icons/md";
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

const ReservationTable = ({data, isLoading, error, setModalItemId, setChangeReservationShow, setChangeReservationDateTimeShow, setChangeReservationAreaShow, setChangeReservationNumberOfPeopleShow, setChangeReservationInfoShow}) => {

    const themeR = useSelector((state) => state.theme.theme);
    const columns = [
        {
          name: 'Durum',
          selector: row => row.status,
          sortable: true,
          cell: row => <div onClick={() => {setChangeReservationShow(true); setModalItemId(row.reservation_id);}}><CustomStatus row={row} /></div>
        },
        {
          name: 'Alan',
          selector: row => row.location_name,
          sortable: true,
          cell: row => <div style={{cursor:'pointer'}} onClick={() => {setModalItemId(row.reservation_id); setChangeReservationAreaShow(true);}}>{row.location_name}</div>
        },
        {
          name: 'Saat',
          selector: row => row.time,
          sortable: true,
          cell: row => <div style={{cursor:'pointer'}} onClick={() => {setChangeReservationDateTimeShow(true); setModalItemId(row.reservation_id);}}><CustomTime row={row} /></div>,
        },
        {
          name: 'Kişi',
          selector: row => row.number_of_people,
          sortable: true,
          cell: row => <div style={{cursor:'pointer'}} onClick={() => {setModalItemId(row.reservation_id); setChangeReservationNumberOfPeopleShow(true);}}>{row.number_of_people}</div>
        },
        {
          name: 'Müşteri',
          selector: row => row.customer_name,
          sortable: true,
          cell: row => <div style={{cursor:'pointer'}} onClick={() => {setModalItemId(row.reservation_id); setChangeReservationInfoShow(true);}}><CustomCustomer row={row} /></div>
        },
        {
          name: 'Kayıt Zamanı',
          selector: row => row.created_at,
          sortable: true,
          cell: row => <div style={{cursor:'pointer'}} onClick={() => {setModalItemId(row.reservation_id); setChangeReservationInfoShow(true);}}><CustomAddedUser row={row} /></div>,
          id: 'createdAt'
        }
    ];   
    
    createTheme('solarized', {
        text: {
          primary: '#ffffff',
          secondary: '#2aa198',
        },
        background: {
          default: '#002b36',
        },
        context: {
          background: '#cb4b16',
          text: '#FFFFFF',
        },
        divider: {
          default: '#073642',
        },
        action: {
          button: 'rgba(0,0,0,.54)',
          hover: 'rgba(0,0,0,.08)',
          disabled: 'rgba(0,0,0,.12)',
        },
      }, 'dark');

      const CustomCustomer = ({ row }) => (
        <div>{row.customer_name}<br/><a href={`tel:${row.customer_telephone_code + row.customer_phone}`}><FaPhoneAlt style={{marginRight:3}}/>{row.customer_phone}</a></div>
      );

      const CustomAddedUser = ({ row }) => (
        <div>{dateTr(row.created_at)}<br/>{row.added_user}</div>
      );

      const CustomTime = ({ row }) => (
        <div>{formatTimeWithPeriod(row.time)}<br/>{timeTr(row.time)}</div>
      );

      const CustomStatus = ({ row }) => (
        <div>{getStatusIcon(row.reservation_id, row.status)}</div>
      );

      const dateTr = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'});
      };

      const timeTr = (timeString) => {
        return timeString.slice(0, -3);
      };


      function formatTimeWithPeriod(timeString) {
        // Saat bilgisini saat, dakika ve saniye olarak parçalara ayır
        const parts = timeString.split(':');
        const hour = parseInt(parts[0], 10); // Saat bilgisini sayıya çevir
      
        // 12'yi karşılaştırarak öğleden önce veya sonra belirle
        if (hour < 17) {
          return <MdWbSunny style={{color:'#dcc928', fontSize:30}} />; // 12'den küçükse öğleden önce
        } else {
          return <FaMoon style={{fontSize:25}} />; // Aksi halde öğleden sonra
        }
      }

      function getStatusIcon(id, status) {
        switch (status) {
          case '3':
            return <>
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip id={`button-tooltip-${id}`}>Onay Bekliyor</Tooltip>}
              >
                <span>
                  <FaClockRotateLeft style={{color:'#b94a48', margin:20, fontSize:30, cursor:'pointer'}} />
                </span>
              </OverlayTrigger>
            </>;
          case '2':
            return <>
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip id={`button-tooltip-${id}`}>Konfirme</Tooltip>}
            >
              <span>
                <FaCheck style={{color:'#468847', margin:20, fontSize:30, cursor:'pointer'}} />
              </span>
            </OverlayTrigger>
          </>;

          case '7':
            return <>
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip id={`button-tooltip-${id}`}>Geç Konfirme</Tooltip>}
            >
              <span>
                <FaCheck style={{color:'#b94a48', margin:20, fontSize:30, cursor:'pointer'}} />
              </span>
            </OverlayTrigger>
          </>;

          case '5':
            return <>
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip id={`button-tooltip-${id}`}>İptal Edildi</Tooltip>}
            >
              <span>
                <FaWindowClose style={{color:'#b94a48', margin:20, fontSize:30, cursor:'pointer'}} />
              </span>
            </OverlayTrigger>
          </>;

          case '6':
            return <>
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip id={`button-tooltip-${id}`}>Rezervasyon</Tooltip>}
            >
              <span>
                <FaCalendarAlt style={{color:'#c09853', margin:20, fontSize:30, cursor:'pointer'}} />
              </span>
            </OverlayTrigger>
          </>;
          
          default:
            return 'Tanımlanamayan ikon.';
        }
      }

    return (
        <div>
            <DataTable
                className='radius-15'
                columns={columns}
                data={data}
                progressPending={isLoading}
                theme={themeR === 'dark-theme' ? "solarized" : "" }
                progressComponent={<LoadingIndicator padding="p-5" />}
                noDataComponent={<div className='mt-3 mb-3 p-4 text-bold'>{error}</div>}
                defaultSortFieldId="createdAt"
                defaultSortAsc={false}
            />
        </div>
    );
}
  

export default ReservationTable;