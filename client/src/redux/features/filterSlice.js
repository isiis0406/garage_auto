import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filteredProducts: [],
    filteredClients: [],
    filteredSuppliers: [],
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        FILTER_PRODUCTS(state, action) {
            const { products, search } = action.payload;
            state.filteredProducts = filterByNameAndCategory(products, search);
        },
        FILTER_CLIENTS(state, action) {
            const { clients, search } = action.payload;
            state.filteredClients = filterByCompanyNameAndEmail(clients, search);
        },
        FILTER_SUPPLIERS(state, action) {
            const { suppliers, search } = action.payload;
            state.filteredSuppliers = filterByCompanyNameAndEmail(suppliers, search);
        },
        
    }
});

const filterByNameAndCategory = (items, search) => {
    if (!search) return items;
    return items.filter((item) => (
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
    ));
};

const filterByCompanyNameAndEmail = (items, search) => {
    if (!search) return items;
    return items.filter((item) => (
        item.companyName.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase())
    ));
};


export const { FILTER_PRODUCTS, FILTER_CLIENTS, FILTER_SUPPLIERS } = filterSlice.actions;
export const selectFilteredProducts = (state) => state.filter.filteredProducts;
export const selectFilteredClients = (state) => state.filter.filteredClients;
export const selectFilteredSuppliers = (state) => state.filter.filteredSuppliers;

export default filterSlice.reducer;
