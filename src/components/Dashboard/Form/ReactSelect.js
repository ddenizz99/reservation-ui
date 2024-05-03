import { useEffect, useState } from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { getByRestaurantId } from "../../../services/CustomerService";
import { FaPhoneAlt } from "react-icons/fa";

export default function ReactSelect({ setIsOpenCustomerCreation, setNewCustomerName, options, setOptions, value, setFieldValue }) {

  const [customerData, setCustomerData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
                //setError(result.message);
            }
        }).catch(result => {
            setIsLoading(false);
            setError(String(result));
        });
    };

    fetchCustomerData();
}, []);

    const handleCreate = (inputValue) => {
        setNewCustomerName(inputValue);
        setIsOpenCustomerCreation(true); // Kayıt formunu aç
        setFieldValue('customer_id', '')
    };
    
    const filterColors = (inputValue) => {
      setOptions([]);
      let filterData = customerData.filter(person =>
          person.full_name.toLowerCase().includes(inputValue.toLowerCase()) ||
          person.phone.includes(inputValue) ||
          person.email.toLowerCase().includes(inputValue.toLowerCase())
      );

      var newOptions = [];
      filterData.forEach((item) => {
        newOptions.push({ value: item.id, label: <div>{item.full_name}<br/><FaPhoneAlt style={{margin:3}}/>{item.phone}<br/>{item.email}</div>});
      });
      setOptions(newOptions);
      return newOptions;
    };
    
    const promiseOptions = (inputValue) =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(filterColors(inputValue));
        }, 1000);
      });

  return (
    <AsyncCreatableSelect
          //cacheOptions
          //defaultOptions
          onCreateOption={handleCreate}
          loadOptions={promiseOptions}
          placeholder={error ?? "Yeni misafir ekleyebilir veya mevcut misafirlerden seçebilirsiniz."}
          isDisabled={error}
          closeMenuOnScroll
          value={options.find(option => option.value === value)}
          onChange={option => setFieldValue('customer_id', option.value)}
          loadingMessage={() => "Yükleniyor..."}
          formatCreateLabel={(inputValue) => `Yeni müşteri ekle: "${inputValue}"`}
      />  
  );
}