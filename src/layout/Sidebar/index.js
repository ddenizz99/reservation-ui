import MetisMenu from '@metismenu/react';
import { toggleMenuClickHandle, allert } from '../../utils/functions';
import { NavLink, useLocation } from 'react-router-dom';

function SidebarLayout() {

  const menuItems = [
    {
      title: 'Rezervasyonlar',
      icon: 'bx bx-calendar',
      iconColor: 'parent-icon icon-color-1',
      url: '/'
    },
    {
      title: 'Misafirler',
      icon: 'bx bxs-user-rectangle',
      iconColor: 'parent-icon icon-color-3',
      url: '/blank-page'
    },
    {
      title: 'Değerlendirmeler',
      icon: 'bx lni-comments-alt',
      iconColor: 'parent-icon icon-color-5',
      url: '#'
    },
    {
      title: 'Hediyeler',
      icon: 'bx bx-gift',
      iconColor: 'parent-icon icon-color-7',
      url: '#'
    },
    {
      title: 'Pazarlama',
      icon: 'bx bx-star',
      iconColor: 'parent-icon icon-color-8',
      subItems: [
        { title: 'Kampanyalar', url: '#' }
      ]
    },
    {
      title: 'Raporlar',
      icon: 'bx bxs-report',
      iconColor: 'parent-icon icon-color-2',
      subItems: [
        { title: 'Genel', url: '#' },
        { title: 'Misafirler', url: '#' },
        { title: 'Walk-In', url: '#' },
        { title: 'Sağlayıcılar', url: '#' },
        { title: 'Değerlendirmeler', url: '#' }
      ]
    }
    // Diğer menü öğelerini buraya ekleyin
  ];

  const location = useLocation();

  // Sidebar menüsündeki her bir NavLink bileşeni için, URL ile karşılaştırma yaparak aktif sınıfı ekleyin
  const isActive = (path) => {
      // window.location.pathname ile React Router'ın yerine useLocation hook'unu kullanıyoruz
      return path === location.pathname ? 'mm-active' : '';
  };

  return (
    <div>
      {/*sidebar-wrapper*/}
      <div className="sidebar-wrapper" data-simplebar="true">
        <div className="sidebar-header">
          <div>
            {/*<img src="assets/images/logo-icon.png" className="logo-icon-2" alt="icon" />*/}
          </div>
          <div>
            <h4 className="logo-text">Rezervasyon UI</h4>
          </div>
          <a href="#" onClick={toggleMenuClickHandle} className="toggle-btn ms-auto">
            <i className="bx bx-menu" />
          </a>
        </div>
        {/*navigation*/}
        <MetisMenu className="metismenu">
          {menuItems.map((item, index) => (
            <li key={index} className={isActive(item.url)}>
              {item.subItems ? (
                <NavLink to={item.url} className="has-arrow">
                  <div className={item.iconColor}>
                    <i className={item.icon} />
                  </div>
                  <div className="menu-title">{item.title}</div>
                </NavLink>
              ) : (
                <NavLink to={item.url}>
                  <div className={item.iconColor}>
                    <i className={item.icon} />
                  </div>
                  <div className="menu-title">{item.title}</div>
                </NavLink>
              )}
              {item.subItems && (
                <ul>
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <NavLink to={subItem.url}>
                        <i className="bx bx-right-arrow-alt" /> {subItem.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </MetisMenu>
        {/*end navigation*/}
      </div>
      {/*end sidebar-wrapper*/}
    </div>
  );
  }
  
  export default SidebarLayout;
  