import NavbarLayout from '../Navbar/index';
import SidebarLayout from '../Sidebar/index';
import FooterLayout from '../Footer/index';
import Switcher from '../../components/Dashboard/Switcher';
import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import $ from 'jquery';
import LocalStorageService from "../../services/LocalStorageService";

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

    const localStorageService = new LocalStorageService();

    return (
        <div>
            <Helmet>
                <title>Dashboard - Rezervasyon UI</title>
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
        </div>
    )
}