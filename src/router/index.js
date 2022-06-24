import {createRouter, createWebHistory} from "vue-router";
import Puzzle from '@/views/PuzzleSolving.vue'

const routes = [
	{path: '/puzzle', component: Puzzle}
]

export const router = createRouter({
	history: createWebHistory(),
	routes
})
