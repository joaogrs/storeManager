const sinon = require("sinon");
const { expect } = require("chai");

const salesService = require("../../../services/salesService");
const salesController = require("../../../controllers/salesController");
// oi
describe('Ao chamar o controller de getAll', () => {
  describe('quando não existem produtos no banco de dados', async () => {
    const res = {};
    const req = {};

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'getAll').resolves([[]]);
    });

    after(() => {
      salesService.getAll.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await salesController.getSalesController(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um array', async () => {
      await salesController.getSalesController(req, res);

      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  describe('quando existem vendas no banco de dados', async () => {
    const res = {};
    const req = {};

    before(() => {
      req.body = {};

      res.status = sinon.stub()
        .returns(res);
      res.json = sinon.stub()
        .returns();

      sinon.stub(salesService, 'getAll')
        .resolves([[
          {
              "saleId": 1,
              "date": "2022-06-02T15:40:23.000Z",
              "productId": 1,
              "quantity": 5
          }
        ]]);
    })

    after(() => {
      salesService.getAll.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await salesController.getSalesController(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um array', async () => {
      await salesController.getSalesController(req, res);

      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});

describe("quando é inserido com sucesso", async () => {
  const response = {};
  const request = {};
  const responseJson = {
    "id": 3,
    "itemsSold": [
        {
            "productId": 1,
            "quantity": 3
        }
    ]
}

  before(() => {
    request.body =   [
      {
        "productId": 1,
        "quantity": 3
      }
    ];

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns(responseJson);

    sinon.stub(salesService, "add").resolves(responseJson);
  });

  after(() => {
    salesService.add.restore();
  });

  it("é chamado o status com o código 201", async () => {
    await salesController.postSalesController(request, response);

    expect(response.status.calledWith(201)).to.be.equal(true);
  });

  it('é chamado o método "json" passando um objeto', async () => {
    await salesController.postSalesController(request, response);
    expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
  });
});