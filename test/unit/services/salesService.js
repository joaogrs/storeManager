const sinon = require("sinon");
const { expect } = require("chai");

const salesModel = require("../../../models/salesModel");
const salesService = require("../../../services/salesService");

describe('Busca todas as vendas na DB', () => {
    describe('quando não existe nenhuma venda efetuada', async () => {
  
      before(() => {
        sinon.stub(salesModel, 'getAll')
          .resolves([[]]);
      });
  
      after(() => {
        salesModel.getAll.restore();
      });
  
      it('retorna um array', async () => {
        const [response] = await salesService.getAll();
  
        expect(response).to.be.an('array');
      });
  
      it('o array está vazio', async () => {
        const [response] = await salesService.getAll();
  
        expect(response).to.be.empty;
      });
    });
  
    describe('quando existem vendas criadas', () => {
      before(() => {
        sinon.stub(salesModel, 'getAll')
          .resolves([
            {
                "saleId": 1,
                "date": "2022-06-01T18:23:20.000Z",
                "productId": 1,
                "quantity": 5
            }
          ]);
      });
  
      after(() => {
        salesModel.getAll.restore();
      });
  
  
      it('retorna um array', async () => {
        const response = await salesService.getAll();
  
        expect(response).to.be.an('array');
      });
  
      it('o array não está vazio', async () => {
        const response = await salesService.getAll();
  
        expect(response).to.be.not.empty;
      });
  
      it('o array possui itens do tipo objeto', async () => {
        const [item] = await salesService.getAll();
  
        expect(item).to.be.an('object');
      });
  
      it('tais itens possui as propriedades: "saleId", "date", "productId" e "quantity"', async () => {
        const [item] = await salesService.getAll();
  
        expect(item).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
      });
    });
  });

describe("Insere uma nova venda no BD", () => {

  describe("quando é inserido com sucesso", async () => {
    const payloadSale =   [
        {
          "productId": 1,
          "quantity": 3
        }
      ]

    before(() => {
      const returnAddProduct = {
        "productId": 1,
        "quantity": 3
      }
      sinon.stub(salesModel, "addNewSaleId").returns(4);
      sinon.stub(salesModel, "addNewProductSold").returns(returnAddProduct)
    });

    after(() => {
      salesModel.addNewSaleId.restore();
      salesModel.addNewProductSold.restore()
    });

    //oi

    it("retorna um objeto", async () => {
      const response = await salesService.add(payloadSale);

      expect(response).to.be.a("object");
    });

    it('tal objeto possui o "id", "itemsSold" da nova venda cadastrada', async () => {
      const response = await salesService.add(payloadSale);

      expect(response).to.include.all.keys("id", "itemsSold");
    });
  });
});