function Dashboard() {
    return (
      <div>
        
        <div>
          <div className="row">
            <div className="col-12 col-lg-3">
              <div className="card radius-15 bg-voilet">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div>
                      <h2 className="mb-0 text-white">649 <i className="bx bxs-up-arrow-alt font-14 text-white" /> </h2>
                    </div>
                    <div className="ms-auto font-35 text-white"><i className="bx bx-cart-alt" />
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div>
                      <p className="mb-0 text-white">Item Delivered</p>
                    </div>
                    <div className="ms-auto font-14 text-white">+23.4%</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="card radius-15 bg-primary-blue">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div>
                      <h2 className="mb-0 text-white">114 <i className="bx bxs-down-arrow-alt font-14 text-white" /> </h2>
                    </div>
                    <div className="ms-auto font-35 text-white"><i className="bx bx-support" />
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div>
                      <p className="mb-0 text-white">Refund Request</p>
                    </div>
                    <div className="ms-auto font-14 text-white">+14.7%</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="card radius-15 bg-rose">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div>
                      <h2 className="mb-0 text-white">98 <i className="bx bxs-up-arrow-alt font-14 text-white" /> </h2>
                    </div>
                    <div className="ms-auto font-35 text-white"><i className="bx bx-tachometer" />
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div>
                      <p className="mb-0 text-white">Cancelled Orders</p>
                    </div>
                    <div className="ms-auto font-14 text-white">-12.9%</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="card radius-15 bg-sunset">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div>
                      <h2 className="mb-0 text-white">208 <i className="bx bxs-up-arrow-alt font-14 text-white" /> </h2>
                    </div>
                    <div className="ms-auto font-35 text-white"><i className="bx bx-user" />
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div>
                      <p className="mb-0 text-white">New Users</p>
                    </div>
                    <div className="ms-auto font-14 text-white">+13.6%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*end row*/}
          <div className="card radius-15">
            <div className="card-header border-bottom-0">
              <div className="d-lg-flex align-items-center">
                <div>
                  <h5 className="mb-2 mb-lg-0">Sales Update</h5>
                </div>
                <div className="ms-lg-auto mb-2 mb-lg-0">
                  <div className="btn-group-round">
                    <div className="btn-group">
                      <button type="button" className="btn btn-white">Daiiy</button>
                      <button type="button" className="btn btn-white">Weekly</button>
                      <button type="button" className="btn btn-white">Monthly</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div id="chart1" />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="card radius-15">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div>
                      <h5 className="mb-0">Revenue By Device</h5>
                    </div>
                    <div className="dropdown ms-auto">
                      <div className="cursor-pointer font-24 dropdown-toggle dropdown-toggle-nocaret" data-bs-toggle="dropdown"><i className="bx bx-dots-horizontal-rounded" />
                      </div>
                      <div className="dropdown-menu dropdown-menu-right">	<a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}>Action</a>
                        <a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}>Another action</a>
                        <div className="dropdown-divider" />	<a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}>Something else here</a>
                      </div>
                    </div>
                  </div>
                  <div id="chart2" />
                  <div className="legends">
                    <div className="row">
                      <div className="col-12 col-lg-5">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="text-secondary"><i className="bx bxs-circle font-13 text-primary-blue me-2" />Desktop</div>
                          <div>$850.04</div>
                          <div className="text-secondary">64.4%</div>
                        </div>
                        <div className="my-2" />
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="text-secondary"><i className="bx bxs-circle font-13 text-shineblue me-2" />Mobile</div>
                          <div>$755.08</div>
                          <div className="text-secondary">48.6%</div>
                        </div>
                      </div>
                      <div className="col-12 col-lg-2">
                        <div className="vertical-separater" />
                      </div>
                      <div className="col-12 col-lg-5">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="text-secondary"><i className="bx bxs-circle font-13 text-primary me-2" />Tablet</div>
                          <div>$687.03</div>
                          <div className="text-secondary">24.7%</div>
                        </div>
                        <div className="my-2" />
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="text-secondary"><i className="bx bxs-circle font-13 text-red me-2" />Unknown</div>
                          <div>$142.07</div>
                          <div className="text-secondary">14.8%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="card radius-15">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div>
                      <h5 className="mb-0">Traffic</h5>
                    </div>
                    <div className="dropdown ms-auto">
                      <div className="cursor-pointer font-24 dropdown-toggle dropdown-toggle-nocaret" data-bs-toggle="dropdown"><i className="bx bx-dots-horizontal-rounded" />
                      </div>
                      <div className="dropdown-menu dropdown-menu-right">	<a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}>Action</a>
                        <a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}>Another action</a>
                        <div className="dropdown-divider" />	<a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}>Something else here</a>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3 g-3">
                    <div className="col-12 col-lg-6">
                      <div className="card radius-15 border shadow-none">
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            <div>
                              <p className="mb-0">Store Visits</p>
                            </div>
                            <div className="ms-auto text-success"><span>+22%</span>
                            </div>
                          </div>
                          <h4 className="mb-0">8950</h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="card radius-15 border shadow-none">
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            <div>
                              <p className="mb-0">Visitors</p>
                            </div>
                            <div className="ms-auto text-purple"><span>-24%</span>
                            </div>
                          </div>
                          <h4 className="mb-0">1520</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="chart3" />
                </div>
              </div>
            </div>
          </div>{/*end row*/}
          <div className="row">
            <div className="col-12 col-lg-4 d-flex">
              <div className="card radius-15 w-100">
                <div className="card-body">
                  <div className="d-lg-flex align-items-center">
                    <div>
                      <h5 className="mb-4">Top Categories</h5>
                    </div>
                    <div className="dropdown ms-auto">
                      <div className="cursor-pointer font-24 dropdown-toggle dropdown-toggle-nocaret" data-bs-toggle="dropdown"><i className="bx bx-dots-horizontal-rounded" />
                      </div>
                      <div className="dropdown-menu dropdown-menu-right">	<a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}>Action</a>
                        <a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}>Another action</a>
                        <div className="dropdown-divider" />	<a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}>Something else here</a>
                      </div>
                    </div>
                  </div>
                  <div className="progress-wrapper mb-4">
                    <p className="mb-1">Electronics <span className="float-end">45%</span>
                    </p>
                    <div className="progress radius-15" style={{height: 5}}>
                      <div className="progress-bar" role="progressbar" style={{width: '45%'}} />
                    </div>
                  </div>
                  <div className="progress-wrapper mb-4">
                    <p className="mb-1">Clothing <span className="float-end">55%</span>
                    </p>
                    <div className="progress radius-15" style={{height: 5}}>
                      <div className="progress-bar bg-voilet" role="progressbar" style={{width: '55%'}} />
                    </div>
                  </div>
                  <div className="progress-wrapper mb-4">
                    <p className="mb-1">Furniture <span className="float-end">64%</span>
                    </p>
                    <div className="progress radius-15" style={{height: 5}}>
                      <div className="progress-bar bg-red-light" role="progressbar" style={{width: '64%'}} />
                    </div>
                  </div>
                  <div className="progress-wrapper mb-4">
                    <p className="mb-1">Accessories <span className="float-end">78%</span>
                    </p>
                    <div className="progress radius-15" style={{height: 5}}>
                      <div className="progress-bar bg-sunset" role="progressbar" style={{width: '78%'}} />
                    </div>
                  </div>
                  <div className="progress-wrapper mb-4">
                    <p className="mb-1">Jewellery <span className="float-end">82%</span>
                    </p>
                    <div className="progress radius-15" style={{height: 5}}>
                      <div className="progress-bar bg-wall" role="progressbar" style={{width: '82%'}} />
                    </div>
                  </div>
                  <div className="progress-wrapper">
                    <p className="mb-1">Mobiles <span className="float-end">89%</span>
                    </p>
                    <div className="progress radius-15" style={{height: 5}}>
                      <div className="progress-bar bg-dark" role="progressbar" style={{width: '89%'}} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-8 d-flex">
              <div className="card radius-15 w-100">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <div>
                      <h5 className="mb-0">Sales Forecast</h5>
                    </div>
                    <div className="dropdown ms-auto">
                      <div className="cursor-pointer text-dark font-24 dropdown-toggle dropdown-toggle-nocaret" data-bs-toggle="dropdown"><i className="bx bx-dots-horizontal-rounded" />
                      </div>
                      <div className="dropdown-menu dropdown-menu-right">	<a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}>Action</a>
                        <a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}>Another action</a>
                        <div className="dropdown-divider" />	<a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}>Something else here</a>
                      </div>
                    </div>
                  </div>
                  <div className="row g-3">
                    <div className="col-12 col-lg-6">
                      <div className="card radius-15 border shadow-none mb-0">
                        <div className="card-body">
                          <div className="d-flex flex-row align-items-center">
                            <div>
                              <p className="text-secondary mb-0">Revenue</p>
                              <h4 className="mb-0 ">+24.5%</h4>
                            </div>
                            <div className="fs-2 ms-auto">
                              <i className="bx bx-wallet-alt" />
                            </div>
                          </div>
                          <div id="chart4" className="ms-auto mt-1" />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="card radius-15 border shadow-none mb-0">
                        <div className="card-body">
                          <div className="d-flex flex-row align-items-center">
                            <div>
                              <p className="text-secondary mb-0">Net Profit</p>
                              <h4 className="mb-0">-2.7%</h4>
                            </div>
                            <div className="fs-2 ms-auto">
                              <i className="bx bx-bar-chart-alt-2" />
                            </div>
                          </div>
                          <div id="chart5" className="ms-auto mt-1" />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="card radius-15 border shadow-none mb-0">
                        <div className="card-body">
                          <div className="d-flex flex-row align-items-center">
                            <div>
                              <p className="text-secondary mb-0">Orders</p>
                              <h4 className="mb-0">+32.6%</h4>
                            </div>
                            <div className="fs-2 ms-auto">
                              <i className="bx bx-shopping-bag" />
                            </div>
                          </div>
                          <div id="chart6" className="ms-auto mt-1" />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="card radius-15 border shadow-none mb-0">
                        <div className="card-body">
                          <div className="d-flex flex-row align-items-center">
                            <div>
                              <p className="text-secondary mb-0">Visitors</p>
                              <h4 className="mb-0">+60.2%</h4>
                            </div>
                            <div className="fs-2 ms-auto">
                              <i className="bx bx-group" />
                            </div>
                          </div>
                          <div id="chart7" className="ms-auto mt-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*end row*/}
          <div className="row">
            <div className="col-12 col-lg-8 d-flex">
              <div className="card radius-15 w-100 overflow-hidden">
                <div className="card-header border-bottom-0">
                  <div className="d-flex align-items-center">
                    <div>
                      <h5 className="mb-0">Revenue By Locations</h5>
                    </div>
                    <div className="dropdown ms-auto">
                      <div className="cursor-pointer font-24 dropdown-toggle dropdown-toggle-nocaret" data-bs-toggle="dropdown"><i className="bx bx-dots-horizontal-rounded" />
                      </div>
                      <div className="dropdown-menu dropdown-menu-right">	<a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}>Action</a>
                        <a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}>Another action</a>
                        <div className="dropdown-divider" />	<a className="dropdown-item" href="#" onClick={() => console.log('Clicked!')}>Something else here</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div id="location-map" />
                </div>
                <div className="table-responsive">
                  <table className="table mb-0">
                    <thead>
                      <tr>
                        <th scope="col" className="text-blue-ribbon">Countries</th>
                        <th scope="col" className="text-brink-pink">Orders</th>
                        <th scope="col" className="text-mountain-meadow">Earnings</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="d-flex align-items-center"><i className="flag-icon flag-icon-um me-2" />
                          <div>United States</div>
                        </td>
                        <td>13,495</td>
                        <td className="text-semibold">$58,430.75</td>
                      </tr>
                      <tr>
                        <td className="d-flex align-items-center"><i className="flag-icon flag-icon-nl me-2" />
                          <div>Netherlands</div>
                        </td>
                        <td>11,495</td>
                        <td className="text-semibold">$68,253.90</td>
                      </tr>
                      <tr>
                        <td className="d-flex align-items-center"><i className="flag-icon flag-icon-us me-2" />
                          <div>United Kingdom</div>
                        </td>
                        <td>09,348</td>
                        <td className="text-semibold">$87,295.70</td>
                      </tr>
                      <tr>
                        <td className="d-flex align-items-center"><i className="flag-icon flag-icon-ca me-2" />
                          <div>Canada</div>
                        </td>
                        <td>07,845</td>
                        <td className="text-semibold">$64,914.20</td>
                      </tr>
                      <tr>
                        <td className="d-flex align-items-center"><i className="flag-icon flag-icon-au me-2" />
                          <div>Australia</div>
                        </td>
                        <td>05,945</td>
                        <td className="text-semibold">$94,335.60</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4 d-flex">
              <div className="card radius-15 w-100">
                <div className="card-body">
                  <div className="card radius-15 border shadow-none">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <h5 className="mb-0">New Users</h5>
                        <p className="mb-0 ms-auto"><i className="bx bx-dots-horizontal-rounded float-right font-24" />
                        </p>
                      </div>
                      <div className="d-flex align-items-center mt-3 gap-2">
                        <img src="assets/images/avatars/avatar-1.png" width={45} height={45} className="rounded-circle" alt="imgs" />
                        <div className="flex-grow-1">
                          <p className="font-weight-bold mb-0">Neil Wagner</p>
                          <p className="text-secondary mb-0">United Kingdom</p>
                        </div>
                        <a href="#" onClick={() => console.log('Clicked!')} className="btn btn-sm btn-light-primary px-4 radius-10">Add</a>
                      </div>
                      <hr />
                      <div className="d-flex align-items-center gap-2">
                        <img src="assets/images/avatars/avatar-2.png" width={45} height={45} className="rounded-circle" alt="imgs" />
                        <div className="flex-grow-1">
                          <p className="font-weight-bold mb-0">Sampoll Dinga</p>
                          <p className="text-secondary mb-0">America</p>
                        </div> <a href="#" onClick={() => console.log('Clicked!')} className="btn btn-sm btn-light-primary px-4 radius-10">Add</a>
                      </div>
                      <hr />
                      <div className="d-flex align-items-center gap-2">
                        <img src="assets/images/avatars/avatar-3.png" width={45} height={45} className="rounded-circle" alt="imgs" />
                        <div className="flex-grow-1">
                          <p className="font-weight-bold mb-0">Loona Ting</p>
                          <p className="text-secondary mb-0">Canada</p>
                        </div> <a href="#" onClick={() => console.log('Clicked!')} className="btn btn-sm btn-light-primary px-4 radius-10">Add</a>
                      </div>
                      <hr />
                      <div className="d-flex align-items-center gap-2">
                        <img src="assets/images/avatars/avatar-4.png" width={45} height={45} className="rounded-circle" alt="imgs" />
                        <div className="flex-grow-1">
                          <p className="font-weight-bold mb-0">Lee Jong</p>
                          <p className="text-secondary mb-0">China</p>
                        </div> <a href="#" onClick={() => console.log('Clicked!')} className="btn btn-sm btn-light-primary px-4 radius-10">Add</a>
                      </div>
                    </div>
                  </div>
                  <div className="card radius-15 border shadow-none mb-0">
                    <div className="card-body">
                      <h4 className="mb-0">87.52%</h4>
                      <p className="mb-0">Bounce Rate</p>
                    </div>
                    <div id="chart8" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*end row*/}
          <div className="card radius-15 overflow-hidden">
            <div className="card-header border-bottom-0">
              <div className="d-flex align-items-center">
                <div>
                  <h5 className="mb-0">Recent Orders</h5>
                </div>
                <div className="ms-auto">
                  <button type="button" className="btn btn-white btn-sm px-4 radius-15">View More</button>
                </div>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th>Photo</th>
                      <th>Product Name</th>
                      <th>Customer</th>
                      <th>Product id</th>
                      <th>Price</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="product-img bg-transparent border">
                          <img src="assets/images/icons/smartphone.png" width={35} alt="imgs" />
                        </div>
                      </td>
                      <td>Honor Mobile 7x</td>
                      <td>Mitchell Daniel</td>
                      <td>#835478</td>
                      <td>$54.68</td>
                      <td><a href="#" onClick={() => console.log('Clicked!')} className="btn btn-sm btn-light-success btn-block radius-30">Delivered</a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="product-img bg-transparent border">
                          <img src="assets/images/icons/watch.png" width={35} alt="imgs" />
                        </div>
                      </td>
                      <td>Hand Watch</td>
                      <td>Milona Burke</td>
                      <td>#987546</td>
                      <td>$43.78</td>
                      <td><a href="#" onClick={() => console.log('Clicked!')} className="btn btn-sm btn-light-warning btn-block radius-30">Pending</a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="product-img bg-transparent border">
                          <img src="assets/images/icons/laptop.png" width={35} alt="imgs" />
                        </div>
                      </td>
                      <td>Mini Laptop</td>
                      <td>Craig Clayton</td>
                      <td>#325687</td>
                      <td>$62.21</td>
                      <td><a href="#" onClick={() => console.log('Clicked!')} className="btn btn-sm btn-light-success btn-block radius-30">Delivered</a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="product-img bg-transparent border">
                          <img src="assets/images/icons/shirt.png" width={35} alt="imgs" />
                        </div>
                      </td>
                      <td>Slim-T-Shirt</td>
                      <td>Clark Andola</td>
                      <td>#658972</td>
                      <td>$75.68</td>
                      <td><a href="#" onClick={() => console.log('Clicked!')} className="btn btn-sm btn-light-danger btn-block radius-30">Cancelled</a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="product-img bg-transparent border">
                          <img src="assets/images/icons/wine-glass.png" width={35} alt="imgs" />
                        </div>
                      </td>
                      <td>Mini Laptop</td>
                      <td>Craig Clayton</td>
                      <td>#325687</td>
                      <td>$62.21</td>
                      <td><a href="#" onClick={() => console.log('Clicked!')} className="btn btn-sm btn-light-success btn-block radius-30">Delivered</a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="product-img bg-transparent border">
                          <img src="assets/images/icons/headphones.png" width={35} alt="imgs" />
                        </div>
                      </td>
                      <td>Honor Mobile 7x</td>
                      <td>Mitchell Daniel</td>
                      <td>#835478</td>
                      <td>$54.68</td>
                      <td><a href="#" onClick={() => console.log('Clicked!')} className="btn btn-sm btn-light-success btn-block radius-30">Delivered</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>


      </div>
    );
  }
  
  export default Dashboard;
  