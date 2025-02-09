// components/Button.js
export function Button(text, action) {
    return `
        <button data-action="${action}">${text}</button>
    `;
}
