import React, { useState, useRef, useEffect } from "react";
import './Common.css';
import SearchIcon from '../../assets/search.svg';
import CloseIcon from '../../assets/close.svg';

const Header = ({ pokemon, handleSearch }) => {
    const [Searchtext, setSearchText] = useState("");
    const [display, setDisplay] = useState(false);
    const searchWrapperRef = useRef(null);
    const closeButtonRef = useRef(null);
    const inputRef = useRef(null);

    const updateSearch = (pokemon) => {
        setSearchText(pokemon);
        setDisplay(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleSearch(Searchtext);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            const { current: wrap } = searchWrapperRef;
            if (wrap && !wrap.contains(event.target)) {
                setDisplay(false);
            }
        };
        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchWrapperRef]);

    useEffect(() => {
        if (!display) {
            inputRef.current.blur();
        }
    }, [display]);


    return (
        <header>
            <h1>{pokemon.length} Original Pokemons</h1>
            <div className="input_wrap" ref={searchWrapperRef}>
                <div className="form_box">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            onClick={() => setDisplay(!display)}
                            placeholder="Pokemon Name"
                            value={Searchtext}
                            ref={inputRef}
                            onChange={(e) => setSearchText(e.target.value)}
                        ></input>
                        <button className="search_button">
                            <img src={SearchIcon} alt="search" />
                        </button>
                        <button
                            ref={closeButtonRef}
                            className={`close_button ${Searchtext ? 'visible' : ''}`}
                            onClick={() => setSearchText('')}
                        >
                            <img src={CloseIcon} alt="close" />
                        </button>
                    </form>
                </div>
                {display && (
                    <ul className="auto_keywords">
                        {pokemon
                            .filter(({ name }) => name.indexOf(Searchtext.toLowerCase()) >= 0)
                            .map((item, idx) => {
                                const startIdx = item.name.toLowerCase().indexOf(Searchtext.toLowerCase());
                                const endIdx = startIdx + Searchtext.length;
                                const highlightedName = (
                                    <>
                                        {item.name.substring(0, startIdx)}
                                        <span style={{ color: '#c25027', fontWeight: 'bold' }}>{item.name.substring(startIdx, endIdx)}</span>
                                        {item.name.substring(endIdx)}
                                    </>
                                );
                                return (
                                    <li onClick={() => updateSearch(item.name)} key={idx}>
                                        {highlightedName}
                                    </li>
                                );
                            })}
                    </ul>
                )}
            </div>
        </header>
    );
}
export default Header;