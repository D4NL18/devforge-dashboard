// import * as types from "../../Services/types";
// import api from "../../Services/api";
import { makeAutoObservable } from "mobx";

export class Store {
	constructor() {
		makeAutoObservable(this);
	}

	public counter = 0;

	public increment() {
		this.counter += 1;
	}

	public decrement() {
		this.counter -= 1;
	}

	public restartCounter() {
		this.counter = 0;
	}

}