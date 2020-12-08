import { put } from "redux-saga/effects";
import axios from "../../axios-orders";
import * as actions from "../actions/index";

export function* initIngredientsSaga(action) {
	try {
		const response = yield axios.get(
			"https://burger-builder-4ffc3.firebaseio.com/ingredients.json"
		);
		yield put(actions.setingredients(response.data));
	} catch (error) {
		yield put(actions.fetchIngredientsFailed());
	}
}
