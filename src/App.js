import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Switcher from './components/Switcher';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div>

      {/* wrapper */}
      <div className="wrapper">
        <Sidebar></Sidebar>
        <Navbar></Navbar>
        {/*page-wrapper*/}
        <div className="page-wrapper">
          {/*page-content-wrapper*/}
          <div className="page-content-wrapper">
            <div className="page-content">
              <Dashboard></Dashboard>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
      <Switcher></Switcher>
    
    </div>
  );
}

export default App;
