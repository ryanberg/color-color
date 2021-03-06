import { writable, derived, readable } from "svelte/store";
import chroma from "chroma-js";
import { randomInt } from "./lib/math";
import { getStatefulUrl, getStateFromUrl } from "./lib/url";
import { hslToHex, hexToHsl } from "./lib/colors";
import { jsonToSvg } from "./lib/svg";
import {
  eases,
  getBezierEasingByAlias,
  stringToCubicBezierParams,
} from "./lib/eases";
import BezierEasing from "bezier-easing";
import colorNamer from "color-namer/dist/color-namer";

const defaults = {
  steps: 9,
  saturationRate: 130,
};
const maxNumOfScales = 16;
const urlState = getStateFromUrl();

export const config = readable({
  eases: eases,
  resolution: 0.25,
  limits: {
    hue: [0, 360],
    sat: [0, 100],
    lig: [0, 100],
    rate: [0, 200],
  },
});

export const addDialog = writable(false);
export const hexToScale = writable("");

const shareDialogStoreCreator = (config) => {
  const { subscribe, set, update } = writable(config);

  const openWithTriggerRect = (rect) => {
    update((state) => {
      return {
        ...state,
        open: true,
        rect,
      };
    });
  };

  return {
    subscribe,
    set,
    update,
    openWithTriggerRect,
  };
};

export const shareDialog = shareDialogStoreCreator({ open: false });

export const settings = writable(
  Object.assign(
    {},
    {
      overlayContrast: true,
      overlayHex: true,
      refColorsRaw: "",
      colorSpace: "hsluv",
    },
    urlState.settings
  )
);

function slugify(string) {
  const a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w-]+/g, "") // Remove all non-word characters
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

function nameHue(hex) {
  // const hex = hslToHex(hue, 100, 75, settings.colorSpace);
  return slugify(colorNamer(hex, { pick: ["pantone"] }).pantone[0].name);
}

function createScaleParams() {
  const { subscribe, set, update } = writable(
    Object.assign(
      {},
      {
        steps: defaults.steps,
        scaleIndex: 0,
        swatchIndex: Math.floor(defaults.steps / 2),
        maxNumOfScales,
        params: [
          {
            name: "blue",
            hue: {
              start: 230,
              end: 254,
              ease: getBezierEasingByAlias("quadIn"),
            },
            sat: {
              start: 45,
              end: 100,
              ease: getBezierEasingByAlias("quadOut"),
              rate: defaults.saturationRate,
            },
            lig: { start: 99, end: 5, ease: getBezierEasingByAlias("quadOut") },
          },
          {
            name: "purple",
            hue: {
              start: 278,
              end: 290,
              ease: getBezierEasingByAlias("quadIn"),
            },
            sat: {
              start: 38,
              end: 89,
              ease: getBezierEasingByAlias("quadOut"),
              rate: defaults.saturationRate,
            },
            lig: { start: 99, end: 5, ease: getBezierEasingByAlias("quadOut") },
          },
          {
            name: "red",
            hue: { start: 9, end: 16, ease: getBezierEasingByAlias("quadIn") },
            sat: {
              start: 44,
              end: 81,
              ease: getBezierEasingByAlias("quadOut"),
              rate: defaults.saturationRate,
            },
            lig: { start: 99, end: 5, ease: getBezierEasingByAlias("quadOut") },
          },
        ],
      },
      urlState.scaleParams
    )
  );

  const removeByIndex = (index) =>
    update((pp) => {
      if (pp.params.length > 1) {
        pp.params = pp.params.filter((_, i) => i !== index);
        if (pp.scaleIndex >= index) {
          pp.scaleIndex = Math.max(pp.scaleIndex - 1, 0);
        }
      }
      return pp;
    });

  const add = (hex) =>
    update((pp) => {
      if (pp.params.length < maxNumOfScales) {
        let hueRange = 20;
        let hue = 100;
        let satStart = 60;
        let satEnd = 100;
        let colorToName;

        if (typeof hex === "string") {
          // Remove the hash if it exists
          hex = hex.replace("#", "");

          // Convert 3-character hex to 6-character
          if (hex.length === 3) {
            hex = hex
              .split("")
              .map((char) => char + char)
              .join("");
          }

          // Add the hash to the start of the hex value
          hex = "#" + hex;

          const hsluvFromHex = hexToHsl(hex);
          hue = hsluvFromHex[0];
          hueRange = 0;
          satStart = hsluvFromHex[1];
          satEnd = hsluvFromHex[1];
          colorToName = hex;
        } else {
          // Random new color
          hueRange = 20;
          hue = randomInt(0, 360 - hueRange);
          colorToName = hslToHex(hue, 80, 70, settings.colorSpace);
        }

        const param = {
          name: nameHue(colorToName),
          hue: {
            start: hue,
            end: hue + hueRange,
            ease: getBezierEasingByAlias("quadIn"),
          },
          sat: {
            start: satStart,
            end: satEnd,
            ease: getBezierEasingByAlias("quadOut"),
            rate: defaults.saturationRate,
          },
          lig: { start: 100, end: 5, ease: getBezierEasingByAlias("quadOut") },
        };

        pp.scaleIndex = pp.params.length;
        pp.params = [...pp.params, param];
      }

      return pp;
    });

  const checkAndSet = (obj) => {
    const { swatchIndex, steps } = obj;

    if (swatchIndex >= steps) {
      obj.swatchIndex = steps - 1;
    }

    set(obj);
  };

  return { subscribe, set: checkAndSet, update, removeByIndex, add };
}
export const scaleParams = createScaleParams();

const easeSteps = (easeFn, currentStep, totalStep) =>
  easeFn(currentStep / totalStep) * currentStep;

export const scales = derived(
  [scaleParams, settings],
  ([$scaleParams, $settings]) => {
    const steps = $scaleParams.steps;
    return $scaleParams.params.map((pal) => {
      const { hue, sat, lig } = pal;
      const hUnit = (hue.end - hue.start) / steps;
      const sUnit = (sat.end - sat.start) / steps;
      const lUnit = (lig.end - lig.start) / steps;

      const hueEaseFn = BezierEasing(...stringToCubicBezierParams(hue.ease));
      const satEaseFn = BezierEasing(...stringToCubicBezierParams(sat.ease));
      const ligEaseFn = BezierEasing(...stringToCubicBezierParams(lig.ease));

      const swatches = Array.from({ length: steps }).map((_, i) => {
        const h = hue.start + easeSteps(hueEaseFn, i + 1, steps) * hUnit;

        let s = sat.start + easeSteps(satEaseFn, i + 1, steps) * sUnit;
        s = Math.min(100, s * (sat.rate / 100));

        const l = lig.start + easeSteps(ligEaseFn, i + 1, steps) * lUnit;
        const hex = hslToHex(h, s, l, $settings.colorSpace);
        const id = (i + 1) * (steps > 9 ? 10 : 100);

        return {
          id: id.toString(),
          h,
          s,
          l,
          hex,
        };
      });

      return swatches;
    });
  }
);

export const swatchesGroupedById = derived([scales], ([$scales]) => {
  const groupedBySwatchId = $scales
    .map((scale, i) => {
      return scale.map((swatch) => {
        const { id: swatchId, ...rest } = swatch;
        return {
          ...rest,
          scaleIndex: i,
          swatchId,
        };
      });
    })
    .flat()
    .reduce(
      (acc, swatch) => ({
        ...acc,
        [swatch.swatchId]: [
          ...(acc[swatch.swatchId] ? acc[swatch.swatchId] : []),
          swatch,
        ],
      }),
      {}
    );

  return Object.keys(groupedBySwatchId).reduce((acc, swatchId, i) => {
    acc[i] = groupedBySwatchId[swatchId];
    return acc;
  }, []);
});

const hexRe = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/;

export const refColors = derived(settings, ($settings) => {
  return $settings.refColorsRaw
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.match(hexRe) !== null)
    .map((hex) => ({ hex, hsl: hexToHsl(hex, $settings.colorSpace) }));
});

export const nearestRefColors = derived(
  [refColors, scales],
  ([$refColors, $scales]) => {
    const refs = $refColors.reduce((acc, { hex }) => {
      return { ...acc, [hex]: {} };
    }, {});

    $refColors.forEach(({ hex: rc }) => {
      $scales.forEach((p) =>
        p.forEach((swatch) => {
          const { hex } = swatch;
          const dist = chroma.distance(rc, hex, "rgb");
          if (refs[rc].hex === undefined || refs[rc].dist > dist) {
            refs[rc].hex = hex;
            refs[rc].dist = dist;
          }
        })
      );
    });

    const matchedSwatches = Object.keys(refs).reduce((acc, key) => {
      const { hex } = refs[key];

      return {
        [hex]: key,
        ...acc,
      };
    }, {});

    return matchedSwatches;
  }
);

const groupScalesByName = (scales, names) =>
  scales.reduce((pacc, p, i) => {
    const scale = p.reduce((acc, s) => {
      return { ...acc, [s.id]: s.hex };
    }, {});
    return { ...pacc, [`color-${names[i]}`]: scale };
  }, {});

export const shareState = derived(
  [settings, scaleParams, scales],
  ([$settings, $scaleParams, $scales]) => {
    const state = {
      scaleParams: $scaleParams,
      settings: $settings,
    };

    const names = state.scaleParams.params.map((scale) => scale.name);

    const scaleJson = groupScalesByName($scales, names);

    const scaleSVG = jsonToSvg(scaleJson);

    return {
      url: getStatefulUrl(state),
      json: JSON.stringify(scaleJson, null, 2),
      svg: scaleSVG,
    };
  }
);
