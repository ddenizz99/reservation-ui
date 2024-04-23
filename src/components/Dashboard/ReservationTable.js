import DataTable, { createTheme } from 'react-data-table-component';
import { useSelector } from 'react-redux';
import LoadingIndicator from './LoadingIndicator';

const ReservationTable = ({data, isLoading}) => {

    const themeR = useSelector((state) => state.theme.theme);
    const columns = [
        {
          name: 'Durum',
          selector: row => row.status,
          sortable: true
        },
        {
          name: 'Alan',
          selector: row => row.location_name,
          sortable: true
        },
        {
          name: 'Saat',
          selector: row => row.time,
          sortable: true
        },
        {
          name: 'Müşteri',
          selector: row => row.customer_name,
          sortable: true,
          cell: row => <CustomCustomer row={row} />
        },
        {
          name: 'Kişi',
          selector: row => row.number_of_people,
          sortable: true
        },
        {
          name: 'Kayıt Zamanı',
          selector: row => row.created_at,
          sortable: true,
          cell: row => <CustomAddedUser row={row} />,
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
        <div>{row.customer_name}<br/>{row.customer_phone}</div>
      );

      const CustomAddedUser = ({ row }) => (
        <div>{row.created_at}<br/>{row.added_user}</div>
      );

    return (
        <div>
            <DataTable
                className='radius-15'
                columns={columns}
                data={data}
                progressPending={isLoading}
                theme={themeR === 'dark-theme' ? "solarized" : "" }
                progressComponent={<LoadingIndicator padding="p-5" />}
            />
        </div>
    );
}
  

export default ReservationTable;