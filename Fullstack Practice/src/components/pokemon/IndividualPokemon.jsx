import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import debug from "sabio-debug";
import './pokemon.css'
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faMars, faVenus, faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import pokemonService from '../services/pokemonService'

const _logger = debug.extend("IndividualPokemon");

const IndividualPokemon = () => {
    const { state } = useLocation();

    _logger('state', state)
    const pokeInfo = state.payload
    const [pokemon, setPokemon] = useState({
        pokeData: [],
        prevPokemon: []
    })

    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const previousPokemon = parseInt(pokeInfo.nationalPokédexNumber) - 1;
    const nextPoke = parseInt(pokeInfo.nationalPokédexNumber) + 1;

    _logger('current', pokeInfo.nationalPokédexNumber)
    _logger('previous', previousPokemon);
    _logger('next', nextPoke);

    useEffect(() => {
        pokemonService
            .getPokemonById(previousPokemon)
            .then(getPrevPokemonSuccess)
            .catch(getPrevPokemonError)

        pokemonService
            .getPokemonById(nextPoke)
            .then(getNextPokemonSuccess)
            .catch(getPokemonByIdError)
    }, [pokeInfo]);

    const getNextPokemonSuccess = (data) => {
        _logger('getPokemonByIdSuccess', data)
        setPokemon((prev) => {
            const pd = { ...prev }
            pd.pokeData = data.item;
            return pd
        })
    }

    const getPokemonByIdError = (data) => {
        _logger('getNextPokemonError', data)
    }

    const getPrevPokemonSuccess = (data) => {
        _logger('getPrevPokemonSuccess', data)
        setPokemon((prev) => {
            const pd = { ...prev }
            pd.prevPokemon = data.item;
            return pd
        })
    }

    const getPrevPokemonError = (data) => {
        _logger('getPrevPokemonError', data)
    }
    const showMoreInfo = (evt) => {
        _logger("event", evt.target)
        setShow(!show)
    }

    const mapTypes = (type) => {
        const pType = type.name;
        if (pType === "Grass") {
            return (
                <li className="background-color grass mx-1">{pType}</li>
            )
        }
        else if (pType === "Poison") {
            return (
                <li className="background-color mx-1 poison ">{pType}</li>
            )
        }
        else if (pType === "Fire") {
            return (
                <li className="background-color mx-1 fire">{pType}</li>
            )
        }
        else if (pType === "Flying") {
            return (
                <li className="background-color mx-1 flying">{pType}</li>
            )
        }
        else if (pType === "Water") {
            return (
                <li className="background-color mx-1 water">{pType}</li>
            )
        }
        else if (pType === "Bug") {
            return (
                <li className="background-color mx-1 bug">{pType}</li>
            )
        }
        else if (pType === "Normal") {
            return (
                <li className="background-color mx-1 normal">{pType}</li>
            )
        }
        else if (pType === "Psychic") {
            return (
                <li className="background-color mx-1 psychic">{pType}</li>
            )
        }
        else if (pType === "Ice") {
            return (
                <li className="background-color mx-1 ice">{pType}</li>
            )
        }
        else if (pType === "Ground") {
            return (
                <li className="background-color mx-1 ground">{pType}</li>
            )
        }
        else if (pType === "Rock") {
            return (
                <li className="background-color mx-1 rock">{pType}</li>
            )
        }
        else if (pType === "Electric") {
            return (
                <li className="background-color mx-1 electric">{pType}</li>
            )
        }
        else if (pType === "Fairy") {
            return (
                <li className="background-color mx-1 fairy">{pType}</li>
            )
        }
        else if (pType === "Steel") {
            return (
                <li className="background-color mx-1 steel">{pType}</li>
            )
        }
        else
            return (
                <span className="">{pType}</span>
            )

    }

    const mapAbilities = (ability) => {

        return (
            <span className="attribute-value more-info" onClick={showMoreInfo}>{ability.name}</span>

        )
    }

    const mapAbilityInfo = (abilityInfo) => {

        return (
            <>
                <h3 className="ability-name">{abilityInfo.name}</h3>
                <p className="ability-description">{abilityInfo.description}</p>
            </>

        )
    }

    const types = pokeInfo.types.map(mapTypes);

    const weaknesses = pokeInfo.weaknesses.map(mapTypes);

    const abilities = pokeInfo.abilities.map(mapAbilities);
    const abilityInfo = pokeInfo.abilities.map(mapAbilityInfo);

    const sendNextPokemon = () => {
        const state = { type: 'Next_Pokemon', payload: pokemon.pokeData };
        _logger('state', state)
        navigate(`/us/pokedex/${pokemon.pokeData.name}`, { state: state });
    }

    const sendPrevPokemon = () => {
        const state = { type: 'Prev_Pokemon', payload: pokemon.prevPokemon };
        _logger('state', state)
        navigate(`/us/pokedex/${pokemon.prevPokemon.name}`, { state: state });
    }


    return (
        <div className="pokeContainer">
            <section className="section pokedex-pokemon-header overflow-visible">
                <div className="pokedex-pokemon-pagination">
                    <div href="/us/pokedex/Charizard" className="previous a">
                        <div onClick={sendPrevPokemon} className="pokedex-pokemon-pagination-wrapper">
                            <FontAwesomeIcon className="mx-2 poke-arrow" icon={faChevronCircleLeft} />
                            <span className="pokemon-number">#{pokemon.prevPokemon.nationalPokédexNumber}</span>
                            <span className="pokemon-name hidden-mobile">{pokemon.prevPokemon.name}</span>
                        </div>
                    </div>
                    <div href="#" onClick={sendNextPokemon} className="next a">
                        <div className="pokedex-pokemon-pagination-wrapper">
                            <FontAwesomeIcon className="mx-2 poke-arrow-right" icon={faChevronCircleRight} />
                            <span className="pokemon-number">#{pokemon.pokeData.nationalPokédexNumber}</span>
                            <span className="pokemon-name hidden-mobile">{pokemon.pokeData.name}</span>
                        </div>
                    </div>
                </div>
                <div className="pokedex-pokemon-pagination-title">
                    <div>{pokeInfo.name}
                        <span className="pokemon-number-title"> #{pokeInfo.nationalPokédexNumber}</span>
                    </div>
                </div>
            </section>
            <section className="section-one pokedex-pokemon-form">
                <div className="column-12 push-1">
                    <div className="styled-select button-black right"></div>
                </div>
            </section>
            <section className="section pokedex-results">
                <div className="column-6 push-1">
                    <div className="pokedex-pokemon-profile">
                        <div className="profile-images">
                            <img className="active" src={pokeInfo.primaryImageUrl} alt={pokeInfo.name} />
                        </div>
                    </div>
                </div>
                <div className="column-6 push-7">
                    <div className="pokedex-pokemon-details-right">
                        <div className="descriptions ">
                            <p className="version">{pokeInfo.summary}</p>
                        </div>
                        <div className="info match-height-tablet">
                            <div className="pokemon-ability-info match ">
                                <div className="column-7">
                                    <ul className="list-none">
                                        <li>
                                            <span className="attribute-title">Height</span>
                                            <span className="attribute-value">{pokeInfo.height}</span>
                                        </li>
                                        <li>
                                            <span className="attribute-title">Weight</span>
                                            <span className="attribute-value">{pokeInfo.weight}</span>
                                        </li>
                                        <li>
                                            <span className="attribute-title">Gender</span>
                                            <span className="attribute-value">
                                                <FontAwesomeIcon className="mx-2 icons" icon={faMars} />
                                                <FontAwesomeIcon className="mx-2 icons" icon={faVenus} />
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="column-7 push-7">
                                    <ul className="list-none">
                                        <li>
                                            <span className="attribute-title">Category</span>
                                            <span className="attribute-value">{pokeInfo.category.name}</span>
                                        </li>
                                        <li>
                                            <span className="attribute-title">Abilities</span>
                                            {abilities}
                                        </li>
                                    </ul>
                                </div>
                                {show &&
                                    (
                                        <div className="pokemon-ability-info-detail match">
                                            <span className="button-close" onClick={showMoreInfo}>
                                                <FontAwesomeIcon icon={faX} className="close-icon" />
                                                Close
                                            </span>
                                            <span className="ability-title">Ability Info</span>
                                            {abilityInfo}
                                            {/* <h3 className="ability-name">{pokeInfo.abilities.map(ability => ability.name)}</h3>
                                            <p className="ability-description">{pokeInfo.abilities.map(ability => ability.description)}</p> */}
                                        </div>
                                    )}
                            </div>
                            <div className="pokedex-pokemon-attributes">
                                <div className="dtm-type">
                                    <h3 className="type-title">Type</h3>
                                    <ul className="list-none">
                                        {types}
                                    </ul>
                                </div>
                                <div className="dtm-weaknesses">
                                    <h3 className="type-title">Weaknesses</h3>
                                    <ul className="list-none">
                                        {weaknesses}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )

}

export default IndividualPokemon;


IndividualPokemon.proptype = {
    pokeData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        nationalPokédexNumber: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        height: PropTypes.string.isRequired,
        weight: PropTypes.string.isRequired,
        primaryImageUrl: PropTypes.string.isRequired,
        summary: PropTypes.string.isRequired,
        gender: PropTypes.bool.isRequired,
        category: PropTypes.shape({
            id: PropTypes.number.isRequired,
            type: PropTypes.string.isRequired
        }),
        ability: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired
            })
        ),
        types: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                type: PropTypes.string.isRequired
            })
        ),
        weaknesses: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                type: PropTypes.string.isRequired
            })
        ),
        dateCreated: PropTypes.string.isRequired,
        dateModified: PropTypes.string.isRequired,

    })
}