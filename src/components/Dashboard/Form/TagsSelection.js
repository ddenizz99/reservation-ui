import { useState, useEffect  } from 'react';
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();
const defaultOptions = [
    { value: 'Açık Alan', label: 'Açık Alan' },
    { value: 'Bahçe', label: 'Bahçe' },
    { value: 'Bar', label: 'Bar' },
    { value: 'Blogger', label: 'Blogger' },
    { value: 'Cam Kenarı', label: 'Cam Kenarı' },
    { value: 'Çalışan', label: 'Çalışan' },
    { value: 'Çalışan Arkadaşı', label: 'Çalışan Arkadaşı' },
    { value: 'Doğum Günü', label: 'Doğum Günü' },
    { value: 'Erken Rezervasyon', label: 'Erken Rezervasyon' },
    { value: 'Etkinlik', label: 'Etkinlik' },
    { value: 'Evlilik Teklifi', label: 'Evlilik Teklifi' },
    { value: 'Glütensiz', label: 'Glütensiz' },
    { value: 'Instagram Fenomeni', label: 'Instagram Fenomeni' },
    { value: 'İş Yemeği', label: 'İş Yemeği' },
    { value: 'İyi Yer', label: 'İyi Yer' },
    { value: 'Kapalı Alan', label: 'Kapalı Alan' },
    { value: 'Kırmızı Et Yok', label: 'Kırmızı Et Yok' },
    { value: 'Kutlama', label: 'Kutlama' },
    { value: 'Mezuniyet', label: 'Mezuniyet' },
    { value: 'Modacı', label: 'Modacı' },
    { value: 'Özel Masa İsteği', label: 'Özel Masa İsteği' },
    { value: 'Pesketaryen', label: 'Pesketaryen' },
    { value: 'Sahibinin Arkadaşı', label: 'Sahibinin Arkadaşı' },
    { value: 'Sessiz Masa', label: 'Sessiz Masa' },
    { value: 'Sigara İçilen Bölüm', label: 'Sigara İçilen Bölüm' },
    { value: 'Sigara İçilmeyen Bölüm', label: 'Sigara İçilmeyen Bölüm' },
    { value: 'Tekerlekli Sandalye', label: 'Tekerlekli Sandalye' },
    { value: 'Teras', label: 'Teras' },
    { value: 'Ücretsiz', label: 'Ücretsiz' },
    { value: 'Vegan', label: 'Vegan' },
    { value: 'Vejeteryan', label: 'Vejeteryan' },
    { value: 'VIP', label: 'VIP' },
    { value: 'Yatırımcı', label: 'Yatırımcı' },
    { value: 'Yıl Dönümü', label: 'Yıl Dönümü' },
    { value: 'YouTube Fenomeni', label: 'YouTube Fenomeni' },
    { value: 'Yuvarlak Masa', label: 'Yuvarlak Masa' }
];



export default function TagsSelection({value, setFieldValue}) {

    const [options, setOptions] = useState(defaultOptions);
    const [selectedOptions, setSelectedOptions] = useState([]);

    // Yeni bir öğe eklendiğinde hem options hem de seçilenler listesi güncellenir
    const handleCreate = (inputValue) => {
        const newValue = { value: inputValue, label: inputValue };
        setOptions([...options, newValue]); // Options güncelle
        setSelectedOptions(prev => [...prev, newValue]); // Otomatik olarak seçilenlere ekle
    };

    useEffect(() => {
        if (selectedOptions.length === 0) {
            setSelectedOptions(value);
        }else{
            setFieldValue('tags', selectedOptions, false);
        }
    }, [selectedOptions, value, setFieldValue]);

    return (
        <CreatableSelect
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={options}
            value={selectedOptions}
            onChange={setSelectedOptions}
            placeholder="Birden fazla etiket seçebilir veya yeni ekleyebilirsiniz.."
            formatCreateLabel={(inputValue) => `Yeni etiket ekle: "${inputValue}"`}
            onCreateOption={handleCreate} // Yeni öğe ekleme fonksiyonu
        />
    );
}
