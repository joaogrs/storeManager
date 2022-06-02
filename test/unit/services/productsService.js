const sinon = require("sinon");
const { expect } = require("chai");

const productsModel = require("../../../models/productsModel");
const productsService = require("../../../services/productsService");

describe('Busca todos os produtos na DB', () => {
    describe('quando não existe nenhum produto criado', async () => {
  
      before(() => {
        sinon.stub(productsModel, 'getAll')
          .resolves([[]]);
      });
  
      after(() => {
        productsModel.getAll.restore();
      });
  
      it('retorna um array', async () => {
        const [response] = await productsService.getAll();
  
        expect(response).to.be.an('array');
      });
  
      it('o array está vazio', async () => {
        const [response] = await productsService.getAll();
  
        expect(response).to.be.empty;
      });
    });
  
    describe('quando existem produtos criados', () => {
      before(() => {
        sinon.stub(productsModel, 'getAll')
          .resolves([
            { 
                "id": 1,
                "name": "Martelo de Thor",
                "quantity": 10
            }
          ]);
      });
  
      after(() => {
        productsModel.getAll.restore();
      });
  
  
      it('retorna um array', async () => {
        const response = await productsService.getAll();
  
        expect(response).to.be.an('array');
      });
  
      it('o array não está vazio', async () => {
        const response = await productsService.getAll();
  
        expect(response).to.be.not.empty;
      });
  
      it('o array possui itens do tipo objeto', async () => {
        const [item] = await productsService.getAll();
  
        expect(item).to.be.an('object');
      });
  
      it('tais itens possui as propriedades: "id", "name" e "quantity"', async () => {
        const [item] = await productsService.getAll();
  
        expect(item).to.include.all.keys('id', 'name', 'quantity');
      });
    });
  });

describe("Insere um novo produto no BD", () => {
  describe("quando o payload informado não é válido", async () => {
    const payloadProduct = {};

    before(() => {
        sinon.stub(productsModel, 'getAll')
          .resolves([[
            { 
                "id": 1,
                "name": "Martelo de Thor",
                "quantity": 10
            }
          ]]);
        sinon.stub(productsModel, "add").resolves(true)
      });
  
      after(() => {
        productsModel.getAll.restore();
        productsModel.add.restore()
      });

    it("retorna um boolean", async () => {
      const response = await productsService.add(payloadProduct);

      expect(response).to.be.a("boolean");
    });

    it('o boolean contém "false"', async () => {
      const response = await productsService.add(payloadProduct);

      expect(response).to.be.equal(false);
    });
  });

  describe("quando é inserido com sucesso", async () => {
    const payloadProduct = { "name": "produtoaa", "quantity": 100 }

    before(() => {
      const resolvesProducts = {
        "id": 5,
        "name": "produtoaa",
        "quantity": 100
    };

      sinon.stub(productsService, "add").returns(resolvesProducts);
    });

    after(() => {
      productsService.add.restore();
    });

    it("retorna um objeto", async () => {
      const response = await productsService.add(payloadProduct);

      expect(response).to.be.a("object");
    });

    it('tal objeto possui o "id", "name" e "quantity" do novo produto inserido', async () => {
      const response = await productsService.add(payloadProduct);

      expect(response).to.include.all.keys("id", "name", "quantity");
    });
  });
});