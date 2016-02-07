const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

const colorUtils = {
  toHex(col) {
    return hex[(col >> 4) & 15] + hex[col & 15];
  },
  parseColor(col) {
    const color = col.substring(1);
    const components = [0, 0, 0];
    if (color.length === 3) {
      components[0] = parseInt(color[0] + color[0], 16);
      components[1] = parseInt(color[1] + color[1], 16);
      components[2] = parseInt(color[2] + color[2], 16);
    } else if (color.length === 6) {
      components[0] = parseInt(color[0] + color[1], 16);
      components[1] = parseInt(color[2] + color[3], 16);
      components[2] = parseInt(color[4] + color[5], 16);
    }
    return components;
  },
};

export default colorUtils;
