import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../store/themeStore';

function Switcher() {

    const themeR = useSelector((state) => state.theme.theme);


    const dispatch = useDispatch();

    const themeCostimizeHandle = (e) => {
        switch (e.target.id) {
            case 'darkmode':
                dispatch(setTheme("dark-theme"));
                break;

            case 'lightmode':
                dispatch(setTheme("light-theme"));
                break;

            case 'darksidebar':
                dispatch(setTheme("dark-sidebar"));
                break;
        
            default:
                break;
        }
    }

    
    return (

        <div>
            {/*start switcher*/}
            <div className="switcher-body">
            <button className="btn btn-primary btn-switcher shadow-sm" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"><i className="bx bx-cog bx-spin" /></button>
            <div className="offcanvas offcanvas-end shadow border-start-0 p-2" data-bs-scroll="true" data-bs-backdrop="false" tabIndex={-1} id="offcanvasScrolling">
                <div className="offcanvas-header border-bottom">
                <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Tema Özelleştirici</h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" />
                </div>
                <div className="offcanvas-body">
                <h6 className="mb-0">Tema Varyasyonu</h6>
                <hr />
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="lightmode" onClick={themeCostimizeHandle} defaultValue="option1" defaultChecked={themeR === "light-theme" ? true : false} />
                    <label className="form-check-label" htmlFor="lightmode">Açık</label>
                </div>
                <hr />
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="darkmode" onClick={themeCostimizeHandle} defaultValue="option2" defaultChecked={themeR === "dark-theme" ? true : false} />
                    <label className="form-check-label" htmlFor="darkmode">Karanlık</label>
                </div>
                <hr />
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="darksidebar" onClick={themeCostimizeHandle} defaultValue="option3" defaultChecked={themeR === "dark-sidebar" ? true : false} />
                    <label className="form-check-label" htmlFor="darksidebar">Yarı Karanlık</label>
                </div>
                
                </div>
            </div>
            </div>
            {/*end switcher*/}

        </div>

    );
}

export default Switcher;
  