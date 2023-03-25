import * as Yup from 'yup';

const pokemonSchema = Yup.object().shape({
    nationalPokédexNumber: Yup.string()
    .required("National Pokédex Number is required")
    .min(3, "Must be a minimum of 3 characters")
    .max(5, 'Maximum is 5 characters'),
    name: Yup.string().required('Name is required')
    .min(1, 'Must have at least one character')
    .max(200, 'Max characters is 200'),
    height: Yup.string(),
    weight: Yup.string(),
    primaryImageUrl: Yup.string(),
    summary: Yup.string(),
    gender: Yup.bool()
    
})

export default pokemonSchema;