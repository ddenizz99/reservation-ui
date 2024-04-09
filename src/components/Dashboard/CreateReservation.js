import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";

const CreateReservation = () => {

    const handleComplete = () => {
        console.log("Form completed!");
        // Handle form completion logic here
    };
    const tabChanged = ({
        prevIndex,
        nextIndex,
    }) => {
        console.log("prevIndex", prevIndex);
        console.log("nextIndex", nextIndex);
    };

    return (
        <div>
            <FormWizard
                onComplete={handleComplete}
                onTabChange={tabChanged}
            >
                <FormWizard.TabContent title="Müşteri Bilgileri" icon="ti-user">

                <h3>First Tab</h3>
                <p>Some content for the first tab</p>
                </FormWizard.TabContent>
                <FormWizard.TabContent title="Rezervasyon Bilgileri" icon="ti-settings">
                <h3>Second Tab</h3>
                <p>Some content for the second tab</p>
                </FormWizard.TabContent>
                <FormWizard.TabContent title="Tarih/Saat" icon="ti-check">
                <h3>Last Tab</h3>
                <p>Some content for the last tab</p>
                </FormWizard.TabContent>
            </FormWizard>
            {/* add style */}
            <style>{`
                @import url("https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css");
            `}</style>
        </div>
    );
}
  

export default CreateReservation;