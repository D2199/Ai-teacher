// export function tag(name = "div", classes = "con", ...inner) {
//   return `<${name} class=${classes}>${"" + [...inner]}</${name}>`;
// }
export function tag(Tname = "div", atr = {}, ...inner) {
  const element = document.createElement(Tname);
  // for (let a of atr) {
  //   element.classList.add(classes);
  // }
  for (let i of inner) {
    if (typeof i == "object") {
      element.appendChild(i);
    } else {
      element.appendChild(document.createTextNode(i));
    }
  }
  return element;
}
