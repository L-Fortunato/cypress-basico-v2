/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(() => {
        cy.visit("./src/index.html")
    })

    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    //repete o mesmo teste cinco vezes
    Cypress._.times(5, () => {
        it('preenche os campos obrigatórios e envia o formulário', function () {
            //repete a string 10 vezes
            const comentarioLongo = Cypress._.repeat('Lorem ipsum dolor sit amet', 10)
            cy.get('#firstName').type("Nome do Usuário", { delay: 0 })
            cy.get('#lastName').type("Sobrenome do Usuário", { delay: 0 })
            cy.get('#email').type("emaildousuario@teste.com", { delay: 0 })
            cy.get('#open-text-area').type(comentarioLongo, { delay: 0 })
            cy.clock()
            cy.contains('button', 'Enviar').click()
            cy.get('.success').should('be.visible')
            cy.tick(3000)
            cy.get('.success').should('not.be.visible')
        })
    })


    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type("Nome do Usuário", { delay: 0 })
        cy.get('#lastName').type("Sobrenome do Usuário", { delay: 0 })
        cy.get('#email').type("emaildousuario_teste.com", { delay: 0 })
        cy.get('#open-text-area').type("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vulputate a augue in molestie. Pellentesque nec libero libero. Pellentesque sodales ac lorem a tincidunt. In tincidunt urna ut vulputate maximus. Suspendisse imperdiet turpis vel neque tempor, vitae fringilla neque dictum. Ut lobortis mattis odio, vel lacinia risus imperdiet sed. Sed vitae enim ullamcorper, pellentesque ligula sit amet, tempor purus. In id faucibus ipsum. Donec pellentesque blandit lectus, quis ultricies felis sollicitudin a. In eget tortor a magna volutpat rutrum. Fusce quis nunc et metus tempus laoreet. Proin eu ex non neque convallis aliquet vitae vel tortor. Donec mattis ante eu nunc sollicitudin, id mollis lacus accumsan. Nunc dapibus pretium ullamcorper. In cursus, enim vel malesuada volutpat, ipsum nunc accumsan quam, sit amet consequat turpis ante ac enim. Vestibulum sodales augue odio.", { delay: 0 })
        cy.clock()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(3000)
        cy.get('.error').should('not.be.visible')
    })

    it('valor do campo "telefone" deve ser vazia ao inserir caracteres que não sejam números', function () {
        cy.get('#phone').type("isso não é um número").should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type("Nome do Usuário", { delay: 0 })
        cy.get('#lastName').type("Sobrenome do Usuário", { delay: 0 })
        cy.get('#email').type("emaildousuario@teste.com", { delay: 0 })
        cy.get('#open-text-area').type("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vulputate a augue in molestie. Pellentesque nec libero libero. Pellentesque sodales ac lorem a tincidunt. In tincidunt urna ut vulputate maximus. Suspendisse imperdiet turpis vel neque tempor, vitae fringilla neque dictum. Ut lobortis mattis odio, vel lacinia risus imperdiet sed. Sed vitae enim ullamcorper, pellentesque ligula sit amet, tempor purus. In id faucibus ipsum. Donec pellentesque blandit lectus, quis ultricies felis sollicitudin a. In eget tortor a magna volutpat rutrum. Fusce quis nunc et metus tempus laoreet. Proin eu ex non neque convallis aliquet vitae vel tortor. Donec mattis ante eu nunc sollicitudin, id mollis lacus accumsan. Nunc dapibus pretium ullamcorper. In cursus, enim vel malesuada volutpat, ipsum nunc accumsan quam, sit amet consequat turpis ante ac enim. Vestibulum sodales augue odio.", { delay: 0 })
        cy.get('#phone-checkbox').check()
        cy.clock()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(3000)
        cy.get('.error').should('not.be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName').type("Nome do Usuário", { delay: 0 }).clear().should('have.value', '')
        cy.get('#lastName').type("Sobrenome do Usuário", { delay: 0 }).clear().should('have.value', '')
        cy.get('#email').type("emaildousuario@teste.com", { delay: 0 }).clear().should('have.value', '')
        cy.get('#phone').type("11 91234567", { delay: 0 }).clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.clock()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(3000)
        cy.get('.error').should('not.be.visible')
    })

    it('preenche e envia formulário com informações corretas através de comando customizado', function () {
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit('Nome do usuário', 'Sobrenome do usuário', 'emaildousuario@teste.com', 'Comentário teste dop usuário')
        cy.get('.success').should('be.visible')
        cy.tick(3000)
        cy.get('.success').should('not.be.visible')
    })

    it('selecione um produto (Youtube) por seu texto', function () {
        cy.get('#product').select('YouTube').should("have.value", "youtube")
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function () {
        cy.get('#product').select('mentoria').should("have.value", "mentoria")
    })

    it('seleciona um produto (Blog) por seu índice', function () {
        cy.get('#product').select(1).should("have.value", "blog")
    })

    it('marca o tipo de atendimento "Feedback"', function () {
        cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
    })

    it('marca cada tipo de atendimento', function () {
        //pega todos os inputs do tipo radio
        cy.get('input[type="radio"]')
            //verifica a quantidade de seletores
            .should('have.length', 3)
            /*para cada seletor radio corre a função que toma o radio iterado como parametro
            faz o check e verifica se está checado, passando para o próximo seletor*/
            .each(function (radio) {
                cy.get(radio).check().should('be.checked')
            })
    })

    it('marca o tipo de atendimento meio de contato', function () {
        cy.get('input[type="checkbox"]').should('have.length', 2)
            .each(function (checkbox) {
                cy.get(checkbox).check().should('be.checked')
                    //ao chegar no último seletor, remove o "check" e verifica se não está checado
                    .last().uncheck().should('not.be.checked')
            })
    })

    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json')
            .then(input => {
                //verifica o nome do arquivo, através da verificação do objeto input. Caso queira saber mais, executar console.log(input) para ver a estrutura do objeto
                //console.log(input)
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo da pasta fixtures simulando Drag & Drop', function () {
        // action permite simular drag-drop
        cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo da pasta fixtures simulando Drag & Drop', function () {
        cy.fixture('example.json').as('userFile')
        cy.get('input[type="file"]').selectFile('@userFile')
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy > a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy > a').invoke('removeAttr', 'target').click()
        cy.get('#title').should('have.text', 'CAC TAT - Política de privacidade')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', () => {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })

    it('preenche a area de texto usando o comando invoke', () => {
        cy.get('#open-text-area').invoke('val', 'testando').should('have.value', 'testando')
    })

    it('faz uma requisição HTTP', () => {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .then((response) => {
                console.log(response)
                expect(response.status).to.equal(200)
                expect(response.statusText).to.equal('OK')
                expect(response.body).to.include('CAC TAT')
            })
    })

    it('encontre o gato',()=>{
        cy.get('#cat').invoke('show').should('be.visible')
        cy.get("#title").invoke('text','CAT TAT').should('have.text','CAT TAT')
    })
})

