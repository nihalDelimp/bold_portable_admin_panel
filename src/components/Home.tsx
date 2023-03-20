import React from 'react';

const Home = () => {
  return (
    <>
      <div className="nk-content">
                    <div className="container-fluid">
                        <div className="nk-content-inner">
                            <div className="nk-content-body">
                                <div className="nk-block-head nk-block-head-sm">
                                    <div className="nk-block-between">
                                        <div className="nk-block-head-content">
                                            <h3 className="nk-block-title page-title">Dashboard</h3>
                                        </div>
                                        <div className="nk-block-head-content">
                                            <div className="toggle-wrap nk-block-tools-toggle">
                                                <a href="#" className="btn btn-icon btn-trigger toggle-expand me-n1" data-target="pageMenu"><em className="icon ni ni-more-v"></em></a>
                                                <div className="toggle-expand-content" data-content="pageMenu">
                                                    <ul className="nk-block-tools g-3">
                                                        <li>
                                                            <div className="drodown">
                                                                <a href="#" className="dropdown-toggle btn btn-white btn-dim btn-outline-light" data-bs-toggle="dropdown"><em className="d-none d-sm-inline icon ni ni-calender-date"></em><span><span className="d-none d-md-inline">Last</span> 30 Days</span><em className="dd-indc icon ni ni-chevron-right"></em></a>
                                                                <div className="dropdown-menu dropdown-menu-end">
                                                                    <ul className="link-list-opt no-bdr">
                                                                        <li><a href="#"><span>Last 30 Days</span></a></li>
                                                                        <li><a href="#"><span>Last 6 Months</span></a></li>
                                                                        <li><a href="#"><span>Last 1 Years</span></a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="nk-block-tools-opt"><a href="#" className="btn btn-primary"><em className="icon ni ni-reports"></em><span>Reports</span></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="nk-block">
                                    <div className="row g-gs">
                                        <div className="col-xxl-3 col-sm-6">
                                            <div className="card">
                                                <div className="nk-ecwg nk-ecwg6">
                                                    <div className="card-inner">
                                                        <div className="card-title-group">
                                                            <div className="card-title">
                                                                <h6 className="title">Today Orders</h6>
                                                            </div>
                                                        </div>
                                                        <div className="data">
                                                            <div className="data-group">
                                                                <div className="amount">1,945</div>
                                                                <div className="nk-ecwg6-ck">
                                                                    <canvas className="ecommerce-line-chart-s3" id="todayOrders"></canvas>
                                                                </div>
                                                            </div>
                                                            <div className="info"><span className="change up text-danger"><em className="icon ni ni-arrow-long-up"></em>4.63%</span><span> vs. last week</span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-3 col-sm-6">
                                            <div className="card">
                                                <div className="nk-ecwg nk-ecwg6">
                                                    <div className="card-inner">
                                                        <div className="card-title-group">
                                                            <div className="card-title">
                                                                <h6 className="title">Today Revenue</h6>
                                                            </div>
                                                        </div>
                                                        <div className="data">
                                                            <div className="data-group">
                                                                <div className="amount">$2,338</div>
                                                                <div className="nk-ecwg6-ck">
                                                                    <canvas className="ecommerce-line-chart-s3" id="todayRevenue"></canvas>
                                                                </div>
                                                            </div>
                                                            <div className="info"><span className="change down text-danger"><em className="icon ni ni-arrow-long-down"></em>2.34%</span><span> vs. last week</span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-3 col-sm-6">
                                            <div className="card">
                                                <div className="nk-ecwg nk-ecwg6">
                                                    <div className="card-inner">
                                                        <div className="card-title-group">
                                                            <div className="card-title">
                                                                <h6 className="title">Today Customers</h6>
                                                            </div>
                                                        </div>
                                                        <div className="data">
                                                            <div className="data-group">
                                                                <div className="amount">847</div>
                                                                <div className="nk-ecwg6-ck">
                                                                    <canvas className="ecommerce-line-chart-s3" id="todayCustomers"></canvas>
                                                                </div>
                                                            </div>
                                                            <div className="info"><span className="change up text-danger"><em className="icon ni ni-arrow-long-up"></em>4.63%</span><span> vs. last week</span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-3 col-sm-6">
                                            <div className="card">
                                                <div className="nk-ecwg nk-ecwg6">
                                                    <div className="card-inner">
                                                        <div className="card-title-group">
                                                            <div className="card-title">
                                                                <h6 className="title">Today Visitors</h6>
                                                            </div>
                                                        </div>
                                                        <div className="data">
                                                            <div className="data-group">
                                                                <div className="amount">23,485</div>
                                                                <div className="nk-ecwg6-ck">
                                                                    <canvas className="ecommerce-line-chart-s3" id="todayVisitors"></canvas>
                                                                </div>
                                                            </div>
                                                            <div className="info"><span className="change down text-danger"><em className="icon ni ni-arrow-long-down"></em>2.34%</span><span> vs. last week</span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                       
                                        <div className="col-xxl-3 col-md-6">
                                            <div className="card card-full overflow-hidden">
                                                <div className="nk-ecwg nk-ecwg7 h-100">
                                                    <div className="card-inner flex-grow-1">
                                                        <div className="card-title-group mb-4">
                                                            <div className="card-title">
                                                                <h6 className="title">Order Statistics</h6>
                                                            </div>
                                                        </div>
                                                        <div className="nk-ecwg7-ck">
                                                            <canvas className="ecommerce-doughnut-s1" id="orderStatistics"></canvas>
                                                        </div>
                                                        <ul className="nk-ecwg7-legends">
                                                            <li>
                                                                <div className="title">
                                                                    <span className="dot dot-lg sq" data-bg="#816bff"></span>
                                                                    <span>Completed</span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="title">
                                                                    <span className="dot dot-lg sq" data-bg="#13c9f2"></span>
                                                                    <span>Processing</span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="title">
                                                                    <span className="dot dot-lg sq" data-bg="#ff82b7"></span>
                                                                    <span>Cancelled</span>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-3 col-md-6">
                                            <div className="card h-100">
                                                <div className="card-inner">
                                                    <div className="card-title-group mb-2">
                                                        <div className="card-title">
                                                            <h6 className="title">Store Statistics</h6>
                                                        </div>
                                                    </div>
                                                    <ul className="nk-store-statistics">
                                                        <li className="item">
                                                            <div className="info">
                                                                <div className="title">Orders</div>
                                                                <div className="count">1,795</div>
                                                            </div>
                                                            <em className="icon bg-primary-dim ni ni-bag"></em>
                                                        </li>
                                                        <li className="item">
                                                            <div className="info">
                                                                <div className="title">Customers</div>
                                                                <div className="count">2,327</div>
                                                            </div>
                                                            <em className="icon bg-info-dim ni ni-users"></em>
                                                        </li>
                                                        <li className="item">
                                                            <div className="info">
                                                                <div className="title">Products</div>
                                                                <div className="count">674</div>
                                                            </div>
                                                            <em className="icon bg-pink-dim ni ni-box"></em>
                                                        </li>
                                                        <li className="item">
                                                            <div className="info">
                                                                <div className="title">Categories</div>
                                                                <div className="count">68</div>
                                                            </div>
                                                            <em className="icon bg-purple-dim ni ni-server"></em>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-8">
                                            <div className="card card-full">
                                                <div className="card-inner">
                                                    <div className="card-title-group">
                                                        <div className="card-title">
                                                            <h6 className="title">Recent Orders</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="nk-tb-list mt-n2">
                                                    <div className="nk-tb-item nk-tb-head">
                                                        <div className="nk-tb-col"><span>Order No.</span></div>
                                                        <div className="nk-tb-col tb-col-sm"><span>Customer</span></div>
                                                        <div className="nk-tb-col tb-col-md"><span>Date</span></div>
                                                        <div className="nk-tb-col"><span>Amount</span></div>
                                                        <div className="nk-tb-col"><span className="d-none d-sm-inline">Status</span></div>
                                                    </div>
                                                    <div className="nk-tb-item">
                                                        <div className="nk-tb-col">
                                                            <span className="tb-lead"><a href="#">#95954</a></span>
                                                        </div>
                                                        <div className="nk-tb-col tb-col-sm">
                                                            <div className="user-card">
                                                                <div className="user-avatar sm bg-purple-dim">
                                                                    <span>AB</span>
                                                                </div>
                                                                <div className="user-name">
                                                                    <span className="tb-lead">Abu Bin Ishtiyak</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="nk-tb-col tb-col-md">
                                                            <span className="tb-sub">02/11/2020</span>
                                                        </div>
                                                        <div className="nk-tb-col">
                                                            <span className="tb-sub tb-amount">4,596.75 <span>USD</span></span>
                                                        </div>
                                                        <div className="nk-tb-col">
                                                            <span className="badge badge-dot badge-dot-xs bg-success">Paid</span>
                                                        </div>
                                                    </div>
                                                    <div className="nk-tb-item">
                                                        <div className="nk-tb-col">
                                                            <span className="tb-lead"><a href="#">#95850</a></span>
                                                        </div>
                                                        <div className="nk-tb-col tb-col-sm">
                                                            <div className="user-card">
                                                                <div className="user-avatar sm bg-azure-dim">
                                                                    <span>DE</span>
                                                                </div>
                                                                <div className="user-name">
                                                                    <span className="tb-lead">Desiree Edwards</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="nk-tb-col tb-col-md">
                                                            <span className="tb-sub">02/02/2020</span>
                                                        </div>
                                                        <div className="nk-tb-col">
                                                            <span className="tb-sub tb-amount">596.75 <span>USD</span></span>
                                                        </div>
                                                        <div className="nk-tb-col">
                                                            <span className="badge badge-dot badge-dot-xs bg-danger">Cancelled</span>
                                                        </div>
                                                    </div>
                                                    <div className="nk-tb-item">
                                                        <div className="nk-tb-col">
                                                            <span className="tb-lead"><a href="#">#95812</a></span>
                                                        </div>
                                                        <div className="nk-tb-col tb-col-sm">
                                                            <div className="user-card">
                                                                <div className="user-avatar sm bg-warning-dim">
                                                                    <img src="./images/avatar/b-sm.jpg" alt=""/>
                                                                </div>
                                                                <div className="user-name">
                                                                    <span className="tb-lead">Blanca Schultz</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="nk-tb-col tb-col-md">
                                                            <span className="tb-sub">02/01/2020</span>
                                                        </div>
                                                        <div className="nk-tb-col">
                                                            <span className="tb-sub tb-amount">199.99 <span>USD</span></span>
                                                        </div>
                                                        <div className="nk-tb-col">
                                                            <span className="badge badge-dot badge-dot-xs bg-success">Paid</span>
                                                        </div>
                                                    </div>
                                                    <div className="nk-tb-item">
                                                        <div className="nk-tb-col">
                                                            <span className="tb-lead"><a href="#">#95256</a></span>
                                                        </div>
                                                        <div className="nk-tb-col tb-col-sm">
                                                            <div className="user-card">
                                                                <div className="user-avatar sm bg-purple-dim">
                                                                    <span>NL</span>
                                                                </div>
                                                                <div className="user-name">
                                                                    <span className="tb-lead">Naomi Lawrence</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="nk-tb-col tb-col-md">
                                                            <span className="tb-sub">01/29/2020</span>
                                                        </div>
                                                        <div className="nk-tb-col">
                                                            <span className="tb-sub tb-amount">1099.99 <span>USD</span></span>
                                                        </div>
                                                        <div className="nk-tb-col">
                                                            <span className="badge badge-dot badge-dot-xs bg-success">Paid</span>
                                                        </div>
                                                    </div>
                                                    <div className="nk-tb-item">
                                                        <div className="nk-tb-col">
                                                            <span className="tb-lead"><a href="#">#95135</a></span>
                                                        </div>
                                                        <div className="nk-tb-col tb-col-sm">
                                                            <div className="user-card">
                                                                <div className="user-avatar sm bg-success-dim">
                                                                    <span>CH</span>
                                                                </div>
                                                                <div className="user-name">
                                                                    <span className="tb-lead">Cassandra Hogan</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="nk-tb-col tb-col-md">
                                                            <span className="tb-sub">01/29/2020</span>
                                                        </div>
                                                        <div className="nk-tb-col">
                                                            <span className="tb-sub tb-amount">1099.99 <span>USD</span></span>
                                                        </div>
                                                        <div className="nk-tb-col">
                                                            <span className="badge badge-dot badge-dot-xs bg-warning">Due</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    </>
  )
}

export default Home