/// <reference types="cypress" />

describe('basic tests', () =>{

    beforeEach(() => {
        cy.viewport(1280, 720);
        cy.visit('https://butopea.com');
    })

    it("Checks if image in element div display", () => {
        cy.get('div[class="banner-square-image"] > img')
            .eq(1)
            .should('be.visible')
            .should('have.length.at.least', 1)
            .and((img) => {
                expect(img[0].naturalWidth).to.be.greaterThan(0)
            })
            .then((elem) => {
                cy.log(elem.attr('src'))
            });
    });

    it('Checks if text and button loads', () => {
        cy.get('div[class="banner-square-overlay-heading secondary-font"] > p').eq(1).should('have.length', 1)
            .then(function(elem) {
                cy.log(elem.text())
            });

        cy.get('button[class="button-outline no-outline bg-cl-transparent h4 no-underline sans-serif fs-medium py0 light brdr-white cl-white mini px20 block margin-auto home-button no-decoration no-underline fs-medium-large"]')
            .eq(1)
            .should('have.length.at.least', 1)
            .then(function(elem){
                cy.log(elem.text())
            });
    });

    it('Clicks on the button, get the Log the product list', () => {
        cy.contains('Új termékek').click()
        cy.wait(5000)
        cy.get('[data-testid="productLink"]')
            .should('exist')
            .each((element) => {
                cy.get(element)
                    .should('have.attr', 'href').and('have.length.at.least', 1)
                    .then((herf) => {
                        cy.log(herf) 
                    });

                cy.get(element).find('img[class="preview-img-item product-image__thumb"]')
                    .should('have.length.at.least', 1)
                    .and((img) => {
                        expect(img[0].naturalWidth).to.be.greaterThan(0)
                    })
                    .then((el) =>{
                        cy.log(el.attr('src'))
                    });

                cy.get(element)
                    .find('p[class="mb5 cl-dark mt10 secondary-font product-name"]')
                    .should('have.length.at.least', 1)
                    .then((e) => {
                        cy.log(e.text())
                    })

                cy.get(element)
                    .find('div[class="lh30 cl-dark weight-300 fs-medium-small"]')
                    .should('have.length.at.least', 1)
                    .then((e) => {
                        cy.log(e.text())
                    })
            })
    })
})