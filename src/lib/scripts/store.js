import { writable } from 'svelte/store';

export const modal = writable({
  isOpen: false,
  content: {
    title: '',
    experience: '',
    link: '',
  },
});