import React from 'react'

//CSS
import './foo.css'

const Footer = () => {
  return (
    <div id='footer-container'>
      <div id="footer-content">
        
      <div id="copy-r">
          <p>Copyright&copy;2024 Sahal Software Developers </p>
        </div>

        <div id="social-acc-con">
          <div id="social-accs">
            <div className="f-s-i">
              <a href="https://www.facebook.com/sahalsoftware" target="_blank"><ion-icon name="logo-facebook"></ion-icon></a>
            </div>
            <div className="f-s-i">
              <a href="https://instagram.com/eng_mohamed_jama" target="_blank"><ion-icon name="logo-instagram"></ion-icon></a>
            </div>
            <div className="f-s-i">
              <a href="https://www.tiktok.com/@Sahalsoftware1" target="_blank"><ion-icon name="logo-tiktok"></ion-icon></a>
            </div>
            <div className="f-s-i">
              <a href="https://api.whatsapp.com/send?phone=252907417769" target="_blank"><ion-icon name="logo-whatsapp"></ion-icon></a>
            </div>
            <div className="f-s-i">
              <a href="https://www.youtube.com/@sahalsoftwaretm7622" target="_blank"><ion-icon name="logo-youtube"></ion-icon></a>
            </div>
          </div>
        </div>


      </div>


    </div>
  )
}

export default Footer