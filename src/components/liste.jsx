import React, { useState, useEffect, useRef } from 'react';
import uploadImg from '../assets/uploadimg.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './List.css';

const ListePage = () => {
  const [liste, setListe] = useState([]);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [price, setPrice] = useState('');
  const [erreurMessage, setErreurMessage] = useState('');
  const inputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const savedListe = JSON.parse(localStorage.getItem('liste')) || [];
    setListe(savedListe);
  }, []);

  const ajouterChamp = () => {
    if (!selectedImage) {
      setErreurMessage('Please select an image.');
      return;
    }

    if (!nom || !prenom || !price) {
      setErreurMessage('Finish all the input fields, please.');
      return;
    }

    const newItem = { nom, prenom, price, image: selectedImage };
    const updatedListe = [newItem, ...liste];

    localStorage.setItem('liste', JSON.stringify(updatedListe)); // Save to localStorage
    setListe(updatedListe);
    setNom('');
    setPrenom('');
    setPrice('');
    setSelectedImage(null);
    setErreurMessage('');
  };

  const supprimerChamp = (index) => {
    const updatedListe = [...liste];
    updatedListe.splice(index, 1);
    localStorage.setItem('liste', JSON.stringify(updatedListe)); // Update localStorage
    setListe(updatedListe);
  };

  const handelClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const sortByPrice = () => {
    const sortedListe = [...liste].sort((a, b) => b.price - a.price);
    setListe(sortedListe);
  };

  return (
    <div className="">
      <div className='header'>
        <div onClick={handelClick}>
          <img src={selectedImage ? selectedImage : uploadImg} className='uploudIMG' alt='' />
          <input type='file' ref={inputRef} style={{ display: 'none' }} onChange={handleImageChange} />
        </div>
        <div className="inputs">

          <div className='input'>
            <label className="">House code </label>
            <input
              type="text"
              className=""
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
            />
          </div>
          <div className='input'>
            <label className="">price </label>
            <input
              type="text"
              className=""
              value={price}
              onChange={(e) => {
                const inputPrice = e.target.value;
                if (/^\d*\.?\d*$/.test(inputPrice)) {
                  setPrice(inputPrice);
                }
              }}
            />
          </div>
          <div className='input'>
            <label className="lable">Adress </label>
            <input
              type="text"
              className=""
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
          </div>
          <div> {erreurMessage && <p className="errormsg">{erreurMessage}</p>}</div>
        </div>

        <div className="">
          <button
            className="add"
            onClick={ajouterChamp}
          >
            Add
          </button>
          <button className="sort" onClick={sortByPrice}>Sort by Price</button>
        </div>
      </div>
      <div className="main">
        {liste.length > 0 ? (
          <ul>
            {liste.map((champ, index) => (
              <li
                key={index}
                className="row"
              >

                <p >{index + 1} </p>
                {champ.image && <img src={champ.image} className='houseimg' alt='' />}
                <p >{champ.nom}</p>
                <p >{champ.prenom}</p>
                <p >{champ.price} $</p>
                <button
                  className="remove"
                  onClick={() => supprimerChamp(index)}
                > remove</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>there is no ranked houses please enter one .</p>
        )}
      </div>
    </div>
  );
};

export default ListePage;
