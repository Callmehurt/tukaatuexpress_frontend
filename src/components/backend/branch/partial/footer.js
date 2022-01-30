import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {RiDashboardLine,RiDashboardFill,RiInboxArchiveLine,RiInboxArchiveFill} from 'react-icons/ri';

const BranchFooter = (props) => {

    const [branchaction,SetBranchaction]=useState(false);

    const handleclick=(event)=>{
        SetBranchaction(event => !event);
    }

    return (
        <>
        <div>
            {
                branchaction ?  <section className="Admin_footer1">
                <div className="container-fluid ">
                    <div className="row">
                        <div className="five_col">
                           <Link to="/branch/pickups" className="a_border" style={{textDecoration:'none',}} >
                            <div className="all_center">
                            { (props.currentlocation.pathname ==='/branch/pickups') ? <div className="icon_footer"> <RiDashboardFill size={24} style={{color:'ffd125',}}/> </div> :<div className="icon_footer"> <RiDashboardLine size={24} style={{color:'#e4eaee',}}/> </div>

                            }
                                <div className="icon_title text-white"><h6>Partner Requests</h6></div>
                            </div>
                            </Link>
                        </div>
                        <div className="five_col">
                            <Link to="/branch/transferins" className="a_border"  style={{textDecoration:'none',}}>
                                <div className="all_center">
                                { (props.currentlocation.pathname ==='/branch/transferins')  ? <div className="icon_footer"> <RiInboxArchiveFill size={24} style={{color:'ffd125',}}/> </div> :<div className="icon_footer"> <RiInboxArchiveLine size={24} style={{color:'#e4eaee',}}/> </div>

                                }
                                    <div className="icon_footer d-none"><svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 0 24 24" width="30px"><path fill="#fff" d="m6.5 19h-2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h2c.276 0 .5.224.5.5s-.224.5-.5.5z"></path><path fill="#fff" d="m22.75 19h-1.25c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h.835l.674-3.592c-.009-1.838-1.579-3.408-3.509-3.408h-3.283l-1.591 7h2.874c.276 0 .5.224.5.5s-.224.5-.5.5h-3.5c-.152 0-.296-.069-.391-.188-.095-.118-.131-.274-.097-.422l1.818-8c.052-.229.254-.39.488-.39h3.682c2.481 0 4.5 2.019 4.5 4.5l-.759 4.092c-.044.237-.25.408-.491.408z"></path><path fill="#fff" d="m19.5 21c-1.378 0-2.5-1.121-2.5-2.5s1.122-2.5 2.5-2.5 2.5 1.121 2.5 2.5-1.122 2.5-2.5 2.5zm0-4c-.827 0-1.5.673-1.5 1.5s.673 1.5 1.5 1.5 1.5-.673 1.5-1.5-.673-1.5-1.5-1.5z"></path><path fill="#fff" d="m8.5 21c-1.378 0-2.5-1.121-2.5-2.5s1.122-2.5 2.5-2.5 2.5 1.121 2.5 2.5-1.122 2.5-2.5 2.5zm0-4c-.827 0-1.5.673-1.5 1.5s.673 1.5 1.5 1.5 1.5-.673 1.5-1.5-.673-1.5-1.5-1.5z"></path><path fill="#fff" d="m6.5 10h-4c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h4c.276 0 .5.224.5.5s-.224.5-.5.5z"></path><path fill="#fff" d="m6.5 13h-5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h5c.276 0 .5.224.5.5s-.224.5-.5.5z"></path><path fill="#fff" d="m6.5 16h-6c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h6c.276 0 .5.224.5.5s-.224.5-.5.5z"></path><path fill="#fff" d="m14 19h-3.5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3.101l2.272-10h-11.373c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h12c.152 0 .296.069.391.188.095.118.131.274.097.422l-2.5 11c-.052.229-.255.39-.488.39z"></path></svg></div>
                                    <div className="icon_title"><h6>Transfer Ins</h6></div>
                                </div>
                            </Link>
                        </div>
                        <div className="five_col">
                                <Link to="/branch/transferouts" className="a_border" style={{textDecoration:'none',}}>
                                <div className="all_center">
                                { (props.currentlocation.pathname ==='/branch/transferouts')  ? <div className="icon_footer"> <RiInboxArchiveFill size={24} style={{color:'ffd125',}}/> </div> :<div className="icon_footer"> <RiInboxArchiveLine size={24} style={{color:'#e4eaee',}}/> </div>

                                }
                                    <div className="icon_title"><h6>Transfer Out</h6></div>
                                </div>
                                </Link>
                        </div>
                        <div className="five_col">
                            <Link to="/branch/allholds" className="a_border" style={{textDecoration:'none',}}>
                            <div className="all_center">
                            { (props.currentlocation.pathname ==='/branch/allholds')  ? <div className="icon_footer"> <RiInboxArchiveFill size={24} style={{color:'ffd125',}}/> </div> :<div className="icon_footer"> <RiInboxArchiveLine size={24} style={{color:'#e4eaee',}}/> </div>

                                }
                                <div className="icon_title"><h6>All Holds</h6></div>
                            </div>
                            </Link>
                        </div>
                        <div className="five_col">
                            <Link to="/branch/allreturns" className="a_border" style={{textDecoration:'none',}}>
                            <div className="all_center">
                                { (props.currentlocation.pathname ==='/branch/allreturns')  ? <div className="icon_footer"> <RiInboxArchiveFill size={24} style={{color:'ffd125',}}/> </div> :<div className="icon_footer"> <RiInboxArchiveLine size={24} style={{color:'#e4eaee',}}/> </div>

                                }
                                <div className="icon_title"><h6>All Cancels/ Returns </h6></div>
                            </div>
                            </Link>
                        </div>
                    </div>
                </div>
        </section>: ''
            }

                <section className="Admin_footer">
                    <div className="container-fluid ">
                        <div className="row">

                            <div className="five_col">
                            <Link to="/branch/dashboard" className="a_border" style={{textDecoration:'none',}} >
                                <div className="all_center" >
                                { (props.currentlocation.pathname ==='/branch@/dashboard') && (!branchaction) ? <div className="icon_footer"> <RiDashboardFill size={24} style={{color:'ffd125',}}/> </div> :<div className="icon_footer"> <RiDashboardLine size={24} style={{color:'#e4eaee',}}/> </div>

                                }
                                    <div className="icon_title text-white"><h6>Dashboard</h6></div>
                                </div>
                                </Link>
                            </div>
                            {/*<div className="five_col">*/}
                            {/*    <Link to="/branch/newpickuplist" className="a_border"  style={{textDecoration:'none',}}>*/}
                            {/*        <div className="all_center">*/}
                            {/*        { (props.currentlocation.pathname ==='/branch/newpickuplist') && (!branchaction) ? <div className="icon_footer"> <RiInboxArchiveFill size={24} style={{color:'ffd125',}}/> </div> :<div className="icon_footer"> <RiInboxArchiveLine size={24} style={{color:'#e4eaee',}}/> </div>*/}

                            {/*        }*/}
                            {/*            <div className="icon_footer d-none"><svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 0 24 24" width="30px"><path fill="#fff" d="m6.5 19h-2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h2c.276 0 .5.224.5.5s-.224.5-.5.5z"></path><path fill="#fff" d="m22.75 19h-1.25c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h.835l.674-3.592c-.009-1.838-1.579-3.408-3.509-3.408h-3.283l-1.591 7h2.874c.276 0 .5.224.5.5s-.224.5-.5.5h-3.5c-.152 0-.296-.069-.391-.188-.095-.118-.131-.274-.097-.422l1.818-8c.052-.229.254-.39.488-.39h3.682c2.481 0 4.5 2.019 4.5 4.5l-.759 4.092c-.044.237-.25.408-.491.408z"></path><path fill="#fff" d="m19.5 21c-1.378 0-2.5-1.121-2.5-2.5s1.122-2.5 2.5-2.5 2.5 1.121 2.5 2.5-1.122 2.5-2.5 2.5zm0-4c-.827 0-1.5.673-1.5 1.5s.673 1.5 1.5 1.5 1.5-.673 1.5-1.5-.673-1.5-1.5-1.5z"></path><path fill="#fff" d="m8.5 21c-1.378 0-2.5-1.121-2.5-2.5s1.122-2.5 2.5-2.5 2.5 1.121 2.5 2.5-1.122 2.5-2.5 2.5zm0-4c-.827 0-1.5.673-1.5 1.5s.673 1.5 1.5 1.5 1.5-.673 1.5-1.5-.673-1.5-1.5-1.5z"></path><path fill="#fff" d="m6.5 10h-4c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h4c.276 0 .5.224.5.5s-.224.5-.5.5z"></path><path fill="#fff" d="m6.5 13h-5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h5c.276 0 .5.224.5.5s-.224.5-.5.5z"></path><path fill="#fff" d="m6.5 16h-6c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h6c.276 0 .5.224.5.5s-.224.5-.5.5z"></path><path fill="#fff" d="m14 19h-3.5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3.101l2.272-10h-11.373c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h12c.152 0 .296.069.391.188.095.118.131.274.097.422l-2.5 11c-.052.229-.255.39-.488.39z"></path></svg></div>*/}
                            {/*            <div className="icon_title"><h6>New Request</h6></div>*/}
                            {/*        </div>*/}
                            {/*    </Link>*/}
                            {/*</div>*/}
                            {/*<div className="five_col">*/}
                            {/*        <Link to="#" className="a_border" style={{textDecoration:'none',}} >*/}
                            {/*        <div className="all_center" onClick={(event) => handleclick(event)}>*/}
                            {/*       { branchaction ? <div className="icon_footer"> <RiInboxArchiveFill size={24} style={{color:'ffd125',}}/> </div> :<div className="icon_footer"> <RiInboxArchiveLine size={24} style={{color:'#e4eaee',}}/> </div> }*/}

                            {/*            <div className="icon_title"><h6>Action Area</h6></div>*/}
                            {/*        </div>*/}
                            {/*        </Link>*/}
                            {/*</div>*/}
                            <div className="five_col">
                                <Link to="/branch/partners" className="a_border" style={{textDecoration:'none',}}>
                                <div className="all_center">
                                { (props.currentlocation.pathname ==='/branch/partners') && (!branchaction) ? <div className="icon_footer"> <RiInboxArchiveFill size={24} style={{color:'ffd125',}}/> </div> :<div className="icon_footer"> <RiInboxArchiveLine size={24} style={{color:'#e4eaee',}}/> </div>

                                    }
                                    <div className="icon_title"><h6>Partners</h6></div>
                                </div>
                                </Link>
                            </div>

                            <div className="five_col">
                                <Link to="/branch/deliverypersons" className="a_border" style={{textDecoration:'none',}}>
                                <div className="all_center">
                                    { (props.currentlocation.pathname ==='/branch/deliverypersons') && (!branchaction) ? <div className="icon_footer"> <RiInboxArchiveFill size={24} style={{color:'ffd125',}}/> </div> :<div className="icon_footer"> <RiInboxArchiveLine size={24} style={{color:'#e4eaee',}}/> </div>

                                    }
                                    <div className="icon_title"><h6>Delivery Person</h6></div>
                                </div>
                                </Link>
                            </div>
                            <div className="five_col">
                                <Link to="/branch/daily_statement" className="a_border" style={{textDecoration:'none',}}>
                                    <div className="all_center">
                                        { (props.currentlocation.pathname ==='/branch/daily_statement') && (!branchaction) ? <div className="icon_footer"> <RiInboxArchiveFill size={24} style={{color:'ffd125',}}/> </div> :<div className="icon_footer"> <RiInboxArchiveLine size={24} style={{color:'#e4eaee',}}/> </div>

                                        }
                                        <div className="icon_title"><h6>Daily Statement</h6></div>
                                    </div>
                                </Link>
                            </div>
                            <div className="five_col">
                                <Link to="/branch/delivery_person_statement" className="a_border" style={{textDecoration:'none',}}>
                                <div className="all_center">
                                    { (props.currentlocation.pathname ==='/branch/delivery_person_statement') && (!branchaction) ? <div className="icon_footer"> <RiInboxArchiveFill size={24} style={{color:'ffd125',}}/> </div> :<div className="icon_footer"> <RiInboxArchiveLine size={24} style={{color:'#e4eaee',}}/> </div>

                                        }
                                    {/*<div className="icon_footer"><svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 0 24 24" width="30px"><path fill="#fff" d="m6.5 19h-2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h2c.276 0 .5.224.5.5s-.224.5-.5.5z"></path><path fill="#fff" d="m22.75 19h-1.25c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h.835l.674-3.592c-.009-1.838-1.579-3.408-3.509-3.408h-3.283l-1.591 7h2.874c.276 0 .5.224.5.5s-.224.5-.5.5h-3.5c-.152 0-.296-.069-.391-.188-.095-.118-.131-.274-.097-.422l1.818-8c.052-.229.254-.39.488-.39h3.682c2.481 0 4.5 2.019 4.5 4.5l-.759 4.092c-.044.237-.25.408-.491.408z"></path><path fill="#fff" d="m19.5 21c-1.378 0-2.5-1.121-2.5-2.5s1.122-2.5 2.5-2.5 2.5 1.121 2.5 2.5-1.122 2.5-2.5 2.5zm0-4c-.827 0-1.5.673-1.5 1.5s.673 1.5 1.5 1.5 1.5-.673 1.5-1.5-.673-1.5-1.5-1.5z"></path><path fill="#fff" d="m8.5 21c-1.378 0-2.5-1.121-2.5-2.5s1.122-2.5 2.5-2.5 2.5 1.121 2.5 2.5-1.122 2.5-2.5 2.5zm0-4c-.827 0-1.5.673-1.5 1.5s.673 1.5 1.5 1.5 1.5-.673 1.5-1.5-.673-1.5-1.5-1.5z"></path><path fill="#fff" d="m6.5 10h-4c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h4c.276 0 .5.224.5.5s-.224.5-.5.5z"></path><path fill="#fff" d="m6.5 13h-5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h5c.276 0 .5.224.5.5s-.224.5-.5.5z"></path><path fill="#fff" d="m6.5 16h-6c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h6c.276 0 .5.224.5.5s-.224.5-.5.5z"></path><path fill="#fff" d="m14 19h-3.5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3.101l2.272-10h-11.373c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h12c.152 0 .296.069.391.188.095.118.131.274.097.422l-2.5 11c-.052.229-.255.39-.488.39z"></path></svg></div>*/}
                                    <div className="icon_title"><h6>Delivery Statement</h6></div>
                                </div>
                                </Link>
                            </div>

                        </div>
                    </div>
                </section>
        </div>        </>
    )
}

export default BranchFooter;
