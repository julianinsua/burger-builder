import * as actionTypes from "./ActionTypes";
import axios from "../../axios-orders";

export const addIngredient = (name) => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredientName: name,
	};
};

export const removeIngredient = (name) => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName: name,
	};
};

export const setingredients = (ingredients) => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: ingredients,
	};
};

export const fetchIngredientsFailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED,
	};
};

export const initIngredients = () => {
	return { type: actionTypes.INIT_INGREDIENTS };
};
