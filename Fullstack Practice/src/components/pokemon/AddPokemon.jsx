import React, { useEffect, useState } from "react";
import debug from 'sabio-debug';
import { useFormik, FormikProvider, Field, ErrorMessage, Form } from "formik";
import pokemonSchema from "./pokemonSchema";
import Select from 'react-select';
import { getTypes } from "../services/lookUpService";
import { Link, useNavigate } from "react-router-dom";
import pokemonService from "../services/pokemonService";
import toastr from "toastr";

const _logger = debug.extend("AddPokemon");

const AddPokemon = () => {
    const [categories, setCategories] = useState([]);
    const [abilities, setAbilities] = useState([]);
    const [types, setTypes] = useState([]);
    // const [weaknesses, setWeaknesses] = useState([]);
    const navigate = useNavigate();

    const [form] = useState({
        nationalPokédexNumber: "",
        name: "",
        height: "",
        weight: "",
        primaryImageUrl: "",
        summary: "",
        gender: false,
        categoryId: 0,
        abilities: [],
        type: [],
        weaknesses: []

    })

    useEffect(() => {
        getTypes(["Categories", "Abilities", "Types"]).then(onGetTypeSuccess).catch(onGetTypeError)
    }, [])

    const onGetTypeSuccess = (data) => {
        var categoryInfo = data.item.categories;
        var abilityInfo = data.item.abilities;
        var typeInfo = data.item.types;
        _logger('categoryInfo', categoryInfo);
        _logger('abilityInfo', abilityInfo);
        _logger('typeInfo', typeInfo);

        const mappedCategories = categoryInfo.map(mapTypes);
        const mappedAbilities = abilityInfo.map(mapTypes);
        const mappedTypes = typeInfo.map(mapTypes);

        setCategories(mappedCategories);
        setAbilities(mappedAbilities);
        setTypes(mappedTypes);
    };

    const onGetTypeError = (err) => {
        _logger(err);
    };

    // const mapLookUpTables = (lookUpType) => {
    //     _logger('look up type', lookUpType.name);
    //     return (
    //         <option value={lookUpType.id} key={lookUpType.id}>
    //             {lookUpType.name}
    //         </option>
    //     );
    // };

    const mapTypes = (options) => {
        const selectOptions = {
            value: options.id,
            label: options.name,
        };
        return selectOptions;
    };

    const handleSubmitClicked = (values) => {
        _logger("add pokemon clicked", values)
        let payload = values;
        _logger('payload', payload)
        //payload.categoryId = parseInt(values.categoryId.value);
        payload.categoryId = payload.categoryId.value;
        payload.abilities = payload.abilities.map(id => parseInt(id.value));
        payload.type = payload.type.map(id => parseInt(id.value));
        payload.weaknesses = payload.weaknesses.map(id => parseInt(id.value));
        //payload.abilityId = parseInt(values.abilityId);

        pokemonService.addPokemon(payload).then(onAddSuccess).catch(onAddError)
    }

    const onAddSuccess = (response) => {
        _logger(response);
        toastr.success('PokemonAdded.', response);
        navigate('/us/pokedex');
    };
    const onAddError = (error) => {
        _logger(error);

        toastr.error('Pokemon not added', error);
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: form,
        onSubmit: handleSubmitClicked,
        validationSchema: pokemonSchema
    })

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-6">
                        <FormikProvider value={formik}>
                            <h2>Add Pokemon</h2>

                            <Form>
                                <div className="mb-3">
                                    <label>National Pokedex Number</label>
                                    <Field
                                        required
                                        type="text"
                                        id="pokedexNumber"
                                        name="nationalPokédexNumber"
                                        className="form-control"
                                        placeholder="001"
                                    />
                                    <ErrorMessage name="nationalPokédexNumber" component={'div'} className="error" />
                                </div>
                                <div className="mb-3">
                                    <label>Name</label>
                                    <Field
                                        required
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-control"
                                        placeholder="Bulbasaur"
                                    />
                                    <ErrorMessage name="name" component={'div'} className="error" />
                                </div>
                                <div className="mb-3">
                                    <label>Height</label>
                                    <Field
                                        required
                                        type="text"
                                        id="height"
                                        name="height"
                                        className="form-control"
                                        placeholder='2` 5"'
                                    />
                                    <ErrorMessage name="height" component={'div'} className="error" />
                                </div>
                                <div className="mb-3">
                                    <label>Weight</label>
                                    <Field
                                        required
                                        type="text"
                                        id="weight"
                                        name="weight"
                                        className="form-control"
                                        placeholder="23.2 lbs"
                                    />
                                    <ErrorMessage name="weight" component={'div'} className="error" />
                                </div>
                                <div className="mb-3">
                                    <label>Image Url</label>
                                    <Field
                                        required
                                        type="text"
                                        id="primaryImageUrl"
                                        name="primaryImageUrl"
                                        className="form-control"
                                        placeholder="https://assets.pokemon.com/assets/"
                                    />
                                    <ErrorMessage name="primaryImageUrl" component={'div'} className="error" />
                                </div>
                                <div className="mb-3">
                                    <label>Summary</label>
                                    <Field
                                        required
                                        type="text"
                                        id="summary"
                                        name="summary"
                                        className="form-control"
                                        placeholder="When the bulb on its back grows large,... "
                                    />
                                    <ErrorMessage name="summary" component={'div'} className="error" />
                                </div>
                                <div className="mb-3 ">
                                    <label className="form-check-label">
                                        Has known gender?
                                    </label>
                                    <Field
                                        required
                                        type="checkbox"
                                        id="gender"
                                        name="gender"
                                        className="form-check-input mx-3"
                                    />
                                    <ErrorMessage name="gender" component={'div'} className="error" />
                                </div>
                                {/* <div className="mb-3">
                    <label className="mb-1 mt23 fw-bold">Restrictions</label>
                    <Field component="select" name="restrictionId" className="form-control">
                        <option>Please Select Category</option>
                        {categories}
                        </Field>
                </div> */}<label>Category</label>
                                <Select
                                    name="categoryId"
                                    className="mb-3"
                                    value={formik.values.categoryId}
                                    onChange={(selectedOption) =>
                                        formik.setFieldValue('categoryId', selectedOption)}
                                    options={categories}>
                                </Select>
                                <label>Abilities</label>
                                <Select
                                    isMulti
                                    name="abilities"
                                    className="mb-3"
                                    value={formik.values.abilities}
                                    onChange={(selectedOption) =>
                                        formik.setFieldValue('abilities', selectedOption)}
                                    options={abilities}>
                                </Select>
                                <label>Type</label>
                                <Select
                                    isMulti
                                    closeMenuOnSelect={false}
                                    name="type"
                                    className="mb-3 basic-multi-select"
                                    value={formik.values.type}
                                    onChange={(selectedOption) =>
                                        formik.setFieldValue('type', selectedOption)}
                                    options={types}>
                                </Select>
                                <label>Weaknesses</label>
                                <Select
                                    isMulti
                                    closeMenuOnSelect={false}
                                    name="weaknesses"
                                    className="mb-3 basic-multi-select"
                                    value={formik.values.weaknesses}
                                    onChange={(selectedOption) =>
                                        formik.setFieldValue('weaknesses', selectedOption)}
                                    options={types}>
                                </Select>

                                <button to="/pokedex" className="btn btn-success" type="submit">
                                    Add New Pokemon
                                    {/* {state ? 'Edit Ingredient' : 'Add Ingredient'} */}
                                </button>
                                <p></p>
                                <div>
                                    <Link to="/pokedex" className="btn btn-success" >
                                        Go Back <i className="mdi mdi-arrow-right ms-1"></i>
                                    </Link>
                                </div>
                            </Form>
                        </FormikProvider>
                    </div>
                </div>
            </div>
        </>

    )
}

export default AddPokemon;