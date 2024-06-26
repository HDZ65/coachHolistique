'use client'
import { useEffect } from 'react';

function CleanAttributes() {
    useEffect(() => {
        // Sélectionner les éléments body et html
        const body = document.querySelector('body');
        const html = document.querySelector('html');

        // Supprimer l'attribut cz-shortcut-listen s'il existe
        if (body && body.hasAttribute('cz-shortcut-listen')) {
            body.removeAttribute('cz-shortcut-listen');
        }
        if (html && html.hasAttribute('cz-shortcut-listen')) {
            html.removeAttribute('cz-shortcut-listen');
        }
    }, []);

    return null;
}

export default CleanAttributes;