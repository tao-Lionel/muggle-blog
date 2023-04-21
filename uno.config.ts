import { defineConfig, presetAttributify, presetIcons, presetTypography, presetUno, presetWebFonts } from "unocss"

//颜色集合
const colorMap = {
  font: "var(--font-color)",
  gray: "var(--gray-color)",
  white: "var(--white-color)",
  black: "var(--black-color)",
  blue: "var(--blue-color)",
  "font-gray": "var(--font-gray-color)"
}

//跟颜色有关的集合
let colorRules = []
Object.keys(colorMap).forEach((key) => {
  colorRules.push([`c-${key}`, { color: `${colorMap[key]}` }])
  colorRules.push([`bg-${key}`, { background: `${colorMap[key]}` }])
})

export default defineConfig({
  rules: [
    [/^h-(\d+)$/, ([, d]) => ({ height: `${d}rem` })],
    [/^h-(\d+).(\d+)$/, ([, d1, d2]) => ({ height: `${d1}.${d2}rem` })],
    [/^h-(\d+)p$/, ([, d]) => ({ height: `${d}%` })],
    [/^max-h-(\d+)$/, ([, d]) => ({ "max-height": `${d}px` })],
    [/^min-h-(\d+)$/, ([, d]) => ({ "min-height": `${d}px` })],
    [/^w-(\d+)$/, ([, d]) => ({ width: `${d}rem` })],
    [/^w-(\d+).(\d+)$/, ([, d1, d2]) => ({ height: `${d1}.${d2}rem` })],
    [/^w-(\d+)p$/, ([, d]) => ({ width: `${d}%` })],
    [/^max-w-(\d+)$/, ([, d]) => ({ "max-width": `${d}px` })],
    [/^min-w-(\d+)$/, ([, d]) => ({ "min-width": `${d}px` })],
    [/^max-w-(\d+).(\d+)$/, ([, d1, d2]) => ({ "max-width": `${d1}.${d2}rem` })],
    [/^min-w-(\d+).(\d+)$/, ([, d1, d2]) => ({ "min-width": `${d1}.${d2}rem` })],
    [/^m-(\d+)$/, ([, d]) => ({ margin: `${d}rem` })],
    [/^m-(\d+)-(\d+)$/, ([, d1, d2]) => ({ margin: `${d1}rem ${d2}rem` })],
    [/^ml-(\d+)$/, ([, d]) => ({ "margin-left": `${d}rem` })],
    [/^mr-(\d+)$/, ([, d]) => ({ "margin-right": `${d}rem` })],
    [/^mt-(\d+)$/, ([, d]) => ({ "margin-top": `${d}rem` })],
    [/^mb-(\d+)$/, ([, d]) => ({ "margin-bottom": `${d}rem` })],
    [/^p-(\d+)$/, ([, d]) => ({ padding: `${d}rem` })],
    [/^pl-(\d+)$/, ([, d]) => ({ "padding-left": `${d}rem` })],
    [/^pr-(\d+)$/, ([, d]) => ({ "padding-right": `${d}rem` })],
    [/^pt-(\d+)$/, ([, d]) => ({ "padding-top": `${d}rem` })],
    [/^pb-(\d+)$/, ([, d]) => ({ "padding-bottom": `${d}rem` })],
    [/^p-(\d+)-(\d+)$/, ([, d1, d2]) => ({ padding: `${d1}rem ${d2}rem` })],

    [/^m-(\d+).(\d+)$/, ([, d1, d2]) => ({ margin: `${d1}.${d2}rem` })],
    [/^ml-(\d+).(\d+)$/, ([, d1, d2]) => ({ "margin-left": `${d1}.${d2}rem` })],
    [/^mr-(\d+).(\d+)$/, ([, d1, d2]) => ({ "margin-right": `${d1}.${d2}rem` })],
    [/^mt-(\d+).(\d+)$/, ([, d1, d2]) => ({ "margin-top": `${d1}.${d2}rem` })],
    [/^mb-(\d+).(\d+)$/, ([, d1, d2]) => ({ "margin-bottom": `${d1}.${d2}rem` })],
    [/^m-(\d+).(\d+)-(\d+).(\d+)$/, ([, d1, d2, d3, d4]) => ({ margin: `${d1}.${d2}rem ${d3}.${d4}rem` })],

    [/^p-(\d+).(\d+)$/, ([, d1, d2]) => ({ padding: `${d1}.${d2}rem` })],
    [/^pl-(\d+).(\d+)$/, ([, d1, d2]) => ({ "padding-left": `${d1}.${d2}rem` })],
    [/^pr-(\d+).(\d+)$/, ([, d1, d2]) => ({ "padding-right": `${d1}.${d2}rem` })],
    [/^pt-(\d+).(\d+)$/, ([, d1, d2]) => ({ "padding-top": `${d1}.${d2}rem` })],
    [/^pb-(\d+).(\d+)$/, ([, d1, d2]) => ({ "padding-bottom": `${d1}.${d2}rem` })],
    [/^p-(\d+).(\d+)-(\d+).(\d+)$/, ([, d1, d2, d3, d4]) => ({ padding: `${d1}.${d2}rem ${d3}.${d4}rem` })],

    [/^fs-(\d+)$/, ([, d]) => ({ "font-size": `${d}rem` })],
    [/^fs-(\d+).(\d+)$/, ([, d1, d2]) => ({ "font-size": `${d1}.${d2}rem` })],

    [/^fw-(\d+)$/, ([, d]) => ({ "font-weight": `${d}` })],
    ...colorRules
  ],
  shortcuts: {},
  theme: {
    colors: {}
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {}
    })
  ],
  transformers: []
})
