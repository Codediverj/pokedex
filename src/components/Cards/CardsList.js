import React from "react";
import './Card.css';


function getFilteredCards(pokemon, search) {
    if (search !== null && search.length !== 0) {
        return pokemon.filter((it) => it.name === search);

    }
    return pokemon;
}


function CardList({ pokemon, search }) {

    const newFilter = getFilteredCards(pokemon, search);
    return (
        <div className="CardList_wrap">
            <ul className="CardList">
                {newFilter.map((it) => {
                    return (
                        <li key={it.id} className="card_item">
                            <div className="card">
                                <div className="front">
                                    <h3>{it.name}</h3>
                                    <div className="types">
                                        {
                                            it.types.map((poke, idx) => {
                                                return (
                                                    <span key={idx} className={`type_${poke.type.name}`}>{poke.type.name}</span>
                                                )
                                            })
                                        }
                                    </div>
                                    <img src={it.sprites.front_default} alt={it.name} />
                                    <ul className="pokeinfo">
                                        <li className="basic_info">
                                            <span><span className="title title1">Height</span> {it.height}</span>
                                            <span><span className="title title2">Weight</span> {it.height}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="back">
                                    <div className="ability">
                                        <strong className="title title1">Ability</strong>
                                        {
                                            it.abilities.map((poke, idx) => {
                                                return (
                                                    <span key={idx}>{poke.ability.name}</span>
                                                )
                                            })
                                        }
                                    </div>
                                    <ul className="stats">
                                        {
                                            it.stats.map((poke, idx) => {
                                                return (
                                                    <li key={idx}>
                                                        <strong className="title title2">{poke.stat.name}</strong>
                                                        <span>{poke.base_stat}</span>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </li>
                    )
                })
                }
            </ul>
        </div>
    );
}

export default CardList;