import { toggleMenuClickHandle } from '../../utils/functions';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../store/authStore";
import { authLogout } from '../../services/AuthService';
import { toast } from 'react-toastify';

import 'react-perfect-scrollbar/dist/css/styles.css'; 

function NavbarLayout() {

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.user);

  const logoutHandle = (e) => {
    e.preventDefault();
    authLogout();
    dispatch(logout());
    toast.success('Oturum kapatıdı.');
  }

  return (
    <div>
      
      {/*header*/}
      <header className="top-header">
        <nav className="navbar navbar-expand">
          <div className="left-topbar d-flex align-items-center">
            <a href="#" onClick={toggleMenuClickHandle} className="toggle-btn">	<i className="bx bx-menu" />
            </a>
          </div>
          {/* <div className="flex-grow-1 search-bar">
            <div className="input-group">
              <button className="btn btn-search-back search-arrow-back" type="button"><i className="bx bx-arrow-back" /></button>
              <input type="text" className="form-control" placeholder="search" />
              <button className="btn btn-search" type="button"><i className="lni lni-search-alt" /></button>
            </div>
          </div> */}
          <div className="right-topbar ms-auto">
            <ul className="navbar-nav">
              <li className="nav-item search-btn-mobile">
                <a className="nav-link position-relative" href="#" onClick={() => console.log('Clicked!')}>	<i className="bx bx-search vertical-align-middle" />
                </a>
              </li>
              <li className="nav-item dropdown dropdown-lg">
                <a className="nav-link dropdown-toggle dropdown-toggle-nocaret position-relative" href="#" onClick={() => console.log('Clicked!')} data-bs-toggle="dropdown">	<span className="msg-count">6</span>
                  <i className="bx bx-comment-detail vertical-align-middle" />
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  <a href="#" onClick={() => console.log('Clicked!')}>
                    <div className="msg-header">
                      <h6 className="msg-header-title">6 Yeni Mesaj</h6>
                      <p className="msg-header-subtitle">Mesajlar</p>
                    </div>
                  </a>
                  <PerfectScrollbar className="header-message-list" style={{height:400}}>
                    <a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}>
                      <div className="d-flex align-items-center">
                        <div className="user-online">
                          <img src="assets/images/avatars/avatar-1.png" className="msg-avatar" alt="user avatar" />
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="msg-name">Daisy Anderson <span className="msg-time float-end">5 sec
                              ago</span></h6>
                          <p className="msg-info">The standard chunk of lorem</p>
                        </div>
                      </div>
                    </a>
                    <a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}>
                      <div className="d-flex align-items-center">
                        <div className="user-online">
                          <img src="assets/images/avatars/avatar-2.png" className="msg-avatar" alt="user avatar" />
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="msg-name">Althea Cabardo <span className="msg-time float-end">14
                              sec ago</span></h6>
                          <p className="msg-info">Many desktop publishing packages</p>
                        </div>
                      </div>
                    </a>
                    <a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}>
                      <div className="d-flex align-items-center">
                        <div className="user-online">
                          <img src="assets/images/avatars/avatar-3.png" className="msg-avatar" alt="user avatar" />
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="msg-name">Oscar Garner <span className="msg-time float-end">8 min
                              ago</span></h6>
                          <p className="msg-info">Various versions have evolved over</p>
                        </div>
                      </div>
                    </a>
                    <a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}>
                      <div className="d-flex align-items-center">
                        <div className="user-online">
                          <img src="assets/images/avatars/avatar-4.png" className="msg-avatar" alt="user avatar" />
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="msg-name">Katherine Pechon <span className="msg-time float-end">15
                              min ago</span></h6>
                          <p className="msg-info">Making this the first true generator</p>
                        </div>
                      </div>
                    </a>
                    <a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}>
                      <div className="d-flex align-items-center">
                        <div className="user-online">
                          <img src="assets/images/avatars/avatar-5.png" className="msg-avatar" alt="user avatar" />
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="msg-name">Amelia Doe <span className="msg-time float-end">22 min
                              ago</span></h6>
                          <p className="msg-info">Duis aute irure dolor in reprehenderit</p>
                        </div>
                      </div>
                    </a>
                    <a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}>
                      <div className="d-flex align-items-center">
                        <div className="user-online">
                          <img src="assets/images/avatars/avatar-6.png" className="msg-avatar" alt="user avatar" />
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="msg-name">Cristina Jhons <span className="msg-time float-end">2 hrs
                              ago</span></h6>
                          <p className="msg-info">The passage is attributed to an unknown</p>
                        </div>
                      </div>
                    </a>
                    <a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}>
                      <div className="d-flex align-items-center">
                        <div className="user-online">
                          <img src="assets/images/avatars/avatar-7.png" className="msg-avatar" alt="user avatar" />
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="msg-name">James Caviness <span className="msg-time float-end">4 hrs
                              ago</span></h6>
                          <p className="msg-info">The point of using Lorem</p>
                        </div>
                      </div>
                    </a>
                    <a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}>
                      <div className="d-flex align-items-center">
                        <div className="user-online">
                          <img src="assets/images/avatars/avatar-8.png" className="msg-avatar" alt="user avatar" />
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="msg-name">Peter Costanzo <span className="msg-time float-end">6 hrs
                              ago</span></h6>
                          <p className="msg-info">It was popularised in the 1960s</p>
                        </div>
                      </div>
                    </a>
                    <a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}>
                      <div className="d-flex align-items-center">
                        <div className="user-online">
                          <img src="assets/images/avatars/avatar-9.png" className="msg-avatar" alt="user avatar" />
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="msg-name">David Buckley <span className="msg-time float-end">2 hrs
                              ago</span></h6>
                          <p className="msg-info">Various versions have evolved over</p>
                        </div>
                      </div>
                    </a>
                    <a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}>
                      <div className="d-flex align-items-center">
                        <div className="user-online">
                          <img src="assets/images/avatars/avatar-10.png" className="msg-avatar" alt="user avatar" />
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="msg-name">Thomas Wheeler <span className="msg-time float-end">2 days
                              ago</span></h6>
                          <p className="msg-info">If you are going to use a passage</p>
                        </div>
                      </div>
                    </a>
                    <a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}>
                      <div className="d-flex align-items-center">
                        <div className="user-online">
                          <img src="assets/images/avatars/avatar-11.png" className="msg-avatar" alt="user avatar" />
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="msg-name">Johnny Seitz <span className="msg-time float-end">5 days
                              ago</span></h6>
                          <p className="msg-info">All the Lorem Ipsum generators</p>
                        </div>
                      </div>
                    </a>
                  </PerfectScrollbar>
                  <a href="#" onClick={() => console.log('Clicked!')}>
                    <div className="text-center msg-footer">View All Messages</div>
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown dropdown-lg">
                <a className="nav-link dropdown-toggle dropdown-toggle-nocaret position-relative" href="#" onClick={() => console.log('Clicked!')} data-bs-toggle="dropdown">	<i className="bx bx-bell vertical-align-middle" />
                  <span className="msg-count">8</span>
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  <a href="#" onClick={() => console.log('Clicked!')}>
                    <div className="msg-header">
                      <h6 className="msg-header-title">8 Yeni Bildirim</h6>
                      <p className="msg-header-subtitle">Bildirimler</p>
                    </div>
                  </a>
                  <PerfectScrollbar className="header-notifications-list" style={{height:400}}>
                    <a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}>
                      <div className="d-flex align-items-center">
                        <div className="notify bg-light-primary text-primary"><i className="bx bx-group" />
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="msg-name">New Customers<span className="msg-time float-end">14 Sec
                              ago</span></h6>
                          <p className="msg-info">5 new user registered</p>
                        </div>
                      </div>
                    </a>
                    <a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}>
                      <div className="d-flex align-items-center">
                        <div className="notify bg-light-danger text-danger"><i className="bx bx-cart-alt" />
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="msg-name">New Orders <span className="msg-time float-end">2 min
                              ago</span></h6>
                          <p className="msg-info">You have recived new orders</p>
                        </div>
                      </div>
                    </a>
                    <a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}>
                      <div className="d-flex align-items-center">
                        <div className="notify bg-light-shineblue text-shineblue"><i className="bx bx-file" />
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="msg-name">24 PDF File<span className="msg-time float-end">19 min
                              ago</span></h6>
                          <p className="msg-info">The pdf files generated</p>
                        </div>
                      </div>
                    </a>
                    <a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}>
                      <div className="d-flex align-items-center">
                        <div className="notify bg-light-cyne text-cyne"><i className="bx bx-send" />
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="msg-name">Time Response <span className="msg-time float-end">28 min
                              ago</span></h6>
                          <p className="msg-info">5.1 min avarage time response</p>
                        </div>
                      </div>
                    </a>
                    <a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}>
                      <div className="d-flex align-items-center">
                        <div className="notify bg-light-purple text-purple"><i className="bx bx-home-circle" />
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="msg-name">New Product Approved <span className="msg-time float-end">2 hrs ago</span></h6>
                          <p className="msg-info">Your new product has approved</p>
                        </div>
                      </div>
                    </a>
                    <a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}>
                      <div className="d-flex align-items-center">
                        <div className="notify bg-light-warning text-warning"><i className="bx bx-message-detail" />
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="msg-name">New Comments <span className="msg-time float-end">4 hrs
                              ago</span></h6>
                          <p className="msg-info">New customer comments recived</p>
                        </div>
                      </div>
                    </a>
                    <a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}>
                      <div className="d-flex align-items-center">
                        <div className="notify bg-light-success text-success"><i className="bx bx-check-square" />
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="msg-name">Your item is shipped <span className="msg-time float-end">5 hrs
                              ago</span></h6>
                          <p className="msg-info">Successfully shipped your item</p>
                        </div>
                      </div>
                    </a>
                    <a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}>
                      <div className="d-flex align-items-center">
                        <div className="notify bg-light-sinata text-sinata"><i className="bx bx-user-pin" />
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="msg-name">New 24 authors<span className="msg-time float-end">1 day
                              ago</span></h6>
                          <p className="msg-info">24 new authors joined last week</p>
                        </div>
                      </div>
                    </a>
                    <a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}>
                      <div className="d-flex align-items-center">
                        <div className="notify bg-light-mehandi text-mehandi"><i className="bx bx-door-open" />
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="msg-name">Defense Alerts <span className="msg-time float-end">2 weeks
                              ago</span></h6>
                          <p className="msg-info">45% less alerts last 4 weeks</p>
                        </div>
                      </div>
                    </a>
                  </PerfectScrollbar>
                  <a href="#" onClick={() => console.log('Clicked!')}>
                    <div className="text-center msg-footer">View All Notifications</div>
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown dropdown-user-profile">
                <a className="nav-link dropdown-toggle dropdown-toggle-nocaret" href="#" onClick={() => console.log('Clicked!')} data-bs-toggle="dropdown">
                  <div className="d-flex user-box align-items-center">
                    <div className="user-info">
                      <p className="user-name mb-0">{userData.full_name}</p>
                      <p className="designattion mb-0">{userData.restaurant_name}</p>
                    </div>
                    <img src="tda.jpg" className="user-img" alt="user avatar" />
                  </div>
                </a>
                <div className="dropdown-menu dropdown-menu-end">	
                  <a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}><i className="bx bx-user" /><span>Profil</span></a>
                  <a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}><i className="bx bx-cog" /><span>Ayarlar</span></a>
                  <a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}><i className="bx bx-tachometer" /><span>Panel</span></a>
                  <div className="dropdown-divider mb-0" />	<a className="dropdown-item" href="#" onClick={logoutHandle}><i className="bx bx-power-off" /><span>Çıkış Yap</span></a>
                </div>
              </li>
              <li className="nav-item dropdown dropdown-language">
                <a className="nav-link dropdown-toggle dropdown-toggle-nocaret" href="#" onClick={() => console.log('Clicked!')} data-bs-toggle="dropdown">
                  <div className="lang d-flex">
                    <div><i className="flag-icon flag-icon-tr" />
                    </div>
                    <div><span>TR</span>
                    </div>
                  </div>
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  <a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}><i className="flag-icon flag-icon-de" /><span>German</span></a>
                  <a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}><i className="flag-icon flag-icon-fr" /><span>French</span></a>
                  <a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}><i className="flag-icon flag-icon-um" /><span>English</span></a>
                  <a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}><i className="flag-icon flag-icon-in" /><span>Hindi</span></a>
                  <a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}><i className="flag-icon flag-icon-cn" /><span>Chinese</span></a>
                  <a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}><i className="flag-icon flag-icon-ae" /><span>Arabic</span></a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      {/*end header*/}


    </div>
  );
}

export default NavbarLayout;
