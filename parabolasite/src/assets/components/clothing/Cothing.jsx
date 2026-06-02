import React, { useEffect, useState } from 'react'
import { GoArrowRight } from "react-icons/go"
import axios from "axios"
import "./clothing.css"
import AOS from "aos"
import { useSelector } from "react-redux"
import "aos/dist/aos.css"

function Clothing() {
  const [products, setProducts] = useState([])
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

    for (let key in user) {
      if (user[key] && product[key] && user[key] === product[key]) {
        matched++
      }
    }

    return Math.round((matched / total) * 100)
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
            const matchPercent = calculateMatch(profile, item)
            return (
              <div key={item.id} className="cothingbox">
                <div className="colorbtn">
                  <button style={{ backgroundColor: item.color }}></button>
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
                    
                    <span 
                      className={`match-badge ${
                        matchPercent >= 70 ? "high" : matchPercent >= 40 ? "medium" : "low"
                      }`}
                    >
                      Uyğunluq: {matchPercent}%
                    </span>
                  </div>
                  <div className="cothingbtn">
                    <button></button>
                    <button></button>
                    <button>{item.style || "Rəsmi"}</button>
                  </div>
                  <div className="cothingbutton">
                    <button>Sına <GoArrowRight /></button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Clothing
