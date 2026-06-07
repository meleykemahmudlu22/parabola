import React, { useEffect, useState } from 'react'
import { GoArrowRight } from "react-icons/go"
import axios from "axios"
import "./clothing.css"
import AOS from "aos"
import { useSelector } from "react-redux"
import "aos/dist/aos.css"
import Avatar from '../Avatar/Avatar'

function Clothing() {
  const [products, setProducts] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const profile = useSelector((state) => state.profile) 

  useEffect(() => {
    async function getProducts() {
      try {
        const { data } = await axios.get("https://6a1ad52fbc2f94475492b2ec.mockapi.io/parabolasite")
        setProducts(data)
      } catch (error) {
        console.error("Məhsulları gətirmək mümkün olmadı:", error)
      }
    }
    getProducts()
  }, [])

  const calculateMatch = (user, product) => {
    let total = Object.keys(user).length
    let matched = 0
    let matchedFields = []
    let unmatchedFields = []

    for (let key in user) {
      if (user[key] && product[key]) {
        if (user[key] === product[key]) {
          matched++
          matchedFields.push(key)   
        } else {
          unmatchedFields.push(key) 
        }
      }
    }

    const percent = Math.round((matched / total) * 100)
    return { percent, matchedFields, unmatchedFields }
  }

  useEffect(() => {
    AOS.init({
      duration: 1000,  
      once: false,     
      mirror: true      
    })
  }, [])

  return (
    <div className="cothingcontainer">
      <div data-aos="fade-up" className="box">
        <h1>Geyimlər</h1>
        <div className="cothingboxcontainer">
          {products.map(item => {
            const { percent, matchedFields, unmatchedFields } = calculateMatch(profile, item)
            return (
              <div key={item.id} className="cothingbox">
                <div className="colorbtn">
                  <button style={{ backgroundColor: item.color }}></button>
                  {percent > 0 && (
                    <span 
                      className={`match-badge ${
                        percent >= 70 ? "high" : percent >= 40 ? "medium" : "low"
                      }`}
                    >
                      {percent}%
                    </span>
                  )}
                </div>
                <div className="cothingimg">
                  <img 
                    src={item.image || "https://gunnandmoore.playwiththebest.com/media/catalog/product/cache/ec4e4c8893a2305e77afd20d2909bacb/7/0/7047_teknik_slipover_white_1.png"} 
                    alt={item.name} 
                  />
                </div>
                <div className="cothingtext">
                  <div className="cothingtoptext">
                    <h3>{item.name}</h3>
                  </div>

                  {/* {percent > 0 && (
                    <div className="match-details">
                      <p><strong>Uyğun gələnlər:</strong> {matchedFields.join(", ") || "Yoxdur"}</p>
                      <p><strong>Uyğun gəlməyənlər:</strong> {unmatchedFields.join(", ") || "Yoxdur"}</p>
                    </div>
                  )} */}

                  <div className="cothingbtn">
                    <button>{item.size}</button>
                    <button>{item.gender}</button>
                    <button>{item.model}</button>
                  
                  </div>
                  <div className="cothingbutton">
                    <button onClick={() => { setSelectedProduct(item); setShowModal(true) }}>
                      Sına <GoArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

       
        {showModal && selectedProduct && (
          <div className="modal-overlay">
            <div className="modal-container">
            
              <div className="modal-header">
                <h2 className="modal-title">Uyğunluq Analizi</h2>
                <button 
                  className="modal-close"  
                  aria-label="Bağla"
                  onClick={() => setShowModal(false)}
                >
                  ×
                </button>
              </div>

            
              <div className="modal-body">
              
                <div className="modal-left">
                 <Avatar

    topColor={selectedProduct.topColor}        

    bottomColor={selectedProduct.bottomColor}                    

    skinColor="#d4b896"                     
    size={180}                               

  />
                  <div className="score">
                    <div className="score-number">
                      {calculateMatch(profile, selectedProduct).percent}%
                    </div>
                    <div className="score-label">UYGUNDUR</div>
                  </div>

                  <ul className="check-list">
                    {calculateMatch(profile, selectedProduct).matchedFields.map(field => (
                      <li key={field}>
                        <span className="check">✓</span>
                        <span className="check-text">{field} uyğundur</span>
                      </li>
                    ))}
                    {calculateMatch(profile, selectedProduct).unmatchedFields.map(field => (
                      <li key={field}>
                        <span className="checknot-match">✗</span>
                        <span  className="check-textnot-match">{field} uyğun deyil</span>
                      </li>
                    ))}
                  </ul>
                </div>

           
                <div className="modal-right">
                  <h3 className="product-title">{selectedProduct.name}</h3>

                  <div className="filter-buttons">
                    <button className="filter-btn">{selectedProduct.size}</button>
                    <button className="filter-btn">{selectedProduct.gender}</button>
                    <button className="filter-btn">{selectedProduct.model}</button>
                    <button className="filter-btn">{selectedProduct.bigsize}</button>
                    {/* <button className="filter-btn active">{selectedProduct.color}</button> */}
                  </div>

                  <div className="section">
              <div className="section-label">RƏNG KOMBİNASİYASI</div>
              <div className="color-row">
                <span className="color-dot" style={{ background: "#4A90C2" }} />
                <span className="color-name">göy</span>
                <span className="plus">+</span>
                <span className="color-dot" style={{ background: "#A0A0A0" }} />
                <span className="color-name">boz</span>
                <span className="plus">+</span>
                <span className="color-dot" style={{ background: "#EDE2C8" }} />
                <span className="color-name">krem</span>
              </div>
            </div>

                  <div className="section">
                    <div className="section-label">STİL TÖVSİYƏSİ</div>
                    <div className="recommendation">
                      {selectedProduct.recommendation || "Bu geyimi uyğun aksesuarlarla kombin edin."}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Clothing
