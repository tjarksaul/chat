import App from './ui/App.svelte';

const app = new App({
	target: document.body,
	props: {
		counter: 'world'
	}
});

export default app;