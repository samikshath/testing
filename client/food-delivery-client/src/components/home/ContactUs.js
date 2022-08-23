import React from 'react'
import '../../css/ContactUs.css'
import Header from "./Header";

const ContactUs = () => {
  return (
    <>
    <div className="container contact-group text-center ">
                             
                <br />
                <img src='https://images.unsplash.com/photo-1596524430615-b46475ddff6e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29udGFjdCUyMHVzfGVufDB8fDB8fA%3D%3D&w=1000&q=80' width="100%" height="330px" alt="location" className="img-responsive " />
                <br />
                <div className="row">
                <div className="container">
                
                <table className="table">
                    <tbody>
                    <tr>
                        <td>Mobile : </td>
                        <td> 9972201498 </td>
                    </tr>
                    <tr>
                        <td>Whatsapp : </td>
                        <td> 9972201498 </td>
                    </tr>
                    <tr>
                        <td>Email : </td>
                        <td><strong> prem.sandesh.chavan98@gmail.com</strong> </td>
                    </tr>
                    <tr>
                        <td>Address: </td>
                        <td>Sr.No 222, Opp Chhatrapati Shivaji Sports, MITCON Lane, Pune 40001 </td>
                    </tr>
                    </tbody>
                </table> 
                <br/> 
                 </div>             
               </div>
            </div>
            </>
  )
}

export default ContactUs