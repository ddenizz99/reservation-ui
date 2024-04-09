import DataTable, { createTheme } from 'react-data-table-component';
import { useSelector } from 'react-redux';
import LoadingIndicator from './LoadingIndicator';

const ReservationTable = ({data, isLoading}) => {

    const themeR = useSelector((state) => state.theme.theme);
    const columns = [
        {
        name: 'Title',
        selector: row => row.title,
        sortable: true,
        },
        {
        name: 'Year',
        selector: row => row.year,
        sortable: true,
        },
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

    return (
        <div>
            <DataTable
                className='radius-15'
                columns={columns}
                data={data}
                progressPending={isLoading}
                selectableRows
                theme={themeR === 'dark-theme' ? "solarized" : "" }
                progressComponent={<LoadingIndicator padding="p-5" />}
            />
        </div>
    );
}
  

export default ReservationTable;