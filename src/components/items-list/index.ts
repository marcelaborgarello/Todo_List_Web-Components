import { state } from "../../state";

class ItemsList extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });
  constructor() {
    super();
  }

  connectedCallback() {
    state.subscribe(() => {
      this.render();
    });
  }

  render() {
    const list = state.getState().list;
    // console.log(list);

    this.shadow.innerHTML = `
      <ul class="list">
          ${list
            .map(
              (item: string, i: number) =>
                `<li class="list-item" id=${i}>
                <input type="checkbox" class="check"><span class="span-items">${item}</span>
                <button class="close">X</button>
                </li>`
            )
            .join("")}
            </ul>
            <div class="div-button-remove">
              <button class="button-remove-all">Eliminar todo</button>
            </div>
      `;

    const style = document.createElement("style");
    style.textContent = `
      .list {
        background-color: darkgrey;
        display: flex;
        flex-direction: column;
        margin: 20px;
        padding: 0;
      }

      .check {
        transform: scale(2);
      }

      .list-item{
        list-style: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
        padding: 10px;
      }

      .close {
        background-color: black;
        color: white;
        width: 1.5rem;
        border: none;
        border-radius: 4px;
        font-size: 24px;
        }
  
      .checked{
        text-decoration: line-through;
        opacity: .3;
      }

      .div-button-remove {
        margin: 30px 20px;
      }

      .button-remove-all {
        background-color: black;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 24px;
        width: 100%;
        height: 50px;
      }
  
      `;

    const check = this.shadow.querySelectorAll("input");
    check.forEach((item) => {
      item.addEventListener("click", (e) => {
        const ev = e.target as HTMLInputElement;
        // console.log(ev);
        const checked = ev.checked;

        // console.log(checked);

        const span = ev.nextSibling as HTMLSpanElement;
        // console.log(span.textContent);

        if (checked) {
          span.classList.add("checked");
        } else {
          span.classList.remove("checked");
        }
      });
    });

    const close = this.shadow.querySelectorAll(".close");
    const ul = this.shadow.querySelector("ul");
    // console.log(close);

    close.forEach((item) => {
      item.addEventListener("click", (e) => {
        const buttonClose = e.target as HTMLButtonElement;
        //console.log(buttonClose);
        const li = buttonClose.parentElement as HTMLLIElement;
        const atributoLi = li.getAttribute("id");

        list.filter((item, i) => {
          if (i == atributoLi) {
            state.removeItem(item);
          }
        });

        ul?.removeChild(li);
      });
    });

    const buttonRemoveAll = this.shadow.querySelector(".button-remove-all");

    buttonRemoveAll?.addEventListener("click", (e) => {
      console.log(e.isTrusted);
      if (e.isTrusted) {
        alert("Estás seguro de eliminar todo?");
        state.removeAllItem();
        this.shadow.innerHTML = "";
      }
    });

    this.shadow.appendChild(style);
  }
}

customElements.define("items-list", ItemsList);
