import $ from 'jquery';

export const toggleMenuClickHandle = () => {
    // toggle menu button
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
}

export const allert = () => {
    alert("ddddd");
}