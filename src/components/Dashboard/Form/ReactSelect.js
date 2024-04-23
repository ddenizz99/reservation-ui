import AsyncCreatableSelect from 'react-select/async-creatable';

export default function ReactSelect({ setIsOpenCustomerCreation, setNewCustomerName }) {

    const handleCreate = (inputValue) => {
        // Yeni seçenek oluşturulduğunda bu fonksiyon tetiklenir
        console.log("Yeni öğe oluşturuldu:", inputValue);
        setNewCustomerName(inputValue);
        setIsOpenCustomerCreation(true); // Kayıt formunu aç
    };

    const options = [
        { value: 'Ali Kaya', label: 'Ali Kaya' },
        { value: 'Mehmet Ata', label: 'Mehmet Ata' },
        { value: 'Aslı Korkmaz', label: 'Aslı Korkmaz' },
      ];
    
    const filterColors = (inputValue) => {
      return options.filter((i) =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
      );
    };
    
    const promiseOptions = (inputValue) =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(filterColors(inputValue));
        }, 1000);
      });

  return (
    <AsyncCreatableSelect
          cacheOptions
          defaultOptions
          onCreateOption={handleCreate}
          loadOptions={promiseOptions}
          placeholder="Yeni misafir ekleyebilir veya mevcut misafirlerden seçebilirsiniz."
          closeMenuOnScroll
          loadingMessage={() => "Yükleniyor..."}
          formatCreateLabel={(inputValue) => `Yeni müşteri ekle: "${inputValue}"`}
      />  
  );
}