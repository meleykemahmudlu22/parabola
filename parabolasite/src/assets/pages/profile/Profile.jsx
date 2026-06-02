import { notification } from 'antd'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { profileUpdate } from '../../../features/Profile/ProfileSlice'
import Header from '../../components/Header/Header'
import "./profile.css"

const Profile = () => {
  const { user } = useSelector((state) => state.auth)
  const { cins, size, bigsize } = useSelector((state) => state.profile)
  const dispatch = useDispatch()

  const [newsize, setNewsize] = useState(size || "")
  const [newcins, setNewCins] = useState(cins || "")
  const [newbigsize, setNewbigsize] = useState(bigsize || "")
  const [submitted, setSubmitted] = useState(false)

 
  if (!user) {
    useEffect(() => {
      notification.warning({
        message: "Profilə giriş mümkün deyil",
        description: "Zəhmət olmasa qeydiyyatdan keçin və ya login olun!"
      })
    }, [])
    return <Navigate to="/login" />
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(profileUpdate({ size: newsize, cins: newcins, bigsize: newbigsize }))
    setSubmitted(true)
    notification.success({
      message: "Məlumat yadda saxlanıldı",
      description: "Profil məlumatlarınız yeniləndi!"
    })
  }

  return (
    <div>
      <Header />
      <div className='profilecontainer'>
        <div className="ProfileTextContainer">
          <h2>Profilim</h2>
          <p>Məlumatlarınız uyğunluq hesablamasında istifadə edilir.</p>
        </div>

        {submitted && (
          <div className="user-info">
            <h3>Saxlanılmış məlumatlar</h3>
            <div className="user-info-text">
              <div className="infotextone">
                <div className="sizetext">
                  <p>Cins</p>
                  <p>{cins}</p>
                </div>
                <div className="sizetext">
                  <p>Bədən tipi</p>
                  <p>{size}</p>
                </div>
              </div>
              <div className="infotextone">
                <div className="sizetext">
                  <p>Ölçü</p>
                  <p>{bigsize}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <form className='profileform' onSubmit={handleSubmit}>
          <div className="profilelabel">
            <label htmlFor="cins">Cins</label>
            <select onChange={(e) => setNewCins(e.target.value)} value={newcins} id="cins">
              <option value="">Seçin</option>
              <option value="Qadın">Qadın</option>
              <option value="Kişi">Kişi</option>
            </select>
          </div>

          <div className="profilelabel">
            <label htmlFor="geyim">Geyim ölçüsü</label>
            <select onChange={(e) => setNewsize(e.target.value)} value={newsize} id="geyim">
              <option value="">Seçin</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
          </div>

          <div className="profilelabel">
            <label htmlFor="tip">Bədən tipi</label>
            <select onChange={(e) => setNewbigsize(e.target.value)} value={newbigsize} id="tip">
              <option value="">Seçin</option>
              <option value="Daha Arıq(S)">Daha Arıq(S)</option>
              <option value="Arıq(M)">Arıq(M)</option>
              <option value="Orta(L)">Orta(L)</option>
              <option value="Orta iri(XL)">Orta iri(XL)</option>
              <option value="İri(XXL)">İri(XXL)</option>
            </select>
          </div>

          <div className="profilebtn">
            <button type='submit'>Yadda Saxla</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile
