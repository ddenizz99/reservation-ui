import { useState } from "react";
import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";

function Blank() {

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleComplete = () => {
    console.log('Form tamamlandı!');
  };

  const handleTabChange = (newIndex) => {
    setActiveTabIndex(newIndex);
  };

  const tabChanged = ({
    prevIndex,
    nextIndex,
  }) => {
    console.log("prevIndex", prevIndex);
    console.log("nextIndex", nextIndex);
    setActiveTabIndex(prevIndex + 1);
  };

  const nextTab = () => {
    setActiveTabIndex(current => Math.min(current + 1, 2)); // 2, son sekmenin indexi olmalı
  };

  const previousTab = () => {
    setActiveTabIndex(current => Math.max(current - 1, 0));
  };
    return (
      <div>
        <FormWizard
        onComplete={handleComplete}
        onTabChange={tabChanged}
        startIndex={activeTabIndex}
      >
        <FormWizard.TabContent title="Müşteri Bilgileri" icon="ti-user">

<h3>First Tab</h3>
<p>Some content for the first tab</p>
</FormWizard.TabContent>
<FormWizard.TabContent title="Rezervasyon Bilgileri" icon="ti-settings">
<h3>Second Tab</h3>
<p>Some content for the second tab</p>
</FormWizard.TabContent>
        {/* Sekme içeriği */}
      </FormWizard>
      <button onClick={previousTab} disabled={activeTabIndex === 0}>Geri</button>
      <button onClick={nextTab} disabled={activeTabIndex === 2}>İleri</button>
      </div>
    );
  }
  
  export default Blank;
  