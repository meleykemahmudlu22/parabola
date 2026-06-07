import React, { useEffect, useState } from "react";
import axios from "axios";
import "./seller.css";
import Header from "../Header/Header";

const API_URL = "https://6a1ad52fbc2f94475492b2ec.mockapi.io/parabolasite";

const initialState = {
  name: "",
  cins: "",
  olcu: "",
  fit: "",
  reng: "",
  stil: "",
  info: "",
};

const SellerPanel = () => {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState({ loading: false, error: null, ok: false });
  const [products, setProducts] = useState([]);
  const [deletingId, setDeletingId] = useState(null);


  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      const sorted = [...res.data].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setProducts(sorted);
    } catch (err) {
      console.error("Məhsullar yüklənmədi:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, ok: false });

    const payload = {
      name: form.name,
      cins: form.cins,
      olcu: form.olcu,
      fit: form.fit,
      reng: form.reng,
      stil: form.stil,
      info: form.info,
      createdAt: new Date().toISOString(),
    };

    try {
      await axios.post(API_URL, payload);
      setStatus({ loading: false, error: null, ok: true });
      setForm(initialState);
      fetchProducts(); 
    } catch (err) {
      setStatus({
        loading: false,
        error: "Məlumat göndərilə bilmədi.",
        ok: false,
      });
    }
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Bu məhsulu silmək istədiyinizə əminsiniz?")) return;

    setDeletingId(id);
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert("Silmək mümkün olmadı. Yenidən cəhd edin.");
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
    <Header/>
    <div className="panel-wrapper">

       <header className="panel-header">
          <h1 className="panel-title">Satıcı Paneli</h1>
          <p className="panel-subtitle">Yeni geyim əlavə edin.</p>
        </header>
      <div className="panel-card">
     

        <form className="panel-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="name">Geyim adı</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="məs: Klassik köynək"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="cins">Cins</label>
              <select id="cins" name="cins" value={form.cins} onChange={handleChange} required>
                <option value="">Seçin</option>
                <option value="kisi">Kişi</option>
                <option value="qadin">Qadın</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="olcu">Ölçü</label>
              <select id="olcu" name="olcu" value={form.olcu} onChange={handleChange} required>
                <option value="">Seçin</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="fit">Uyğunlaşma ölçüsü (fit)</label>
              <select id="fit" name="fit" value={form.fit} onChange={handleChange} required>
                <option value="">Seçin</option>
                <option value="dar">Dar (Slim)</option>
                <option value="regular">Regular</option>
                <option value="genis">Geniş (Oversize)</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="reng">Rəng</label>
              <select id="reng" name="reng" value={form.reng} onChange={handleChange} required>
                <option value="">Seçin</option>
                <option value="qara">Qara</option>
                <option value="ag">Ağ</option>
                <option value="mavi">Mavi</option>
                <option value="qirmizi">Qırmızı</option>
                <option value="yashil">Yaşıl</option>
                <option value="bej">Bej</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="stil">Stil</label>
              <select id="stil" name="stil" value={form.stil} onChange={handleChange} required>
                <option value="">Seçin</option>
                <option value="klassik">Idman</option>
                <option value="casual">Rəsmi</option>
                <option value="sport">Cins</option>
                <option value="elegant">Gündəlik</option>
                <option value="streetwear">Digər</option>
              </select>
            </div>
          </div>

          <div className="form-field form-field--full">
            <label htmlFor="info">
              Geyim haqqında qısa məlumat (istəyə bağlı)
            </label>
            <textarea
              id="info"
              name="info"
              rows="4"
              placeholder="Geyimin xüsusiyyətləri..."
              value={form.info}
              onChange={handleChange}
            />
          </div>

          {status.error && (
            <div className="form-alert form-alert--error">⚠ {status.error}</div>
          )}
          {status.ok && (
            <div className="form-alert form-alert--ok">✓ Geyim uğurla əlavə olundu!</div>
          )}

          <button type="submit" className="submit-btn" disabled={status.loading}>
            {status.loading ? "Göndərilir..." : "Geyimi əlavə et"}
          </button>
        </form>

     
      </div>
      <div className="panel-product">
      
        <section className="products-section">
          <h2 className="products-title">Əlavə olunmuş məhsullar ({products.length})</h2>

          {products.length === 0 ? (
            <p className="products-empty">Hələ ki məhsul yoxdur.</p>
          ) : (
            <ul className="products-list">
              {products.map((p) => (
                <li
                  key={p.id}
                  className={`product-item ${deletingId === p.id ? "is-deleting" : ""}`}
                >
                  <div className="product-info">
                    <h3 className="product-name">{p.name}</h3>
                    <div className="product-meta">
                      <span>{p.cins}</span>
                      <span>•</span>
                      <span>{p.olcu}</span>
                      <span>•</span>
                      <span>{p.reng}</span>
                      <span>•</span>
                      <span>{p.stil}</span>
                    </div>
                    {p.info && <p className="product-desc">{p.info}</p>}
                  </div>

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => handleDelete(p.id)}
                    disabled={deletingId === p.id}
                    aria-label="Sil"
                  >
                    {deletingId === p.id ? "..." : "🗑 Sil"}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
      
    </div>
    </>
  );
};

export  default SellerPanel;