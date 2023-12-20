const getPrice = function(priceCard) {
  const priceRegex = /\$[0-9]+\.[0-9][0-9]/g;
  const priceRegexMatches = priceCard.innerText.match(priceRegex);
  return priceRegexMatches[priceRegexMatches.length - 1].replace("$", "");
}

let products = [];

describe('template spec', () => {
  it('passes', () => {
    cy.on("uncaught:exception", (e, runnable) => {
      return false;
    });

    cy.visit('https://oldnavy.gap.com/browse/category.do?cid=11174&mlink=5155,1,m_1')

    cy.get('.product-card', {
      "timeout": 10000,
    }).then((cards) => {
      for (const card of cards) {
        products.push({
          "id": card.getElementsByClassName("cat_product-image")[0].id.replace('product', ''),
          "price": getPrice(card.querySelector('.product-card-price')),
        });
      }

      for (const product of products) cy.log(product);
    })
  })
})