import NavbarLayout from '../Navbar/index';
import SidebarLayout from '../Sidebar/index';
import FooterLayout from '../Footer/index';
import Switcher from '../../components/Dashboard/Switcher';
import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import $ from 'jquery';

export default function DashboardLayout() {

    const script = () => {
        
        
        $(window).on("scroll", function () {
            if ($(this).scrollTop() > 300) {
                $('.top-header').addClass('sticky-top-header');
            } else {
                $('.top-header').removeClass('sticky-top-header');
            }
        });
        $('.back-to-top').on("click", function () {
            $("html, body").animate({
                scrollTop: 0
            }, 600);
            return false;
        });

        // Tooltips 
        //$('[data-toggle="tooltip"]').tooltip()
        // Metishmenu card collapse
        
        // toggle menu button
        $(".toggle-btn").click(function () {
            if ($(".wrapper").hasClass("toggled")) {
                // unpin sidebar when hovered
                $(".wrapper").removeClass("toggled");
                $(".sidebar-wrapper").unbind("hover");
            } else {
                $(".wrapper").addClass("toggled");
                $(".sidebar-wrapper").hover(function () {
                    $(".wrapper").addClass("sidebar-hovered");
                }, function () {
                    $(".wrapper").removeClass("sidebar-hovered");
                })
            }
        });
        $(".toggle-btn-mobile").on("click", function () {
            $(".wrapper").removeClass("toggled");
        });
        // chat toggle
        $(".chat-toggle-btn").on("click", function () {
            $(".chat-wrapper").toggleClass("chat-toggled");
        });
        $(".chat-toggle-btn-mobile").on("click", function () {
            $(".chat-wrapper").removeClass("chat-toggled");
        });
        // email toggle
        $(".email-toggle-btn").on("click", function () {
            $(".email-wrapper").toggleClass("email-toggled");
        });
        $(".email-toggle-btn-mobile").on("click", function () {
            $(".email-wrapper").removeClass("email-toggled");
        });
        // compose mail
        $(".compose-mail-btn").on("click", function () {
            $(".compose-mail-popup").show();
        });
        $(".compose-mail-close").on("click", function () {
            $(".compose-mail-popup").hide();
        });
    
    
    
    
        /*switcher*/
        $(".switcher-btn").on("click", function () {
            $(".switcher-wrapper").toggleClass("switcher-toggled");
        });
    }

    //script();

    return (
        <div>
            <Helmet>
                <title>Dashboard - Rezervasyon UI</title>
                {/* <script src="assets/js/jquery.min.js"></script>
                <script src="assets/plugins/simplebar/js/simplebar.min.js"></script>
                <script src="assets/plugins/metismenu/js/metisMenu.min.js"></script>
                <script src="assets/plugins/perfect-scrollbar/js/perfect-scrollbar.js"></script>
                <script src="assets/plugins/vectormap/jquery-jvectormap-2.0.2.min.js"></script>
                <script src="assets/plugins/vectormap/jquery-jvectormap-world-mill-en.js"></script>
                <script src="assets/plugins/vectormap/jquery-jvectormap-in-mill.js"></script>
                <script src="assets/plugins/vectormap/jquery-jvectormap-us-aea-en.js"></script>
                <script src="assets/plugins/vectormap/jquery-jvectormap-uk-mill-en.js"></script>
                <script src="assets/plugins/vectormap/jquery-jvectormap-au-mill.js"></script>
                <script src="assets/plugins/apexcharts-bundle/js/apexcharts.min.js"></script>
                <script src="assets/js/index2.js"></script>
	            <script src="assets/js/app.js"></script> */}
            </Helmet>
            {/* wrapper */}
            <div className="wrapper">
                <SidebarLayout></SidebarLayout>
                <NavbarLayout></NavbarLayout>
                {/*page-wrapper*/}
                <div className="page-wrapper">
                    {/*page-content-wrapper*/}
                    <div className="page-content-wrapper">
                        <div className="page-content">
                            <Outlet />
                        </div>
                    </div>
                </div>
                <FooterLayout></FooterLayout>
            </div>
            <Switcher></Switcher>
            {console.log(process.env.REACT_APP_API_URL)}
        </div>
    )
}