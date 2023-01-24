// custom hook to get the most popular colors into image
// then render this image into canvas
export default async function colorQuantization(imageUrl) {
  const colors = [];
  // get the image and convert into file to be available to get
  // information about colors
  const res = await fetch(imageUrl)
  const blob = await res.blob();
  const file = new File([blob], "pokemon.png", { type: "image/png" });
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      // get data about the image from array
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      // form data create an array ob RGb object
      const arrayRgb = createArrayRgb(data);
      // reduce the number of these RBG's array
      const arrayQuantization = quantization(arrayRgb, 0);
      // from lightest to darknest
      orderByLuminance(arrayQuantization);

      for (let i = 0; i < arrayQuantization.length; i++) {
        if (i > 0) {
          const difference = calculateColorDifference(
            arrayQuantization[i],
            arrayQuantization[i - 1]
          );

          // if the distance is less than 120 we ommit that color
          if (difference < 120) {
            continue;
          }
        }
        // create an array of non-repeting colors
        colors.push(arrayQuantization[i]);
      }
    };
  };
  return colors;
}
function createArrayRgb(dataFile) {
  const arrayRgb = [];
  for (let i = 0; i < dataFile.length; i += 4) {
    const rgb = {
      r: dataFile[i],
      g: dataFile[i + 1],
      b: dataFile[i + 2],
    };
    if (!arrayRgb.includes(rgb)) {
      arrayRgb.push(rgb);
    }
  }
  return arrayRgb;
}
// prcess to reduce the most common colors
function quantization(arrayRgb, depth) {
  const maxDepth = 4;
  if (depth === maxDepth || arrayRgb.length === 0) {
    const color = arrayRgb.reduce(
      (prev, curr) => {
        prev.r += curr.r;
        prev.g += curr.g;
        prev.b += curr.b;
        return prev;
      },
      {
        r: 0,
        g: 0,
        b: 0,
      }
    );
    color.r = Math.round(color.r / arrayRgb.length);
    color.g = Math.round(color.g / arrayRgb.length);
    color.b = Math.round(color.b / arrayRgb.length);
    return [color];
  }
  const componentToSortBy = findBiggestColorRange(arrayRgb);
  arrayRgb.sort((p1, p2) => {
    return p1[componentToSortBy] - p2[componentToSortBy];
  });
  const mid = arrayRgb.length / 2;
  return [
    ...quantization(arrayRgb.slice(0, mid), depth + 1),
    ...quantization(arrayRgb.slice(mid + 1), depth + 1),
  ];
}
// inferior and superior limit of each color
function findBiggestColorRange(arrayRgb) {
  let rMin = Number.MAX_VALUE;
  let gMin = Number.MAX_VALUE;
  let bMin = Number.MAX_VALUE;

  let rMax = Number.MIN_VALUE;
  let gMax = Number.MIN_VALUE;
  let bMax = Number.MIN_VALUE;

  arrayRgb.forEach((pixel) => {
    rMin = Math.min(rMin, pixel.r);
    gMin = Math.min(gMin, pixel.g);
    bMin = Math.min(bMin, pixel.b);

    rMax = Math.max(rMax, pixel.r);
    gMax = Math.max(gMax, pixel.g);
    bMax = Math.max(bMax, pixel.b);
  });

  const rRange = rMax - rMin;
  const gRange = gMax - gMin;
  const bRange = bMax - bMin;

  // determine which color has the biggest difference
  const biggestRange = Math.max(rRange, gRange, bRange);
  if (biggestRange === rRange) {
    return "r";
  } else if (biggestRange === gRange) {
    return "g";
  } else {
    return "b";
  }
}
function orderByLuminance(rgbValues) {
  const calculateLuminance = (p) => {
    return 0.2126 * p.r + 0.7152 * p.g + 0.0722 * p.b;
  };

  return rgbValues.sort((p1, p2) => {
    return calculateLuminance(p2) - calculateLuminance(p1);
  });
}
// calculate the distance between two colors
function calculateColorDifference(color1, color2) {
  const rDifference = Math.pow(color2.r - color1.r, 2);
  const gDifference = Math.pow(color2.g - color1.g, 2);
  const bDifference = Math.pow(color2.b - color1.b, 2);

  return rDifference + gDifference + bDifference;
}
