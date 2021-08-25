class Product {
  constructor(name, price, amount) {
    this.name = name;
    this.price = price;
    this.amount = amount;
  }
}

class UI {
  addProduct(product) {
    const productList = document.getElementById('product-list');
    const element = document.createElement('div')
    element.innerHTML = `
        <div class="card text-center mb-4">
          <div class="card-body">
            <strong>Producto</strong>: ${product.name}
            <strong>Precio</strong>: ${product.price}
            <strong>Cantidad</strong>: ${product.amount}
            <a href="#" class="btn btn-danger" name="delete">X</a>
          </div>
        </div>
      `;
      productList.appendChild(element);
  }

  resetForm() {
    document.getElementById('product-form').reset();
  }
  
  deleteProduct(element) {
    if (element.name === 'delete') {
      element.parentElement.parentElement.parentElement.remove();
      this.showMessage('Producto eliminado', 'danger')
    }
  }

  showMessage(message, cssClass) {
    const div = document.createElement('div');
    div.className = `alert alert-${cssClass} mt-4`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector(".container");
    const app = document.querySelector("#App");
    container.insertBefore(div, app);
    setTimeout(function() {
      document.querySelector('.alert').remove();
    }, 2000);
  }
}

//DOM

document.getElementById('product-form')
  .addEventListener('submit', function (e) {
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const amount = document.getElementById('amount').value;

    const product = new Product(name, price, amount);

    const ui = new UI ();
    
    if (name === '', price === '', amount === '') {
      return ui.showMessage('Rellene los campos', 'danger')
    }
    ui.addProduct(product);
    ui.resetForm();
    ui.showMessage('Producto agregado', 'success')
    localStorage.setItem('producto', JSON.stringify(product));
    e.preventDefault();
  });

document.getElementById('product-list').addEventListener('click', function(e) {
  const ui = new UI ();
  ui.deleteProduct(e.target);
})  

