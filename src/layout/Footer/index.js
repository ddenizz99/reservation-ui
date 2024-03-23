import $ from 'jquery';
function FooterLayout() {

    const toggleMobileMenuClickHandle = () => {
      $(".wrapper").removeClass("toggled");
    }

    return (

        <div>
          {/*start overlay*/}
          <div className="overlay toggle-btn-mobile" onClick={toggleMobileMenuClickHandle} />
          {/*end overlay*/}
          {/*Start Back To Top Button*/} <a href="#" onClick={() => console.log('Clicked!')} className="back-to-top"><i className="bx bxs-up-arrow-alt" /></a>
          {/*End Back To Top Button*/}
          {/*footer */}
          <div className="footer">
            <p className="mb-0">Reservation UI @2024 | Developed By : <a href="https://thinkinn.net/" target="_blank" style={{color: "#d29201"}}>Thinkinn</a>
            </p>
          </div>
          {/* end footer */}
        </div>

    );
  }
  
  export default FooterLayout;
  