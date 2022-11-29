const closeNavDOM = getElementById("close-nav");
const openNavDOM = getElementById("open-nav");
const closeButtonDom = getElementById("close-button");
const openButtonDOM = getElementById("open-button");

export default function toggleMenu() {
  openButtonDOM.onClick = () => {
    closeNavDOM.classlist.add("duration-150 ease-out opacity-100 scale-100");
  };
  closeButtonDom.onClick = () => {
    closeNavDOM.classlist.add("duration-100 ease-out opacity-0 scale-95");
  };
}
