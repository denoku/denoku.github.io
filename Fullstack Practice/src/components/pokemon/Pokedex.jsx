import React, { useEffect, useRef, useState } from "react";
import debug from 'sabio-debug';
import pokemonService from "../services/pokemonService";
import toastr from "toastr";
import SinglePokemon from './SinglePokemon';
import './pokemon.css';
import * as Yup from 'yup';
import { Formik, Field, Form } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { getTypes } from "../services/lookUpService";

const _logger = debug.extend('Pokedex');
const searchSchema = Yup.object().shape({
    query: Yup.string()
});

function Pokedex() {

    const [data, setData] = useState({
        arrayOfPokemon: [],
        pokemonComponents: [],
        pageIndex: 0,
        pageSize: 12,
        totalCount: 0,
    });

    const bottomRef = useRef(null);
    const [sortId, setSortId] = useState(1)

    const [searchPokemon] = useState({
        query: ""
    })

    const [types, setTypes] = useState([])
    _logger(types)

    useEffect(() => {
        pokemonService
            .getPokemon(data.pageIndex, data.pageSize, sortId)
            .then(getPokemonSuccess)
            .catch(getPokemonError)
    }, [data.pageSize, data.pageIndex])

    const getPokemonSuccess = (data) => {
        _logger('getPokemonSuccess', data)
        const pokemonData = data.item.pagedItems;
        setData((prev) => {
            const pd = { ...prev };
            pd.arrayOfPokemon = pokemonData
            pd.pokemonComponents = pokemonData.map(mapPokemon);
            pd.pageIndex = data.item.pageIndex;
            pd.pageSize = data.item.pageSize;
            pd.totalCount = data.item.totalCount

            return pd
        })
    }

    const onSearchPokemon = (value) => {
        _logger("search query", value)
        pokemonService
            .searchPokemon(data.pageIndex, data.pageSize, value.query)
            .then(searchPokemonSuccess)
            .catch(searchPokemonError)
        _logger(value.query)
    }

    const searchPokemonSuccess = (data) => {
        const searchResults = data.item.pagedItems
        setData((prev) => {
            const pd = { ...prev }
            pd.arrayOfPokemon = searchResults
            pd.pokemonComponents = searchResults.map(mapPokemon)
            pd.pageIndex = data.item.pageIndex;
            pd.pageSize = data.item.pageSize;
            pd.totalCount = data.item.totalCount
            return pd
        })
    }

    const searchPokemonError = (data) => {
        _logger(data)
        toastr.error("Pokemon not found")
    }

    const getPokemonError = (err) => {
        _logger('error', err)
        toastr.error('Pokemon not found')
    }

    const mapPokemon = (aPokemon) => {
        _logger('aPokemon', aPokemon)
        return (
            <SinglePokemon
                pokeData={aPokemon}
                key={aPokemon.id}
            />
        );
    };

    const loadMore = () => {
        setData((prev) => {
            const pd = { ...prev };
            pd.pageSize = prev.pageSize + 12
            // pd.pageIndex = prev.pageIndex +1
            return pd
        })
    }

    useEffect(() => {
        getTypes(["Types"]).then(onGetTypeSuccess).catch(onGetTypeError)
    }, [])

    const onGetTypeSuccess = (data) => {
        var pokeTypes = data.item.types
        _logger("types", pokeTypes)
        const mappedTypes = pokeTypes.map(mapTypes)
        setTypes(mappedTypes)
    }

    const onGetTypeError = (err) => {
        _logger("error", err)
    }

    const mapTypes = (type) => {
        return (
            <option value={type.id} key={type.id}>
                {type.name}
            </option>
        )
    }

    const sortType = (event) => {
        const target = event.target.value;
        setSortId(target)
        _logger("typeId", event)
        pokemonService
            .getPokemon(data.pageIndex, data.pageSize, target)
            .then(getPokemonSuccess)
            .catch(getPokemonError)
    }

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // load items here
                }
            });
        });

        observer.observe(bottomRef.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <React.Fragment>

            <div className="pokeContainer ">
                <section className="section pokedex-header overflow-visible">
                    <div className="column-6 push-1">
                        <h1 className="section-title no-margin no-padding">Pokédex</h1>
                    </div>
                    <div className="column-6 push-7"></div>
                </section>
                <section className="pokedex-filter">
                    <div className="pokedex-filter-header">
                        <div>
                            <div className="column-6 push-1">
                                <div className="filter-text-search">
                                    <label>Name or Number</label>
                                    <div className="pokedex-search-input-items">
                                        <Formik
                                            enableReinitalize={true}
                                            initialValues={searchPokemon}
                                            onSubmit={onSearchPokemon}
                                            validationSchema={searchSchema}>
                                            <Form>
                                                <Field
                                                    type="search"
                                                    name="query"
                                                    className="twitter-typeahead"
                                                />
                                                <button type="submit" className="button button-search"></button>
                                            </Form>

                                        </Formik>
                                        {/* <span className="twitter-typeahead"></span>
                                        <input className="button button-search" /> */}
                                    </div>
                                </div>
                                <p className="subtitle">Use the Advanced Search to explore Pokémon by type, weakness, Ability, and more!</p>
                            </div>
                            <div className="column-6 push-7">
                                <div className="content-block content-block-full">
                                    <div className="banner banner-green">
                                        <h2>Search for a Pokémon by name or using it's National Pokédex number.</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pokedex-filters-wrapper"></div>
                </section>
                <section className="section overflow-visible">
                    <div className="column-12 push-1">
                        <button id="shuffle" onClick={sortType} value={5} className="button button-lightblue no-arrow">
                            <FontAwesomeIcon icon={faRefresh} className="close-icon" />
                            Suprise Me!
                        </button>
                        <div className="flex">
                            <h3 className="color-text color-gray sort-label">Sort By</h3>
                            <div className="custom-select-wrapper">
                                <select id="sortOrder" onChange={sortType}>
                                    <option defaultValue={1} value={1}>Lowest Number (First)</option>
                                    <option value={2}>Highest Number (First)</option>
                                    <option value={3}>A-Z</option>
                                    <option value={4}>Z-A</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="pokedex-results">
                    <ul className="results">{data.pokemonComponents}</ul>
                    {/* <div className="no-results column-12 push-1"></div> */}
                    <div className="content-block content-block-full">
                        <button className="btn load-more" ref={bottomRef} onClick={loadMore}>Load more Pokémon</button>
                    </div>
                </section>

            </div>

        </React.Fragment>
    )

}

export default Pokedex;