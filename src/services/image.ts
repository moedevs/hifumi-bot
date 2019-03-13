// @ts-ignore
import { Canvas, Image } from "canvas";
import * as fs from "fs";
// @ts-ignore
import { CanvasTextWrapper } from "canvas-text-wrapper";
import * as opentype from "opentype.js";
import * as path from "path";
import { promisify } from "util";

const font = opentype.loadSync(path.join("assets", "fonts", "open-sans.ttf"));

export const loadTemplate = (name: string) => new Promise(async (res, rej) => {
  const src = path.resolve(path.join("assets", "templates", name));
  const img = new Image();
  img.onload = () => {
    const canvas = new Canvas(img.width, img.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    res(canvas);
  };
  img.onerror = rej;
  img.src = src;
});

export interface TextDimensions {
  x: number;
  y: number;
  height?: number;
  width?: number;
}

/**
 * Placing text on an existing canvas
 * @param text
 * @param canvas
 * @param dimensions
 */
export const placeText = (text: string, canvas: any, dimensions: TextDimensions): any => {
  /**
   * In order for this to work, a separate canvas has to be created
   * so the text can be adjusted according to the new canvas
   */
  const textCanvas = new Canvas();
  textCanvas.height = dimensions.height;
  textCanvas.width = dimensions.width;
  CanvasTextWrapper(textCanvas, text, {
    sizeToFill: true,
    textAlign: "center",
    verticalAlign: "middle"
  });
  // merging the created text canvas with the original canvas to "draw" the text on
  canvas.getContext("2d").drawImage(textCanvas, dimensions.x, dimensions.y);
  return canvas;
};