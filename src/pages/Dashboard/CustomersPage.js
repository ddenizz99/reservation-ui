import DataTable, { createTheme } from 'react-data-table-component';
import { useSelector } from 'react-redux';
import LoadingIndicator from '../../components/Dashboard/LoadingIndicator';
import { useEffect, useState } from 'react';
import { getByRestaurantId } from '../../services/CustomerService';

function CustomersPage() {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [customerData, setCustomerData] = useState([]);

    useEffect(() => {
        const fetchCustomerData = async () => {
            setIsLoading(true);
            setError(null);
            await getByRestaurantId()
            .then(result => {
                if(result.success){
                    setCustomerData(result.data);
                    setIsLoading(false);
                }else{
                    setIsLoading(false);
                    setError(result.message);
                }
            }).catch(result => {
                setIsLoading(false);
                setError(String(result));
            });
        };
    
        fetchCustomerData();
    }, []);

    const themeR = useSelector((state) => state.theme.theme);
    const columns = [
        {
            name: 'No',
            selector: row => row.id,
            sortable: true
        },
        {
          name: 'Ad Soyad',
          selector: row => row.full_name,
          sortable: true
        },
        {
          name: 'Telefon',
          selector: row => row.phone,
          sortable: true
        },
        {
          name: 'E-posta',
          selector: row => row.email,
          sortable: true
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

    return (
        <div className="row">
            <div className="col-12">
                <div className="card radius-15">
                    <div className="card-body">
                        <DataTable
                            className='radius-15'
                            columns={columns}
                            data={customerData}
                            progressPending={isLoading}
                            theme={themeR === 'dark-theme' ? "solarized" : "" }
                            progressComponent={<LoadingIndicator padding="p-5" />}
                            noDataComponent={<div className='mt-3 mb-3 p-4 text-bold'>{error}</div>}
                            defaultSortFieldId="createdAt"
                            defaultSortAsc={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );

}

export default CustomersPage;