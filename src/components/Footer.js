function Footer() {
    return (

        <div>
          {/*start overlay*/}
          <div className="overlay toggle-btn-mobile" />
          {/*end overlay*/}
          {/*Start Back To Top Button*/} <a href="#" onClick={() => console.log('Clicked!')} className="back-to-top"><i className="bx bxs-up-arrow-alt" /></a>
          {/*End Back To Top Button*/}
          {/*footer */}
          <div className="footer">
            <p className="mb-0">Syndash @2020 | Developed By : <a href="https://themeforest.net/user/codervent" target="_blank">codervent</a>
            </p>
          </div>
          {/* end footer */}
        </div>

    );
  }
  
  export default Footer;
  