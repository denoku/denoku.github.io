import React from "react";
import PropTypes from "prop-types";
import logger from "sabio-debug";
import { useNavigate } from "react-router-dom";


const _logger = logger.extend('RenderPokemon');

const SinglePokemon = (props) => {
    // _logger('RenderPokemon', props)

    const pokeData = props.pokeData
    const navigate = useNavigate();

    const mapTypes = (type) => {
        const pType = type.name;
        // _logger('pType', pType)
        if (pType === "Grass") {
            return (
                <span className="pokeType grass">{pType}</span>
            )
        }
        else if (pType === "Poison") {
            return (
                <span className="pokeType poison">{pType}</span>
            )
        }
        else if (pType === "Fire") {
            return (
                <span className="pokeType fire">{pType}</span>
            )
        }
        else if (pType === "Flying") {
            return (
                <span className="pokeType flying">{pType}</span>
            )
        }
        else if (pType === "Water") {
            return (
                <span className="pokeType water">{pType}</span>
            )
        }
        else if (pType === "Bug") {
            return (
                <span className="pokeType bug">{pType}</span>
            )
        }
        else if (pType === "Normal") {
            return (
                <span className="pokeType normal">{pType}</span>
            )
        }
        else if (pType === "Electric") {
            return (
                <span className="pokeType electric">{pType}</span>
            )
        }
        else if (pType === "Ground") {
            return (
                <span className="pokeType ground">{pType}</span>
            )
        }
        else if (pType === "Fairy") {
            return (
                <span className="pokeType fairy">{pType}</span>
            )
        }
        else
            return (
                <span className="pokeType">{pType}</span>
            )

    }

    const types = pokeData.types.map(mapTypes);

    const navigateToPokemon = () => {
        const state = { type: 'Pokemon', payload: pokeData }
        _logger('state', state)
        navigate(`/us/pokedex/${pokeData.name}`, { state: state });
    }



    return (


        <li className="animating">
            <figure className="figure" >

                <img onClick={navigateToPokemon} className="pokedex-img" src={pokeData.primaryImageUrl} alt="" />
            </figure>
            <div className="pokemon-info">
                <p className="id">
                    <span className="number-prefix">#{pokeData.nationalPokédexNumber}</span>
                </p>
                <h5 className='pTitle'>{pokeData.name}</h5>
                <div className="">
                    {types}
                    {/* <span>{pokeData.types.map(type => type.name).join(" ")}</span> */}
                </div>
            </div>

        </li>

    );
};

SinglePokemon.proptype = {
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
        ability: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired
        }),
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

export default SinglePokemon;