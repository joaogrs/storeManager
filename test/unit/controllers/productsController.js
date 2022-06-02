const sinon = require("sinon");
const { expect } = require("chai");

const productsService = require("../../../services/productsService");
const productsController = require("../../../controllers/productsController");

describe('Ao chamar o controller de getAll', () => {
  describe('quando não existem produtos no banco de dados', async () => {
    const res = {};
    const req = {};

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'getAll').resolves([[]]);
    });

    after(() => {
      productsService.getAll.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await productsController.getProductsController(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um array', async () => {
      await productsController.getProductsController(req, res);

      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  describe('quando existem produtos no banco de dados', async () => {
    const res = {};
    const req = {};

    before(() => {
      req.body = {};

      res.status = sinon.stub()
        .returns(res);
      res.json = sinon.stub()
        .returns();

      sinon.stub(productsService, 'getAll')
        .resolves([[
          {
            id: 2,
            name: "Jane Dow",
            quantity: 12,
          }
        ]]);
    })

    after(() => {
      productsService.getAll.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await productsController.getProductsController(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um array', async () => {
      await productsController.getProductsController(req, res);

      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});

describe("Ao fazer um post na rota products quando o produto já existe", async () => {
  const response = {};
  const request = {};
  const reponseReturn = { message: 'Product already exists' }

  before(() => {
    request.body = {};

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns(reponseReturn);

    sinon.stub(productsService, "add").resolves(false);
  });

  after(() => {
    productsService.add.restore();
  });

  it("é chamado o status com o código 409", async () => {
    await productsController.postProductsController(request, response);

    expect(response.status.calledWith(409)).to.be.equal(true);
  });

  it('é chamado o send com a mensagem "Product alredy exists"', async () => {
    await productsController.postProductsController(request, response);

    expect(response.json.calledWith({ message: 'Product already exists' })).to.be.equal(true);
  });
});

describe("testa a getById da productsController quando o id não existe", () => {
  const res = {};
  const req = {params: {id: 4}};

  before(() => {
    req.body = {};
    const msgNotFound = { message: 'Product not found' }

    res.status = sinon.stub()
      .returns(res);
    res.json = sinon.stub()
      .returns(msgNotFound);

    sinon.stub(productsService, 'getAll')
      .resolves([[]]);
  })

  after(() => {
    productsService.getAll.restore();
  });

  it('é chamado o método status passando o código 404', async () => {
    await productsController.getProductsIdController(req, res);

    expect(res.status.calledWith(404)).to.be.equal(true);
  })

  it('é chamado o método "json" passando um objeto', async () => {
    await productsController.getProductsIdController (req, res);

    expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
  })
})

describe("quando é inserido com sucesso", async () => {
  const response = {};
  const request = {};
  const responseJson = {
    "id": 5,
    "name": "produtao",
    "quantity": 100
}

  before(() => {
    request.body = { "name": "produto", "quantity": 100 }

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns(responseJson);

    sinon.stub(productsService, "add").resolves(responseJson);
  });

  after(() => {
    productsService.add.restore();
  });

  it("é chamado o status com o código 201", async () => {
    await productsController.postProductsController(request, response);

    expect(response.status.calledWith(201)).to.be.equal(true);
  });

  it('é chamado o método "json" passando um objeto', async () => {
    await productsController.postProductsController(request, response);
    expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
  });
});
