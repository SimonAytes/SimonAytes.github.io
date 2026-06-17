# Logos

Each company uses two logo files (SVG preferred; light/white marks read best on the dark background):

| Company   | Desktop grid (`{name}.svg`) | Mobile row (`{name}_mobile.svg`) |
| --------- | --------------------------- | -------------------------------- |
| Penta     | `penta.svg`                 | `penta_mobile.svg`               |
| KAIST     | `kaist.svg`                 | `kaist_mobile.svg`               |
| Freelance | `freelance.svg`             | `freelance_mobile.svg`           |
| WSJ       | `wsj.svg`                   | `wsj_mobile.svg`                 |
| NASA      | `nasa.svg`                  | `nasa_mobile.svg`                |
| York/CUNY | `york.svg`                  | `york_mobile.svg`                |

- **Desktop** (the `lg`+ expandable grid) uses `{name}.svg` in large square-ish tiles — emblems and stacked marks work well.
- **Mobile** (the `<details>` disclosure rows) uses `{name}_mobile.svg` — use the **horizontal** version of each logo here, since it sits inline next to the dates. The mobile path is derived automatically from the desktop path, so you only need to drop in the files.

`{name}.svg` is referenced by `data/experience.ts`; `{name}_mobile.svg` is derived in `components/experience-details.tsx`.
