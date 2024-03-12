function Switcher() {
    return (

        <div>
            {/*start switcher*/}
            <div className="switcher-body">
            <button className="btn btn-primary btn-switcher shadow-sm" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"><i className="bx bx-cog bx-spin" /></button>
            <div className="offcanvas offcanvas-end shadow border-start-0 p-2" data-bs-scroll="true" data-bs-backdrop="false" tabIndex={-1} id="offcanvasScrolling">
                <div className="offcanvas-header border-bottom">
                <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Theme Customizer</h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" />
                </div>
                <div className="offcanvas-body">
                <h6 className="mb-0">Theme Variation</h6>
                <hr />
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="lightmode" defaultValue="option1" defaultChecked />
                    <label className="form-check-label" htmlFor="lightmode">Light</label>
                </div>
                <hr />
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="darkmode" defaultValue="option2" />
                    <label className="form-check-label" htmlFor="darkmode">Dark</label>
                </div>
                <hr />
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="darksidebar" defaultValue="option3" />
                    <label className="form-check-label" htmlFor="darksidebar">Semi Dark</label>
                </div>
                <hr />
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="ColorLessIcons" defaultValue="option3" />
                    <label className="form-check-label" htmlFor="ColorLessIcons">Color Less Icons</label>
                </div>
                </div>
            </div>
            </div>
            {/*end switcher*/}

        </div>

    );
}

export default Switcher;
  