import DataTable, { createTheme } from 'react-data-table-component';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoadingIndicator from '../../components/Dashboard/LoadingIndicator';
import { useEffect, useState } from 'react';
import { getByRestaurantId } from '../../services/CustomerService';
import InfoCard from '../../components/Dashboard/InfoCard';

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
            sortable: true,
            cell: row => <NavLink to={`/customer/detail/${row.id}`}>{row.id}</NavLink>
        },
        {
          name: 'Ad Soyad',
          selector: row => row.full_name,
          sortable: true,
          cell: row => <NavLink to={`/customer/detail/${row.id}`}>{row.full_name}</NavLink>
        },
        {
          name: 'Telefon',
          selector: row => row.phone,
          sortable: true,
          cell: row => <NavLink to={`/customer/detail/${row.id}`}>{row.phone}</NavLink>
        },
        {
          name: 'E-posta',
          selector: row => row.email,
          sortable: true,
          cell: row => <NavLink to={`/customer/detail/${row.id}`}>{row.email}</NavLink>
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

    const countVip = () => {
        var result = customerData.reduce(function (acc, cur) {
            return cur.vip === '1' ? acc + 1 : acc;
        }, 0);
        return result;
    }

    const countLevel = (level) => {
      var result = customerData.reduce(function (acc, cur) {
          return cur.level_id == level ? acc + 1 : acc;
      }, 0);
      return result;
  }

    return (
        <div className="row">
            <div className="col-12 col-lg-4">
                <InfoCard
                    title="Misafir"
                    value={customerData.length}
                    icon="bx-user"
                    backGround="voilet"
                    isLoading={isLoading}
                />
            </div>
            <div className="col-12 col-lg-4">
                <InfoCard
                    title="VIP"
                    value={countVip()}
                    icon="bx-shield-alt-2"
                    backGround="rose"
                    isLoading={isLoading}
                />
            </div>
            <div className="col-12 col-lg-4">
                <InfoCard
                    title="Şirket"
                    value={2}
                    icon="bx-buildings"
                    backGround="sunset"
                    isLoading={isLoading}
                />
            </div>
            <div className="col-12">
              <h4>Listelere Göre Dağılım</h4>
              <hr/>
              <div className='row mt-3'>
                <div className="col-lg-3">
                  <InfoCard
                      title="Büyük Harcama"
                      value={countLevel(1)}
                      icon="bx-star"
                      backGround="sunset"
                      isLoading={isLoading}
                  />
                </div>
                <div className="col-lg-3">
                  <InfoCard
                      title="İyi Harcama"
                      value={countLevel(2)}
                      icon="bx-star"
                      backGround="sunset"
                      isLoading={isLoading}
                  />
                </div>
                <div className="col-lg-3">
                  <InfoCard
                      title="Düşük Harcama"
                      value={countLevel(3)}
                      icon="bx-star"
                      backGround="sunset"
                      isLoading={isLoading}
                  />
                </div>
                <div className="col-lg-3">
                  <InfoCard
                      title="Normal Müşteri"
                      value={countLevel(4)}
                      icon="bx-star"
                      backGround="sunset"
                      isLoading={isLoading}
                  />
                </div>
                <div className="col-lg-3">
                  <InfoCard
                      title="Potansiyel Müşteri"
                      value={countLevel(5)}
                      icon="bx-star"
                      backGround="sunset"
                      isLoading={isLoading}
                  />
                </div>
                <div className="col-lg-3">
                  <InfoCard
                      title="Kara Liste"
                      value={countLevel(6)}
                      icon="bx-block"
                      backGround="secondary"
                      isLoading={isLoading}
                  />
                </div>
                <div className="col-lg-3">
                  <InfoCard
                      title="Kayıp Müşteri"
                      value={countLevel(7)}
                      icon="bx-block"
                      backGround="secondary"
                      isLoading={isLoading}
                  />
                </div>
              </div>
            </div>
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